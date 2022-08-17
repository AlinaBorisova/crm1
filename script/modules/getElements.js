export const getElements = function() {
  const heading = document.querySelector('h1');
  const modalForm = document.querySelectorAll('form')[1];
  const modalCheckbox = document.querySelectorAll('.modal__input')[4];
  const btnAdd = document.querySelector('.panel__add-goods');
  const formOverlay = document.querySelector('.overlay');
  const btnClose = document.querySelector('.modal__close');
  const modalId = document.querySelector('.vendor-code__id');
  const btnDel = document.querySelectorAll('.table__btn_del');
  const form = document.querySelector('.modal__form');
  const discountModalCheckbox = document.querySelector('.modal__checkbox-wrapper');
  const discount = document.querySelector('.modal__input_discount');
  const tableBody  = document.querySelector('.table__body');
  const modalTotal = document.querySelector('.modal__total-price');
  const modalPrice = document.querySelector('#price');
  const modalCount = document.querySelector('#count');
  const totalPrice = document.querySelector('.crm__total-price');
 
  return {
    heading,
    modalForm,
    modalCheckbox,
    btnAdd,
    formOverlay,
    btnClose,
    modalId,
    btnDel,
    form,
    discountModalCheckbox,
    discount,
    tableBody,
    modalTotal,
    modalPrice,
    modalCount,
    totalPrice,
  };
};
