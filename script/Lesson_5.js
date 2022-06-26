'use strict';

const btnAdd = document.querySelector('.panel__add-goods');
btnAdd.addEventListener('click', () => {
  overlay.classList.add('active');
});

const form = document.querySelector('.overlay');
form.addEventListener('click', event => {
  event.stopPropagation();
});

form.addEventListener('click', () => {
  form.classList.remove('active')
});

const btnClose = document.querySelector('.modal__close');
  btnClose.addEventListener('click', () => {
    form.classList.remove('active');
  });