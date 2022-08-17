import {createRow} from './createElements.js';

export const renderGoods = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    createRow(base[i], i);
  };
}