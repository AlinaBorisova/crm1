import {getElements} from './getElements.js';

const amountGoods = (form) => {
  const discount = form.discount;

  if (discount > 0) {
    const sum = form.count * form.price * (1 - form.discount / 100);
    return sum;
  } else {
    const sum = form.count * form.price;
    return sum;
  }

};

const fillingRow = (goods, form, index, amount, getId) => {
  goods.innerHTML = `
    <td class="table__cell">${index + 1}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${form.id || getId}">
      <span class="table__cell-id">${form.id || getId}</span>
      ${form.title}
    </td>
    <td class="table__cell table__cell_left">${form.category}</td>
    <td class="table__cell">${form.units}</td>
    <td class="table__cell">${form.count}</td>
    <td class="table__cell">${form.price}</td>
    <td class="table__cell">${amount}</td></td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic" data-id="${form.id || getId}"></button>
      <button class="table__btn table__btn_edit" data-id="${form.id || getId}"></button>
      <button class="table__btn table__btn_del" data-id="${form.id || getId}"></button>
    </td>
  `;
  return goods;
};

export const createRow = (form, index) => {
  const goods = document.createElement('tr');
  goods.dataset.id = form.id;
  getElements().tableBody.append(fillingRow(goods, form, index, amountGoods(form)));
};

export const editRow = (data,getId) => {
  const goodsRow = document.querySelector(`[data-id="${getId}"]`);
  const index = goodsRow.firstChild.nextSibling.textContent - 1;
  const getAmountModal = getElements().modalTotalPrice.value;

  fillingRow(goodsRow, data, index, getAmountModal, getId);
};
