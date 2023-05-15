import {renderGoods, searchGoods} from './modules/render.js';
import {
  formControl,
  addImage,
  getCategory,
  closeModal
} from './modules/control.js';
import {getElements} from './modules/getElements.js';
import {fetchRequest} from './modules/data.js';

const init = async () => {
  const elem = getElements();

  await fetchRequest('goods', {
    method: 'GET',
    callback: renderGoods,
  });

  await fetchRequest('category', {
    method: 'get',
    callback: getCategory,
  });

  closeModal();
  formControl(elem.form);
  addImage();
  searchGoods();
};

init();
