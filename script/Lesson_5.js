'use strict';
const btnAdd = document.querySelector('.panel__add-goods');
const formOverlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.modal__close');

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    overlay.classList.add('active');
    const modalId = document.querySelector('.vendor-code__id');
      modalId.textContent = `${base.length + 1}`;
  }
  btnAdd.addEventListener('click', openModal);

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

  btnClose.addEventListener('click', () => {
    formOverlay.classList.remove('active');
  });

  return {
    closeModal,
  };
}

const btnDel = document.querySelectorAll('.table__btn_del');
  for (let i = 0; i < btnDel.length; i++) {
    btnDel[i].addEventListener('click', e => {
    const target = e.target;
      if (target.closest('.table__body')) {
        target.closest('tr').remove();
        base.splice([i], 1);
        console.log(base);
      };
    });
  };

  const {closeModal} = modalControl(btnAdd, formOverlay)
  closeModal();
