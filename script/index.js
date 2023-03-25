import {renderGoods} from './modules/render.js';
import {
  modalControl,
  formControl,
} from './modules/control.js';
import {getElements} from './modules/getElements.js';
import {addImage} from './modules/control.js';
import {fetchRequest} from './modules/data.js';
import {createModalDeleteGoods} from './modules/createElements.js';
import {getCategory} from './modules/control.js';
  
  const init = () => {
    const elem = getElements();

    fetchRequest('goods', {
      method: 'get',
      callback: renderGoods,
    });

    fetchRequest('category', {
      method: 'get',
      callback: getCategory,
    });

    const {closeModal} = modalControl(elem.formOverlay);
    createModalDeleteGoods();
    closeModal();
    formControl(elem.form);
    addImage();
  };
  init();
