import {getElements} from './getElements.js';

export const discountModal = function() {
  discountModalCheckbox.addEventListener('click', () => {
    if (document.querySelector('.modal__checkbox').checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
      }
    });
};

export const getModalTotalPrice = function() {
  const elem = getElements();
  const modalTotalPrice = () => {
    elem.modalTotal.textContent = elem.modalCount.value * elem.modalPrice.value;
  };

  elem.modalCount.addEventListener('blur', () => {
    modalTotalPrice();
    if (elem.modalCount === "") alert('Введите количество');
  });

  elem.modalPrice.addEventListener('blur', () => {
    modalTotalPrice();
    if (elem.modalPrice === "") alert('Введите цену');
  });
};