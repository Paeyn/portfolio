// Main application initialization and experience calculation
function calculateExperience() {
  const startDate = new Date("2012-06-01");
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  let totalYears = yearsDiff;

  if (monthsDiff < 0) {
    totalYears--;
  }

  const experienceText = `${totalYears}${monthsDiff > 0 ? "+" : ""}`;

  [
    "experience-years",
    "experience-years-about",
    "experience-years-career",
  ].forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = experienceText;
    }
  });

  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    const creationYear = 2025;
    const currentYear = currentDate.getFullYear();
    if (currentYear > creationYear) {
      currentYearElement.textContent = `${creationYear} - ${currentYear}`;
    } else {
      currentYearElement.textContent = creationYear;
    }
  }
}

const tabContentCache = {};

/**
 * Preload all tab content files from /tabs directory
 */
async function preloadAllTabContent() {
	const allTabContent = document.querySelectorAll('.tab-content:not([id*="-overview"])');
	const loadPromises = Array.from(allTabContent).map( async ele => {
		const tabID = ele.getAttribute('id');
		try {
      // throw new Error('error preloading');
			const response = await fetch(`tabs/${tabID}.html`);
			if ( response.ok ) {
				const content = await response.text();
				tabContentCache[tabID] = content;
				ele.innerHTML = content;

				ele.querySelectorAll('pre > code').forEach( el => {
					// console.log( 'trying to highlight', el );
					hljs.highlightElement(el); 
				});
				// hljs.highlightElement(ele);
				return {tabID, success:true};
			} else {
				return {tabID, success:false};
			}
		} catch (err) {
			console.error(`Failed to preload ${tabID}:`, err );
		}
	});

	const results = Promise.all(loadPromises);
	// hljs.highlightAll();
	return results;
}

async function highlightSnippets() {
  const allTabContent = document.querySelectorAll('.tab-content:not([id*="-overview"])');
  // console.log( 'allTabContent', allTabContent);
  Array.from(allTabContent).map( ele => {
    ele.querySelectorAll('pre > code').forEach( el => {
      hljs.highlightElement(el);
    });
  });
}

let testCounts = {};
async function loadTabContent(event, tabID) {
  // return;
  const caseStudy = event.target.closest(".case-study");
  const tabs = caseStudy.querySelectorAll(".project-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  event.target.classList.add("active");

  
  const tabContents = caseStudy.querySelectorAll(".tab-content");
  tabContents.forEach((content) => content.classList.remove("active"));

  const selectedTab = document.getElementById(tabID);
  if (selectedTab) {
    selectedTab.classList.add("active");
	return;
    if (!tabID.includes("-overview")) {
      if (!tabContentCache[tabID]) {
        // console.log( 'setting loading div' );
        selectedTab.innerHTML = `<div class="loading">Loading code example...</div>`;

        try {
          if ( !testCounts[tabID] ) testCounts[tabID] = 0;
          testCounts[tabID] += 1;
          // console.log( 'testCounts', testCounts[tabID] );
          // if ( testCounts[tabID] < 3 ) throw new Error('lazy init error');
          // await new Promise(res => setTimeout(res,3000) );
          // throw new Error('test');
          const response = await fetch(`tabs/${tabID}.html`);
          if (response.ok) {
            let content = await response.text();

            // now get example code too?
            // const coderesponse = await fetch(`js/${tabID}.js`);
            // const codecontent = await coderesponse.text();

            // content = content.replace('{{codehere}}', codecontent);

            tabContentCache[tabID] = content;
            selectedTab.innerHTML = content;
            // hljs.highlightAll();
            
            selectedTab.querySelectorAll('pre > code').forEach( ele => hljs.highlightElement(ele) );

          } else {
            selectedTab.innerHTML = `<div class="loading">Code example not found.</div>`;
          }
        } catch (err) {
          console.error(err);
          selectedTab.innerHTML = '<div class="loading">Failed to load code example.</div>';

          if ( testCounts[tabID] < 3 ) { 
            // console.log( "trying again soon..." );
            setTimeout(() => {
              // console.log( 'trying again', tabID );
              loadTabContent(event,tabID);
            }, 1000);
          }
        }
      } else {
        // selectedTab.innerHTML = tabContentCache[tabID];
        // selectedTab.querySelectorAll('pre > code').forEach( ele => hljs.highlightElement(el) );
      }
    }
  }
  //   hljs.highlightAll();
}

// Initialize application when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  calculateExperience();

  setTimeout(() => {
    createCodePattern();
    createParticles();
  }, 0);

  // Add resize listener to handle screen size changes
  window.addEventListener("resize", function () {
    if (this.resizeTo) clearTimeout(this.resizeTo);
    this.resizeTo = setTimeout(function () {
      window.dispatchEvent(new Event("resizeEnd"));
    }, 500);
    handleResize();
  });
  window.addEventListener("resizeEnd", function () {
    createCodePattern();
  });

  // pre load all tab content
  // preloadAllTabContent();

  // hljs.highlightAll();
  // highlight code snippets
  highlightSnippets();
});
