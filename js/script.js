'use strict';

// preloading ends after document is loaded
const preloader = document.getElementById('preload');

window.addEventListener('load', function () {
  this.setTimeout(() => {
    preloader.classList.add('loaded');
    this.document.body.classList.add('loaded');
  }, 1000);
});

// function to add event listener to elements
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// add event listener to navbar
const navbar = document.getElementById('navbar');
const navTogglers = document.getElementsByClassName('nav-toggler');
const overlay = document.getElementById('overlay');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

addEventOnElements(navTogglers, 'click', toggleNavbar);

// hide header when window is scrolled
const header = document.getElementById('header');
let lastScrollPosition = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPosition < window.scrollY;

  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }

  lastScrollPosition = window.scrollY;
};

window.addEventListener('scroll', function () {
  if (this.window.scrollY >= 50) {
    header.classList.add('active');
    hideHeader();
  } else {
    header.classList.remove('active');
  }
});
