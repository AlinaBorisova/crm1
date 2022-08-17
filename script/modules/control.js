import {createRow} from './createElements.js';
import {getElements} from './getElements.js';
import { setTotalPrice } from '../index.js';

const base = [];

export const modalControl = (formOverlay) => {
  const elem = getElements();
  const openModal = () => {
    elem.formOverlay.classList.add('active');
    elem.modalId.textContent = `${base.length + 1}`;
    }
    elem.btnAdd.addEventListener('click', openModal);

    const closeModal = () => {
      formOverlay.classList.remove('active');
    };
  
    formOverlay.addEventListener('click', e => {
      const target = e.target;
        console.log(target)
        if (target === formOverlay ||
          target.closest('.overlay__modal modal')) {
            closeModal();
        };
    });
  
    elem.btnClose.addEventListener('click', () => {
      formOverlay.classList.remove('active');
    });
  
    return {
      closeModal,
    };
};

export const deleteControl = function() {
  for (let i = 0; i < getElements().btnDel.length; i++) {
    getElements().btnDel[i].addEventListener('click', e => {
      const target = e.target;
        if (target.closest('.table__body')) {
          target.closest('tr').remove();
          base.splice([i], 1);
      };
    });
  }; 
}

export const formComtrol = (form, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoods = Object.fromEntries(formData);
    newGoods.id = base.length + 1;
  
    base.push(newGoods);
  
    createRow(newGoods, tableBody);

    form.reset();
    closeModal();
    setTotalPrice(base);
    deleteControl()
  });
};

