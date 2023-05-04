import {getElements} from './getElements.js';
import {setTotalPrice} from './price.js';
import {fetchRequest} from './data.js';

const modalDeleteAsk = (getId, data, targetBtn, overlayAsk) => {
  document.body.addEventListener('click', async ({target}) => {
    if (target.closest('.button_delete')) {
      targetBtn.closest('tr').remove();
      if (getId) {
        await fetchRequest(`goods/${getId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'aplication/json',
          },
        });

        getId = '';
        overlayAsk.style.display = 'none';
        setTotalPrice(data);
      }
    }

    if (target.closest('.button_cancel')) {
      overlayAsk.style.display = 'none';
      getId = '';
    }
  });
};

export const createModalDeleteGoods = (data, getId, target) => {
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

  modalDeleteAsk(getId, data, target, overlayAsk);
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

  modalError.append(textError, imgError);
  overlayError.append(modalError);
  document.body.append(overlayError);

  document.addEventListener('click', e => {
    const target = e.target;
    if (!(target.closest('.overlay_error'))) {
      overlayError.style.display = 'none';
    };
  });
};
