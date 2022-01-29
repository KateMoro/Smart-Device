'use strict';

document.body.classList.remove('no-js');

// Accordion
const accordionItems = document.querySelectorAll('.accordion');

if (accordionItems) {
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
}

// inputMask
const phoneInputs = document.querySelectorAll('[type="tel"]');
// eslint-disable-next-line no-undef
const im = new Inputmask('+7 (999) 999-99-99');
im.mask(phoneInputs);

// Modal
const headerButton = document.querySelector('.page-header__button');
const modal = document.querySelector('.modal');
const closeModalButton = modal.querySelector('.modal__close');

const callbackForm = document.querySelector('.callback-form');
const nameInput = callbackForm.querySelector('[name="name"]');
const phoneInput = callbackForm.querySelector('[name="phone"]');
const questionTextarea = callbackForm.querySelector('[name="question"]');

const callbackFormModal = modal.querySelector('.callback-form');
const nameInputModal = callbackFormModal.querySelector('[name="name"]');
const phoneInputModal = callbackFormModal.querySelector('[name="phone"]');
const questionTextareaModal = callbackFormModal.querySelector('[name="question"]');

if (headerButton) {
  headerButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal();
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

window.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    closeModal();
  }
});

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const modalCloseClickHandler = () => closeModal();

const modalEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  modal.classList.add('modal--show');
  document.body.style.overflow = 'hidden';
  nameInputModal.focus();
  closeModalButton.addEventListener('click', modalCloseClickHandler);
  document.addEventListener('keydown', modalEscKeydownHandler);
}

function closeModal() {
  modal.classList.remove('modal--show');
  document.body.style.overflow = 'auto';
  closeModalButton.removeEventListener('click', modalCloseClickHandler);
  document.removeEventListener('keydown', modalEscKeydownHandler);
}

// Local storage

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
let storageQuestion = '';

try {
  storageName = localStorage.getItem('name');
  storagePhone = localStorage.getItem('phone');
  storageQuestion = localStorage.getItem('question');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  nameInput.value = storageName;
  nameInputModal.value = storageName;
}
if (storagePhone) {
  phoneInput.value = storagePhone;
  phoneInputModal.value = storagePhone;
}
if (storageQuestion) {
  questionTextarea.value = storageQuestion;
  questionTextareaModal.value = storageQuestion;
}

callbackForm.addEventListener('submit', (evt) => {
  if (!nameInput.value || !phoneInput.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInput.value);
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('question', questionTextarea.value);
    }
  }
});

callbackFormModal.addEventListener('submit', (evt) => {
  if (!nameInputModal.value || !phoneInputModal.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', nameInputModal.value);
      localStorage.setItem('phone', phoneInputModal.value);
      localStorage.setItem('question', questionTextareaModal.value);
    }
  }
});
