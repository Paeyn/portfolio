// Particle system for code snippet starfield
function createParticles() {
  if (window.innerWidth <= 768) return;

  const particleContainer = document.getElementById("particleContainer");
  if (!particleContainer) return;

  particleContainer.innerHTML = "";

  const codeParticles = [
    "React.useState()",
    "AWS.Lambda",
    "SELECT *",
    "npm install",
    "git commit",
    "const app",
    "async/await",
    "PostgreSQL",
    "Node.js",
    "useEffect()",
    "REST API",
    "JSON.parse()",
    "docker run",
    "CI/CD",
    "MongoDB",
    "Express.js",
    "TypeScript",
    "Redux",
    "GraphQL",
    "Serverless",
    "MySQL",
    "React Native",
    "AWS S3",
    "Lambda",
    "Vector Search",
    "AI Translation",
    "Offline-First",
    "Microservices",
    "OAuth",
    "JWT",
    "Webpack",
    "Babel",
    "ESLint",
    "Jest",
    "CSS Grid",
    "Flexbox",
    "SCSS",
    "Material-UI",
    "Tailwind",
    "Bootstrap",
  ];

  let i = 0;
  function addParticle() {
    if (i >= 30) return;
    const particle = document.createElement("div");
    particle.className = "particle";
    updateParticle(particle, codeParticles);
    particle.style.opacity = 0;
    particle.style.animationDelay = i * 0.3 + "s";
    particle.addEventListener("animationiteration", () => {
      updateParticle(particle, codeParticles);
    });
    particleContainer.appendChild(particle);
    i++;
    setTimeout(addParticle, 30); // Spread out creation
  }
  addParticle();
}

// Helper to update a single particle
function updateParticle(particle, codeParticles) {
  const randomCode = codeParticles[Math.floor(Math.random() * codeParticles.length)];
  particle.textContent = randomCode;
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";
  const initialRotation = (Math.random() - 0.5) * 20;
  particle.style.transform = `rotate(${initialRotation}deg)`;
}

// Handle window resize for responsive particle management
function handleResize() {
  const particleContainer = document.getElementById("particleContainer");
  if (!particleContainer) return;

  if (window.innerWidth <= 768) {
    // Mobile view - stop creating particles and clear existing ones
    if (window.particleInterval) {
      clearInterval(window.particleInterval);
      window.particleInterval = null;
    }
    // Clear existing particles
    particleContainer.innerHTML = "";
  } else {
    // Desktop view - start particles if not already running
    if (!window.particleInterval) {
      createParticles();
    }
  }
}
