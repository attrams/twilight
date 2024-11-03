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

// view all menu button
const viewAllMenu = document.getElementById('view-all-menu');
const menuList = document.querySelector('section#menu .grid-list');

const additionalItems = [
  {
    title: 'Orange Cocktail',
    price: 'GH₵90.00',
    description:
      'Fresh Orange Juice: 3 oz, Vodka: 2 oz, Triple Sec: 1 oz, Simple Syrup: 0.5 oz (optional), Club Soda: 2 oz, Ice Cubes: for shaking, Orange Slices: for garnish, Fresh Mint: optional, for garnish',
    image: './images/drink-1.jpg',
    label: '',
  },
  {
    title: 'Lemon Cocktail',
    price: 'GH₵95.00',
    description:
      'Lemon Juice: 2 oz, Simple Syrup: 1 oz, Gin or Vodka: 2 oz, Club Soda: 2 oz, Ice Cubes: for shaking, Lemon Slices: for garnish, Fresh Mint: optional, for garnish.',
    image: './images/drink-2.jpg',
    label: '',
  },
  {
    title: 'Special Cocktail',
    price: 'GH₵125.00',
    description:
      'White Rum: 2 oz, Coconut Cream: 1 oz, Fresh Pineapple Juice: 2 oz, Crushed Ice: 1 cup, Pineapple Slice: for garnish, Maraschino Cherry: for garnish.',
    image: './images/drink-3.jpg',
    label: '',
  },
  {
    title: 'Stir Fry',
    price: 'GH₵225.00',
    description:
      'Meko Noodles, Chicken, Bell Peppers, Carrots, Green Onions, Soy Sauce, Sesame Oil, Garlic, Ginger, Chili Sauce, Sesame Seeds',
    image: './images/menu-7.jpg',
    label: 'New',
  },
];

let showMore = false;

viewAllMenu.addEventListener('click', function (e) {
  e.preventDefault();
  showMore = !showMore;

  if (showMore) {
    additionalItems.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="menu-card hover:card">
          <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
            <img src="${item.image}" alt="${
        item.title
      }" loading="lazy" width="100" height="100" class="img-cover" onerror="this.style.display='none'">
          </figure>
          <div>
            <div class="title-wrapper">
              <h3 class="title-3">
                <a href="#" class="card-title">${item.title}</a>
              </h3>
              ${
                item.label
                  ? `<span class="badge label-1">${item.label}</span>`
                  : ''
              }
              <span class="span title-2">${item.price}</span>
            </div>
            <p class="card-text label-1">${item.description}</p>
          </div>
        </div>
      `;
      menuList.appendChild(li);
    });

    viewAllMenu.querySelectorAll('.text').forEach((element) => {
      element.textContent = 'View Less';
    });
  } else {
    const removeExtraMenuItems = menuList.querySelectorAll('li:nth-child(n+7)');
    removeExtraMenuItems.forEach((item) => item.remove());
    viewAllMenu.querySelectorAll('.text').forEach((element) => {
      element.textContent = 'View All Menu';
    });
  }
});
