export const getElements = function() {
  const heading = document.querySelector('h1');
  const modalForm = document.querySelectorAll('form')[1];
  const modalCheckbox = document.querySelectorAll('.modal__input')[4];
  const btnAdd = document.querySelector('.panel__add-goods');
  const formOverlay = document.querySelector('.overlay');

  const tableBody  = document.querySelector('.table__body');
  const btnDel = document.querySelectorAll('.table__btn_del');
  const btnEdit = document.querySelectorAll('.table__btn_edit');
  const buttonPic = document.querySelectorAll('.table__btn_pic');

  const form = document.querySelector('.modal__form');
  const modalId = document.querySelector('.vendor-code__id');
  const btnClose = document.querySelector('.modal__close');
  const modalInputTitle = document.querySelector('#title');
  const modalInputCategory = document.querySelector('#category');
  const modalInputDescription = document.querySelector('#description');
  const modalInputUnits = document.querySelector('#units');
  const modalInputCount = document.querySelector('#count');
  const modalInputDiscount = document.querySelector('.modal__input_discount');
  const modalInputDiscountCheckbox = document.querySelector('.modal__checkbox');
  const modalInputPrice = document.querySelector('#price');
  const modalTotalPrice = document.querySelector('.modal__total-price');

  const totalPrice = document.querySelector('.crm__total-price');
  const lastRowId = document.querySelector('.vendor-code__id').textContent;
  const overlayDelete = document.querySelector('.overlay_delete');
  const btnDeleteAsk = document.querySelector('.button_delete');
  const btnCancelAsk = document.querySelector('.button_cancel');

  return {
    heading,
    modalForm,
    modalCheckbox,
    btnAdd,
    formOverlay,
    tableBody,
    btnDel,
    btnEdit,
    buttonPic,
    form,
    modalId,
    btnClose,
    modalInputTitle,
    modalInputCategory,
    modalInputDescription,
    modalInputUnits,
    modalInputCount,
    modalInputDiscount,
    modalInputDiscountCheckbox,
    modalInputPrice,
    modalTotalPrice,
    totalPrice,
    lastRowId,
    overlayDelete,
    btnDeleteAsk,
    btnCancelAsk,
  };
};
