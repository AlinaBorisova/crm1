import {renderGoods} from './modules/render.js';
import {getModalTotalPrice} from './modules/modal.js';
import {
  modalControl,
  deleteControl,
  formComtrol,
} from './modules/control.js';
import {getElements} from './modules/getElements.js';

const base = [];

export const setTotalPrice = (base) => {
  let totalCost = 0;
  base.forEach((item) => {
    totalCost += item.price * item.count;
  });
  getElements().totalPrice.textContent = totalCost;
};

{
  const elem = getElements();
  const init = () => {
    if(base.length> 0) renderGoods(base);
    const {closeModal} = modalControl(elem.formOverlay)
    closeModal();

    formComtrol(elem.form, elem.tableBody, closeModal);
    getModalTotalPrice();
    setTotalPrice(base);
    deleteControl();
  }
  window.crm = init;
}