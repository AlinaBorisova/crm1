import {createRow} from './tableRows.js';
import {fetchRequest} from './data.js';
import {getElements} from './getElements.js';
import {deleteControl} from './control.js';
import {editControl} from './control.js';
import {picControl} from './control.js';
import {setTotalPrice} from './price.js';
import {createModalError} from './modal.js';

export const renderGoods = async (err, data) => {
  const form = getElements().form;

  if (err) {
    console.warn(err, data);
    createModalError(err.message);
  };

  await data.map((item, i) => {
    createRow(item, i);
  });

  deleteControl(data);
  editControl(data, form);
  picControl(data);
  setTotalPrice(data);

};

export const searchGoods = () => {
  const inputSearch = document.querySelector('.panel__input');

  inputSearch.addEventListener('input',  () => {
    const tableBody = getElements().tableBody;
    tableBody.innerHTML = '';
    let search = '';
    if(inputSearch.value) {
      search = `?search=${inputSearch.value}`;
    };

    setTimeout(()=>{
      fetchRequest('goods'+search, {
        method: 'get',
        callback: renderGoods,
      });
    }, 300);
  });
};
