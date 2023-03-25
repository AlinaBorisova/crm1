import {getElements} from './getElements.js';

export const discountModal = function() {
  discountModalCheckbox.addEventListener('click', () => {
    if (document.querySelector('.modal__checkbox').checked) {
      discount.disabled = false;
    } else {
      discount.disabled = true;
      discount.value = '';
    };
  });
};

export const getModalTotalPrice = function() {
  const elem = getElements();
  const modalTotalPrice = () => {
    if (elem.modalInputDiscount.value === '' || elem.modalInputDiscount.value === 0) {
    elem.modalTotalPrice.textContent = elem.modalInputCount.value * elem.modalInputPrice.value;
    } else if (elem.modalInputDiscount.value > 0) {
      elem.modalTotalPrice.textContent = elem.modalInputCount.value * elem.modalInputPrice.value * (1 - elem.modalInputDiscount.value / 100);
    };
  };

  elem.modalInputCount.addEventListener('change', () => {
    modalTotalPrice();
    if (elem.modalInputCount.value === "") alert('Введите количество');
  });

  elem.modalInputPrice.addEventListener('change', () => {
    modalTotalPrice();
    if (elem.modalInputPrice.value === "") alert('Введите цену');
  });
};

export const setTotalPrice = (base) => {
  let totalCost = 0;
  base.forEach((item) => {
    totalCost += item.price * item.count;
  });
  getElements().totalPrice.textContent = `${totalCost} р.`;
};

export const updateTotalPrice = (base) => {
  document.querySelector('.crm__total-price').innerHTML = ""
  let totalCost = 0;
  base.forEach((item) => {
    totalCost += item.price * item.count;
  });
  getElements().totalPrice.textContent = totalCost;
};