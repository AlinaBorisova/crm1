import {createRow, index} from './createElements.js';
import {getElements} from './getElements.js';
import {setTotalPrice} from './price.js';
import {base} from '../index.js';

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
      updateRowIndex();
      deleteControl();
    });
  }; 
};

function updateRowIndex() {
  document.querySelector('.table__body').innerHTML = ""
  let data = [];
  base.forEach((item, index) => {
    data.push(item);
    createRow(item, index);
  }) 
}

export const formComtrol = (form, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoods = Object.fromEntries(formData);
    newGoods.id = base.length + 1;
    base.push(newGoods);
    createRow(newGoods, tableBody);
  
    deleteControl();
    form.reset();
    closeModal();
    setTotalPrice(base);
    console.log(base)
  });
};