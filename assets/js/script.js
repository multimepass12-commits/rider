'use strict';
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
for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}
const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/* LOGIN/SIGNUP MODAL */
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

/* SCROLLSPY */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("[data-nav-link]");

window.addEventListener("scroll", function () {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // 150px offset for header
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
