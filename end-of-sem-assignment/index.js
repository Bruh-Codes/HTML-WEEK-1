
function attachEvent() {
  document.querySelectorAll(".toggle input[type='checkbox']").forEach((e) => {
    e.addEventListener("change", (e) => {
      setToggleList(e.target.dataset.id);
    });
  });
  document.querySelectorAll(".remove-button").forEach((e) => {
    e.addEventListener("click", (e) => {
      setUninstallList(e.target.dataset.id);
    });
  });
}

function setUninstallList(target) {
  data = data.filter((e) => {
    return target != e.id;
  });
  generateHtml();
}

function setToggleList(target) {
  data = data.map((e) => {
    if (e.id == target) {
      return { ...e, isActive: !e.isActive };
    }
    return e;
  });
  
  // Update just the toggle that was clicked without regenerating all HTML
  const clickedToggle = document.querySelector(`.toggle input[data-id="${target}"]`);
  const toggleContainer = clickedToggle.closest('.toggle');
  const toggleSlider = toggleContainer.querySelector('.toggle-slider');
  
  if (clickedToggle.checked) {
    toggleContainer.style.backgroundColor = 'rgb(17, 24, 39)';
    toggleSlider.style.transform = 'translateX(24px)';
  } else {
    toggleContainer.style.backgroundColor = 'rgb(229, 231, 235)';
    toggleSlider.style.transform = 'translateX(0)';
  }
}

function generateHtml() {
  if (extensionMenu == 0) {
    generateHtmlAll();
  } else if (extensionMenu == 1) {
    generateHtmlActive();
  } else if (extensionMenu == 2) {
    generateHtmlNotActive();
  }
  attachEvent();
}

function generateHtmlAll() {
  let HTML = "";
  data.forEach((e) => {
    HTML += `
      <div class="list-item bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
          <div class="info flex items-start gap-4 mb-4">
            <div class="img w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-gray-700">
              <img
                src="${e.logo}"
                alt="${e.name}"
                class="w-8 h-8"
              />
            </div>
            <div class="description flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 dark:text-white">${e.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">${e.description}</p>
            </div>
          </div>
          <div class="action flex items-center justify-between">
            <div class="flex gap-2">
              <button data-id="${e.id}" class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors remove-button dark:text-red-400 dark:hover:text-red-300">Uninstall</button>
              <button class="text-sm ml-4 text-gray-600 hover:text-gray-700 font-medium transition-colors dark:text-gray-300 dark:hover:text-gray-200">
                Share
              </button>
            </div>
            <label class="toggle relative w-14 h-8 ${e.isActive ? 'bg-gray-900' : 'bg-gray-200'} rounded-full cursor-pointer transition-colors duration-300 dark:bg-gray-600" data-id="${e.id}">
              <input type="checkbox" class="hidden" ${e.isActive ? 'checked' : ''} data-id="${e.id}">
              <span class="toggle-slider absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm"></span>
            </label>
          </div>
        </div>
      `;
  });
  document.querySelector(".list").innerHTML = HTML;
}

function generateHtmlActive() {
  let HTML = "";
  data.forEach((e) => {
    if (e.isActive) {
      HTML += `
      <div class="list-item bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
          <div class="info flex items-start gap-4 mb-4">
            <div class="img w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-gray-700">
              <img
                src="${e.logo}"
                alt="${e.name}"
                class="w-8 h-8"
              />
            </div>
            <div class="description flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 dark:text-white">${e.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">${e.description}</p>
            </div>
          </div>
          <div class="action flex items-center gap-8 justify-between">
            <div class="flex gap-2">
              <button data-id="${e.id}" class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors remove-button dark:text-red-400 dark:hover:text-red-300">Uninstall</button>
              <button class="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors dark:text-gray-300 dark:hover:text-gray-200">
                Share
              </button>
            </div>
            <label class="toggle relative w-14 h-8 bg-gray-900 rounded-full cursor-pointer transition-colors duration-300 dark:bg-gray-600" data-id="${e.id}">
              <input type="checkbox" class="hidden" checked data-id="${e.id}">
              <span class="toggle-slider absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm"></span>
            </label>
          </div>
        </div>
      `;
    }
  });
  document.querySelector(".list").innerHTML = HTML;
}

function generateHtmlNotActive() {
  let HTML = "";
  data.forEach((e) => {
    if (e.isActive == false) {
      HTML += `
      <div class="list-item bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
          <div class="info flex items-start gap-4 mb-4">
            <div class="img w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 dark:bg-gray-700">
              <img
                src="${e.logo}"
                alt="${e.name}"
                class="w-8 h-8"
              />
            </div>
            <div class="description flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 dark:text-white">${e.name}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">${e.description}</p>
            </div>
          </div>
          <div class="action flex items-center gap-8 justify-between">
            <div class="flex gap-2">
              <button data-id="${e.id}" class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors remove-button dark:text-red-400 dark:hover:text-red-300">Uninstall</button>
              <button class="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors dark:text-gray-300 dark:hover:text-gray-200">
                Share
              </button>
            </div>
            <label class="toggle relative w-14 h-8 bg-gray-200 rounded-full cursor-pointer transition-colors duration-300 dark:bg-gray-600" data-id="${e.id}">
              <input type="checkbox" class="hidden" data-id="${e.id}">
              <span class="toggle-slider absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 shadow-sm"></span>
            </label>
          </div>
        </div>
      `;
    }
  });
  document.querySelector(".list").innerHTML = HTML;
}

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
    return [
      {
        id: 1,
        name: "Ad Blocker",
        description: "Blocks ads and trackers",
        logo: "assets/images/logo.svg",
        isActive: true
      },
      {
        id: 2,
        name: "Password Manager",
        description: "Secure password storage",
        logo: "assets/images/logo.svg",
        isActive: false
      },
      {
        id: 3,
        name: "Dark Mode",
        description: "Dark theme for websites",
        logo: "assets/images/logo.svg",
        isActive: true
      }
    ];
  }
}

// Theme Toggle
let isDarkTheme = false;
document.querySelector(".theme-toggle").addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;
  const html = document.documentElement;
  const themeIcon = document.querySelector(".theme-icon");
  
  if (isDarkTheme) {
    html.classList.add('dark');
    themeIcon.src = "assets/images/icon-sun.svg";
  } else {
    html.classList.remove('dark');
    themeIcon.src = "assets/images/icon-moon.svg";
  }
});

// Extension Menu Filter
let extensionMenu = 0;
const extension = document.querySelectorAll(".extension-button");
extension.forEach((e) => {
  e.addEventListener("click", (e) => {
    extensionMenu = e.target.dataset.button;
    extension.forEach((button) => {
      if (button.dataset.button == extensionMenu) {
        button.className = "px-4 py-2 rounded-full bg-gray-900 text-white font-medium transition-colors extension-button dark:bg-white dark:text-gray-900";
      } else {
        button.className = "px-4 py-2 rounded-full bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition-colors extension-button dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700";
      }
    });
    generateHtml();
  });
});

// Initialize
let data = await fetchData();
generateHtml();
