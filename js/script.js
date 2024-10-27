'use strict';

// preloading ends after document is loaded
const preloader = document.querySelector('[data-preload]');

window.addEventListener('load', function () {
  this.setTimeout(() => {
    preloader.classList.add('loaded');
    this.document.body.classList.add('loaded');
  }, 2000);
});
