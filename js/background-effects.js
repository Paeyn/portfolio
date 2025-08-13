// Background code pattern generation
function createCodePattern() {
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

  const pattern = document.getElementById("codePattern");
  if (!pattern) return;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const approxCharsPerLine = Math.floor(screenWidth / 7); // Approximate characters per line
  const linesNeeded = Math.floor(screenHeight / 15); // Approximate lines needed

  // Clear existing content
  pattern.innerHTML = "";

  // Create a grid of code snippets to fill the screen
  for (let row = 0; row < linesNeeded + 10; row++) {
    let line = "";
    let currentLength = 0;

    while (currentLength < approxCharsPerLine) {
      const randomSnippet =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const spacing = "    "; // Indentation

      if (
        currentLength + randomSnippet.length + spacing.length <=
        approxCharsPerLine
      ) {
        line += spacing + randomSnippet;
        currentLength += randomSnippet.length + spacing.length;
      } else {
        break;
      }
    }

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
