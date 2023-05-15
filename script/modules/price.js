import {getElements} from './getElements.js';
import {checkboxCheck} from "./control.js";

export const getModalTotalPrice = function() {
  const elem = getElements();

  const modalTotalPrice = () => {
    if (elem.modalInputDiscount.value === '' || elem.modalInputDiscount.value === 0) {
    elem.modalTotalPrice.textContent = `${elem.modalInputCount.value * elem.modalInputPrice.value} p.`;
    } else {
      elem.modalTotalPrice.textContent = `${elem.modalInputCount.value * elem.modalInputPrice.value *
        (1 - elem.modalInputDiscount.value / 100)} p.`;
    };
  };

  elem.modalInputCount.addEventListener('change', () => {
    modalTotalPrice();
    if (elem.modalInputCount.value === '') alert('Введите количество');
  });

  elem.modalInputPrice.addEventListener('change', () => {
    modalTotalPrice();
    if (elem.modalInputPrice.value === '') alert('Введите цену');
  });

  elem.modalInputDiscount.addEventListener('change', () => {
    modalTotalPrice();
  });

  elem.modalInputDiscountCheckbox.addEventListener('click', (event) => {
    if (event.target.checked) {
      elem.modalTotalPrice.textContent = `${elem.modalInputCount.value * elem.modalInputPrice.value *
      (1 - elem.modalInputDiscount.value / 100)} p.`;
    } else {
      elem.modalTotalPrice.textContent = `${elem.modalInputCount.value * elem.modalInputPrice.value} p.`;
    }
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

