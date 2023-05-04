import {getElements} from './getElements.js';

export const getModalTotalPrice = function() {
  const elem = getElements();

  const modalTotalPrice = () => {

    if (elem.modalInputDiscount.value === '' || elem.modalInputDiscount.value === 0) {
    elem.modalTotalPrice.textContent = elem.modalInputCount.value * elem.modalInputPrice.value;
    } else {
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
  const elem = getElements();
  elem.totalPrice.innerHTML = '';
  let totalCost = 0;

  base.forEach(item => {
    totalCost += item.price * item.count;
  });

  elem.totalPrice.textContent = `${totalCost} р.`;
};

