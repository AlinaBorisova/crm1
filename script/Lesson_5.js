'use strict';

const btnAdd = document.querySelector('.panel__add-goods');
btnAdd.addEventListener('click', () => {
  overlay.classList.add('active');
});

const form = document.querySelector('.overlay');
 form.addEventListener('click', e => {
  const target = e.target;
   console.log(target)
   if (target === form ||
        target.closest('.overlay__modal modal')) {
         form.classList.remove('active');
   };
 });

 const btnClose = document.querySelector('.modal__close');
  btnClose.addEventListener('click', () => {
    form.classList.remove('active');
  });

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
