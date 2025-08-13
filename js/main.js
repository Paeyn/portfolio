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

// Initialize application when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // console.time("initializeApp");
  calculateExperience();
  // console.timeEnd("initializeApp");

  setTimeout(() => {
    // console.time("createCodePattern");
    createCodePattern();
    // console.timeEnd("createCodePattern");

    // console.time("createParticles");
    createParticles();
    // console.timeEnd("createParticles");
  }, 0);

  // Add resize listener to handle screen size changes
  window.addEventListener("resize", handleResize);
});
