import {renderGoods} from './modules/render.js';
import {getModalTotalPrice} from './modules/price.js';
import {
  modalControl,
  formComtrol,
} from './modules/control.js';
import {getElements} from './modules/getElements.js';
import {setTotalPrice} from './modules/price.js';
import {updateImage} from './modules/control.js';
export const base = [];

{
  const elem = getElements();
  const init = () => {
    if(base.length> 0) renderGoods(base);
    const {closeModal} = modalControl(elem.formOverlay)
    closeModal();
    formComtrol(elem.form, elem.tableBody, closeModal);
    getModalTotalPrice();
    setTotalPrice(base);
    updateImage();
  };
  window.crm = init;
};