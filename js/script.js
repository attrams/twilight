'use strict';

// remove style from body
document.addEventListener('DOMContentLoaded', () => {
  document.body.removeAttribute('style');
});

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

/* 
  hero slider 
*/
const heroSlider = document.getElementById('hero-slider');
const heroSliderItems = document.querySelectorAll('.hero-slider-item');
const heroSliderPrevBtn = document.getElementById('prev-btn');
const heroSliderNextBtn = document.getElementById('next-btn');

let currentSlidePosition = 0;
let lastActiveSliderItem = heroSliderItems[0];
let slideInterval;

const resetInterval = function () {
  clearInterval(slideInterval);
  slideInterval = setInterval(slideNext, 15000);
};

const updateSliderPosition = function () {
  lastActiveSliderItem.classList.remove('active');
  heroSliderItems[currentSlidePosition].classList.add('active');
  lastActiveSliderItem = heroSliderItems[currentSlidePosition];
};

// next button
const slideNext = function () {
  currentSlidePosition = (currentSlidePosition + 1) % heroSliderItems.length;

  updateSliderPosition();
  resetInterval();
};

heroSliderNextBtn.addEventListener('click', slideNext);

// previous button
const slidePrev = function () {
  currentSlidePosition =
    (currentSlidePosition - 1 + heroSliderItems.length) %
    heroSliderItems.length;

  updateSliderPosition();
  resetInterval();
};

heroSliderPrevBtn.addEventListener('click', slidePrev);

// auto slide
slideInterval = setInterval(slideNext, 15000);
