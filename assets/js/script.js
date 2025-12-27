'use strict';

/**
 * Helper function for adding event listeners to multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * NAVBAR & MOBILE MENU
 */
const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);
addEventOnElements(navbarLinks, "click", navToggleFunc);

/**
 * HEADER SCROLL STATE
 */
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * TOAST NOTIFICATION SYSTEM
 */
const toastContainer = document.querySelector("[data-toast-container]");

const showToast = function (message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;
  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * LOGIN/SIGNUP MODAL
 */
const userBtn = document.querySelector(".user-btn");
const modal = document.querySelector("[data-modal]");
const modalOverlay = document.querySelector("[data-modal-overlay]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const loginForm = document.querySelector("[data-login-form]");
const signupForm = document.querySelector("[data-signup-form]");
const switchToSignupBtn = document.querySelector("[data-switch-to-signup]");
const switchToLoginBtn = document.querySelector("[data-switch-to-login]");

const toggleModal = function () {
  modal.classList.toggle("active");
  modalOverlay.classList.toggle("active");
}

if (userBtn) {
  userBtn.addEventListener("click", function (e) {
    e.preventDefault();
    toggleModal();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (modalOverlay) modalOverlay.addEventListener("click", toggleModal);

if (switchToSignupBtn) {
  switchToSignupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  });
}

if (switchToLoginBtn) {
  switchToLoginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  });
}

// Handle Form Submissions
const forms = document.querySelectorAll(".auth-form form");
forms.forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const isLogin = form.closest("[data-login-form]");
    toggleModal();
    showToast(isLogin ? "Login successful!" : "Account created successfully!");
    form.reset();
  });
});

/**
 * SEARCH FILTER FUNCTIONALITY
 */
const searchForm = document.querySelector(".hero-form");
const carItems = document.querySelectorAll(".featured-car-list > li");

if (searchForm) {
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const formData = new FormData(searchForm);
    const searchModel = formData.get("car-model").toLowerCase();
    const searchPrice = parseInt(formData.get("monthly-pay")) || Infinity;
    const searchYear = parseInt(formData.get("year")) || 0;

    let foundCount = 0;

    carItems.forEach(item => {
      const carModel = item.getAttribute("data-car-model").toLowerCase();
      const carPrice = parseInt(item.getAttribute("data-monthly-pay"));
      const carYear = parseInt(item.getAttribute("data-year"));

      // Filter Logic
      const matchesModel = carModel.includes(searchModel);
      const matchesPrice = carPrice <= searchPrice;
      const matchesYear = carYear >= searchYear;

      if (matchesModel && matchesPrice && matchesYear) {
        item.style.display = "block";
        foundCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (foundCount === 0) {
      showToast("No cars found matching your criteria.");
    } else {
      showToast(`Found ${foundCount} car(s).`);
      // Scroll to results
      document.getElementById("featured-car").scrollIntoView({ behavior: "smooth" });
    }
  });
}

/**
 * FAVORITE BUTTON FUNCTIONALITY
 */
const favBtns = document.querySelectorAll(".fav-btn");
favBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");
    const icon = this.querySelector("ion-icon");
    
    if (this.classList.contains("active")) {
      icon.setAttribute("name", "heart");
      showToast("Added to favorites!");
    } else {
      icon.setAttribute("name", "heart-outline");
      showToast("Removed from favorites.");
    }
  });
});

/**
 * RENT BUTTON FUNCTIONALITY
 */
const rentBtns = document.querySelectorAll(".featured-car-card .btn:not(.fav-btn)");
rentBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const card = this.closest(".featured-car-card");
    const carTitle = card.querySelector(".card-title a").textContent;
    showToast(`Rental request sent for ${carTitle}!`);
  });
});

/**
 * SCROLLSPY
 */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("[data-nav-link]");

window.addEventListener("scroll", function () {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= (sectionTop - 150)) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});
