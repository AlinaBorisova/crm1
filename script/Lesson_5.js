'use strict';

const btnAdd = document.querySelector('.panel__add-goods');
console.log(btnAdd);

btnAdd.addEventListener('click', () => {
    overlay.classList.add('active');
});

const form = document.querySelector('.overlay__modal modal');
console.log(form)

/*form.addEventListener('click', event => {
  event.stopPropagation();
});

formOverlay.addEventListener('click', () => {
  formOverlay.classList.remove('is-visible')
});

const btnClose = document.querySelector('.modal__close"');
  btnClose.addEventListener('click', () => {
    overlay.classList.remove('active');
  });*/