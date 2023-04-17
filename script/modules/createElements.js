import {getElements} from './getElements.js';

export const createRow = (form, index) => {
  const goods = document.createElement('tr');
  goods.innerHTML = `
    <td class="table__cell">${index + 1}</td>
    <td class="table__cell table__cell_left table__cell_name" data-id="${form.id}">
      <span class="table__cell-id">${form.id}</span>
      ${form.title}
    </td>
    <td class="table__cell table__cell_left">${form.category}</td>
    <td class="table__cell">${form.units}</td>
    <td class="table__cell">${form.count}</td>
    <td class="table__cell">${form.price}</td>
    <td class="table__cell">${form.count * form.price}</td></td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic" data-id="${form.id}"></button>
      <button class="table__btn table__btn_edit" data-id="${form.id}"></button>
      <button class="table__btn table__btn_del" data-id="${form.id}"></button>
    </td>
  `;

  getElements().tableBody.append(goods);
};

export const createModalDeleteGoods = () => {
  const overlayAsk = document.createElement('div');
  overlayAsk.classList.add('overlay_delete');

  const modalAsk = document.createElement('div');
  modalAsk.classList.add('modal_ask');
 
  const textDelete = document.createElement('p');
  textDelete.classList.add('text_delete')
  textDelete.textContent = `Вы уверены, что хотите удалить товар?`;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('button_delete');
  btnDelete.textContent = 'Удалить';

  const btnCancel = document.createElement('button');
  btnCancel.classList.add('button_cancel');
  btnCancel.textContent = 'Отмена';

  modalAsk.append(textDelete, btnDelete, btnCancel);
  overlayAsk.append(modalAsk);
  document.body.append(overlayAsk);
};

export const createModalError = (err) => {

  const overlayError = document.createElement('div');
  overlayError.classList.add('overlay_error');

  const modalError = document.createElement('div');
  modalError.classList.add('modal_error');
 
  const textError = document.createElement('p');
  textError.classList.add('text_error');
  textError.textContent = `Что-то пошло не так`;

  if (err) textError.textContent = err;

  const imgError = document.createElement('img');
  imgError.classList.add('image_error');

  modalError.append(textError, imgError)
  overlayError.append(modalError)
  document.body.append(overlayError);

  document.addEventListener('click', e => {
    const target = e.target;
    if (!(target.closest('.overlay_error'))) {
        overlayError.style.display = 'none';
    };
  });
};