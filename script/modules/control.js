import {createRow} from './createElements.js';
import {getElements} from './getElements.js';
import {setTotalPrice, updateTotalPrice} from './price.js';
import {base} from '../index.js';

export const modalControl = (formOverlay) => {
  const elem = getElements();
  const openModal = () => {
    elem.formOverlay.classList.add('active');
    elem.modalId.textContent = `${setRowId(base)}`;
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
      updateTotalPrice(base);
    });
  }; 
};

const setRowId = (base) => {
  let lastId = 0;
  base.forEach(item => {
    if(item.id > lastId) lastId = item.id;
  });
  lastId++;
  return lastId;
};

const updateRowIndex = () => {
  document.querySelector('.table__body').innerHTML = ""
  base.forEach((item, index) => {
    createRow(item, index + 1);
  }) 
};

const picControl = () => {
  const elem = getElements();
    for (let i = 0; i < elem.buttonPic.length; i++) {
      elem.buttonPic[i].setAttribute('data-pic', 'url');
      elem.buttonPic[i].addEventListener('click', e => {
        const target = e.target;
          if (target.closest('.table__body')) {
            open('https://s1.1zoom.ru/big0/651/Forests_Rivers_Bridges_Parks_USA_Lewis_River_576703_1280x1024.jpg', '', 'width=800,height=600,top=66,left=368');
          };
      });
    }; 
};

export const formComtrol = (form, tableBody, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGoods = Object.fromEntries(formData);
    newGoods.id = setRowId(base);
    base.push(newGoods); 
    createRow(newGoods, base.length, tableBody);
  
    deleteControl();
    picControl();
    form.reset();
    closeModal();
    setTotalPrice(base);
    console.log(base);
  });
};