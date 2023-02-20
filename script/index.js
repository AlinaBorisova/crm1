import {renderGoods} from './modules/render.js';
import {getModalTotalPrice} from './modules/price.js';
import {
  modalControl,
  formControl,
} from './modules/control.js';
import {getElements} from './modules/getElements.js';
import {setTotalPrice} from './modules/price.js';
import {addImage} from './modules/control.js';
// import {getGoods} from './modules/data.js';
// import {sendGoods} from './modules/data.js';
import { fetchRequest } from './modules/data.js';

export const base = [];

  const elem = getElements();
  const init = () => {

    fetchRequest('http://localhost:3000/api/goods', {
      method: 'get',
      callback: renderGoods,
    })

  //  renderGoods();
    // if(base.length> 0) renderGoods(base);
    // renderGoods(getGoods().data);

    const {closeModal} = modalControl(elem.formOverlay)
    closeModal();
    formControl(elem.form, elem.tableBody, closeModal);
    getModalTotalPrice();
    setTotalPrice(base);
    addImage();
  };
  // window.crm = init;
  init();
