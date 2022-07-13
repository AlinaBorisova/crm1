'use strict';

const form = document.querySelector('.modal__form');

const discountModalCheckbox = document.querySelector('.modal__checkbox-wrapper');
discountModalCheckbox.addEventListener('click', () => {
  const discount = document.querySelector('.modal__input_discount');
  if (document.querySelector('.modal__checkbox').checked) {
    discount.disabled = false;
  } else {
    discount.disabled = true;
    discount.value = '';
    }
});

const overlay = document.querySelector('.overlay');
overlay.classList.remove('active');

const tableBody  = document.querySelector('.table__body');

const base = [];

const createRow = (form) => {
  const index = base.length; 
  const goodsItem = `
    <td class="table__cell">${index}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${form.id}">
      <span class="table__cell-id">${form.id}</span>
      ${form.name}
    </td>
    <td class="table__cell table__cell_left">${form.category}</td>
    <td class="table__cell">${form.units}</td>
    <td class="table__cell">${form.count}</td>
    <td class="table__cell">${form.price}</td>
    <td class="table__cell">${form.count * form.price}</td></td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `;

  const goods = document.createElement('tr');
  goods.innerHTML = goodsItem;
  tableBody.append(goods);
}


const renderGoods = (arr) => {
  for (let i = 0; i < base.length; i++) {
    createRow(base[i], i);
  }
}
if(base.length> 0) renderGoods(base);

// const addGoodsPage = (goods, tableBody) => {
//   tableBody.append(createRowTwo(goods));
// };

const modalTotal = document.querySelector('.modal__total-price');
const modalPrice = document.querySelector('#price');
const modalCount = document.querySelector('#count');

modalCount.addEventListener('blur', () => {
  modalTotalPrice();
  if (modalCount === "") console.log('Введите количество')

});
modalPrice.addEventListener('blur', () => {
  modalTotalPrice();
  if (modalPrice === "") console.log('Введите цену')
});
const modalTotalPrice = () => {
  modalTotal.textContent = modalCount.value * modalPrice.value;
};

const totalPrice = document.querySelector('.crm__total-price');
const setTotalPrice = (base) => {
  let totalCost = 0;
  base.forEach((item) => {
    totalCost += item.price * item.count;
  });
  totalPrice.textContent = totalCost;
};

const formComtrol = (form, tableBody, closeModal) => {
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
    console.log(base)
  });
};
formComtrol(form, tableBody, closeModal);

