handlePoolingStream = (stream, dictionary) => {
  const handler = this.getStreamHandler(stream);
  handler.fetching = false;

  // Build SQL template for inserts
  const columns = handler.columns;
  const columnNames = `(${columns.join(',')})`;
  const placeholders = `(${columns.map(() => '?').join(',')})`;

  this.db.transaction((tx) => {
    // Mark all records as potentially outdated
    tx.executeSql(`UPDATE ${stream} SET updated=0;`);

    // Process each dictionary entry
    dictionary.forEach(entry => {
      const keys = Object.keys(entry);
      
      if (keys.length === 2 && entry.unchanged_ids_from && entry.unchanged_ids_to) {
        // Handle ID range - mark as updated without changing data
        tx.executeSql(
          `UPDATE ${stream} SET updated=1 WHERE id >= ? AND id <= ?;`,
          [entry.unchanged_ids_from, entry.unchanged_ids_to]
        );
        
      } else if (keys.length === 1 && entry.id) {
        // Handle single ID - mark as updated without changing data
        tx.executeSql(
          `UPDATE ${stream} SET updated=1 WHERE id = ?;`, 
          [entry.id]
        );
        
      } else {
        // Handle full record data - insert or replace
        const values = columns.map(col => entry[col]);
        const sql = `INSERT OR REPLACE INTO ${stream} ${columnNames} VALUES ${placeholders}`;
        
        tx.executeSql(sql, values, null, (error) => {
          __DEV__ && console.log('Database update error:', error);
        });
      }
    });

    // Remove outdated records
    tx.executeSql(`DELETE FROM ${stream} WHERE updated=0;`);
    
    // Finish sync
    handler.fetching = false;
    this.ExecuteCallbacks(stream, true);
  });
};