import {createRow} from './createElements.js';
import {fetchRequest} from './data.js';
import {getElements} from './getElements.js';
import {deleteControl} from './control.js';
import {editControl} from './control.js';
import {picControl} from './control.js';
import {setTotalPrice} from './price.js';

export const renderGoods = async (err, data) => {
  const form = getElements().form;
  
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  };
  
  await data.map((item, i) => {
    createRow(item, i);
  });

  deleteControl(data);
  editControl(data, form);
  picControl(data);
  searchGoods();
  setTotalPrice(data);
};

const filterSearch = async () => {
  const inputSearch = document.querySelector('.panel__input');
  const searchValue = inputSearch.value;
  getElements().tableBody.innerHTML = '';

  await fetchRequest(`goods?search=${searchValue}`, {
    method: 'get',
    callback: renderGoods,
  });

};

const searchGoods = () => {
  const inputSearch = document.querySelector('.panel__input');
  // let timerId = null;
  inputSearch.addEventListener('blur', () => {
    // clearTimeout(timerId);
    // timerId = setTimeout(filterSearch, 300);
    // setTimeout(filterSearch, 300);
    setTimeout(() => {
      const inputSearch = document.querySelector('.panel__input');
      const searchValue = inputSearch.value;
      getElements().tableBody.innerHTML = '';

      fetchRequest(`goods?search=${searchValue}`, {
        method: 'get',
        callback: renderGoods,
      });
    }, 300)
  });
};