// Background code pattern generation
function createCodePattern() {
  const pattern = document.getElementById("codePattern");
  if (!pattern) return;
  
  if (window.innerWidth <= 768) {
	// Clear existing content
	pattern.innerHTML = "";
	return;
  }

  const codeSnippets = [
    "const app = express();",
    "app.use(cors());",
    "SELECT * FROM users WHERE active = true;",
    "const [state, setState] = React.useState([]);",
    'AWS.Lambda.invoke({ FunctionName: "process" });',
    "npm install react react-native",
    'git commit -m "feat: add user authentication"',
    "docker build -t myapp:latest .",
    'console.log("Server running on port 3000");',
    'import React from "react";',
    "export default function App() {",
    "async function getData() {",
    "  return await response.json();",
    "}",
    "try {",
    "  const db = new Database();",
    "} catch (error) {",
    "  console.error(error);",
    "}",
    "app.listen(3000, () => {",
    '  console.log("Ready!");',
    "});",
    "useEffect(() => {",
    "  fetchData();",
    "}, []);",
    "const migration = {",
    "  up: async (queryInterface) => {",
    '    await queryInterface.createTable("users");',
    "  }",
    "};",
    "transform: translateX(-50%);",
    "background: linear-gradient(135deg, #366091, #a2bddd);",
    "box-shadow: 0 4px 8px rgba(0,0,0,0.1);",
    "border-radius: 20px;",
    "backdrop-filter: blur(10px);",
    "position: relative;",
    "z-index: 1;",
    "overflow: hidden;",
    "transition: all 0.3s ease;",
    "const handleSubmit = async (e) => {",
    "  e.preventDefault();",
    "  const formData = new FormData(e.target);",
    "  await submitData(formData);",
    "};",
    "INSERT INTO projects (name, tech_stack)",
    'VALUES ("CATCH", "React Native, AWS");',
    'UPDATE users SET role = "Lead Programmer"',
    'WHERE name = "Peter Mulligan";',
    "CREATE INDEX idx_content_search ON articles",
    'USING gin(to_tsvector("english", content));',
  ];

//   const pattern = document.getElementById("codePattern");
//   if (!pattern) return;

	// const container = document.querySelector(".container");
	// let codeSnippets = [];
	// if ( container ) {
	// 	codeSnippets = Array.from(container.querySelectorAll("*"))
	// 	.map(el => el.textContent.replace(/[\r\n]/g, '').replace(/\s+/g, ' ').trim())
	// 	.filter( text => text.length > 0);

	// 	console.log( 'container', codeSnippets );
	// }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const approxCharsPerLine = Math.floor(screenWidth / 7); // Approximate characters per line
  const linesNeeded = Math.floor(screenHeight / 15); // Approximate lines needed

  // Clear existing content
  pattern.innerHTML = "";

  console.log( 'Creating code pattern with approxCharsPerLine:', approxCharsPerLine, 'and linesNeeded:', linesNeeded);

  // Create a grid of code snippets to fill the screen
  for (let row = 0; row < linesNeeded + 10; row++) {
    let line = "";
    let currentLength = 0;

    while (currentLength < approxCharsPerLine) {
      const randomSnippet =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
		// console.log( "Have randomSnippet", randomSnippet );
      const spacing = "    "; // Indentation

	  line += spacing + randomSnippet;
	  currentLength += randomSnippet.length + spacing.length;
	  if ( currentLength + spacing.length >= approxCharsPerLine ) {
		break;
	  }
    //   if (
    //     currentLength + randomSnippet.length + spacing.length <=
    //     approxCharsPerLine
	// 	// || currentLength == 0
	// 	// || true
    //   ) {
    //     line += spacing + randomSnippet;
    //     currentLength += randomSnippet.length + spacing.length;
    //   } else {
	// 	if ( currentLength == 0 ) {
	// 		console.log( "Current length exceeded", {currentLength, snippetLength:randomSnippet.length, spacingLength:spacing.length, approxCharsPerLine });
	// 	}
    //     break;
    //   }
    }
	// console.log( line, currentLength );
    const lineElement = document.createElement("div");
    lineElement.textContent = line;
    lineElement.style.position = "absolute";
    lineElement.style.top = row * 15 + "px";

    const check = Math.random() < 0.5;
    if (check) {
      lineElement.style.left = Math.random() * 100 - 50 + "px";
    } else {
      lineElement.style.right = Math.random() * 100 - 50 + "px";
    }

    // lineElement.style.transform = `rotate(${(Math.random() - 0.5) * 4}deg)`;
    lineElement.style.opacity = Math.random() * 0.4 + 0.2;
    pattern.appendChild(lineElement);
  }
}
