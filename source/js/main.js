'use strict';

document.body.classList.remove('no-js');

// Accordion
const accordionItems = document.querySelectorAll('.accordion');

accordionItems.forEach((item) => {
  item.addEventListener('click', function() {
    if (this.classList.contains('accordion--opened')) {
      this.classList.remove('accordion--opened');
    } else {
      accordionItems.forEach((elem) => elem.classList.remove('accordion--opened'));
      this.classList.toggle('accordion--opened');
    }
  });
});
