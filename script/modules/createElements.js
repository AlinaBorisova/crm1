import {getElements} from './getElements.js';

export const createRow = (form) => {
  const goodsItem = `
    <td class="table__cell">${form.id}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${form.id}">${form.name}</td>
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
  getElements().tableBody.append(goods);
}
