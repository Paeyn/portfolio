// Particle system for code snippet starfield
function createParticles() {
  // Skip particle creation on mobile devices
  if (window.innerWidth <= 768) {
    return;
  }

  const particleContainer = document.getElementById('particleContainer');
  if (!particleContainer) return;
  
  const particleCount = 30;
  
  const codeParticles = [
    'React.useState()',
    'AWS.Lambda',
    'SELECT *',
    'npm install',
    'git commit',
    'const app',
    'async/await',
    'PostgreSQL',
    'Node.js',
    'useEffect()',
    'REST API',
    'JSON.parse()',
    'docker run',
    'CI/CD',
    'MongoDB',
    'Express.js',
    'TypeScript',
    'Redux',
    'GraphQL',
    'Serverless',
    'MySQL',
    'React Native',
    'AWS S3',
    'Lambda',
    'Vector Search',
    'AI Translation',
    'Offline-First',
    'Microservices',
    'OAuth',
    'JWT',
    'Webpack',
    'Babel',
    'ESLint',
    'Jest',
    'CSS Grid',
    'Flexbox',
    'SCSS',
    'Material-UI',
    'Tailwind',
    'Bootstrap'
  ];

  function createStarfieldParticle() {
    // Double-check screen size before creating each particle
    if (window.innerWidth <= 768) {
      return;
    }

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random code snippet
    const randomCode = codeParticles[Math.floor(Math.random() * codeParticles.length)];
    particle.textContent = randomCode;
    
    // Random position anywhere on screen
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random initial rotation
    const initialRotation = (Math.random() - 0.5) * 20; // -10 to +10 degrees
    particle.style.transform = `rotate(${initialRotation}deg)`;
    
    // Random animation duration and delay for twinkling
    // particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    // particle.style.animationDelay = Math.random() * 4 + 's';
    
    particleContainer.appendChild(particle);
    
    // Remove particle after it completes its twinkle cycle
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 8000);
  }

  // Create initial starfield
  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => createStarfieldParticle(), i * 200);
  }

  // Store interval ID so we can clear it on resize
  window.particleInterval = setInterval(createStarfieldParticle, 300);
}

// Handle window resize for responsive particle management
function handleResize() {
  const particleContainer = document.getElementById('particleContainer');
  if (!particleContainer) return;

  if (window.innerWidth <= 768) {
    // Mobile view - stop creating particles and clear existing ones
    if (window.particleInterval) {
      clearInterval(window.particleInterval);
      window.particleInterval = null;
    }
    // Clear existing particles
    particleContainer.innerHTML = '';
  } else {
    // Desktop view - start particles if not already running
    if (!window.particleInterval) {
      createParticles();
    }
  }
}