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

async function loadTabContent(event, tabID) {
  const caseStudy = event.target.closest(".case-study");
  const tabs = caseStudy.querySelectorAll(".project-tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  event.target.classList.add("active");

  const tabContents = caseStudy.querySelectorAll(".tab-content");
  tabContents.forEach((content) => content.classList.remove("active"));

  const selectedTab = document.getElementById(tabID);
  if (selectedTab) {
    selectedTab.classList.add("active");
    if (!tabID.includes("-overview")) {
      if (!tabContentCache[tabID]) {
        selectedTab.innerHTML = `<div class="loading">Loading code example...</div>`;

        try {
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
          } else {
            selectedTab.innerHTML = `<div class="loading">Code example not found.</div>`;
          }
        } catch (err) {
          console.error(err);
          selectedTab.innerHTML(
            '<div class="loading">Failed to load code example.</div>'
          );
        }
      } else {
        selectedTab.innerHTML = tabContentCache[tabID];
      }
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
  // window.addEventListener("resize", handleResize);
  window.addEventListener("resize", function () {
    if (this.resizeTo) clearTimeout(this.resizeTo);
    this.resizeTo = setTimeout(function () {
      window.dispatchEvent(new Event("resizeEnd"));
    }, 500);
    // console.time("handleResize");
    handleResize();
    // console.timeEnd("handleResize");
  });
  window.addEventListener("resizeEnd", function () {
    createCodePattern();
  });
});
