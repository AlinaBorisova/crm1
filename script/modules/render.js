import { base } from '../index.js';
import {createRow} from './createElements.js';
// import {getGoods} from './data.js';
import { fetchRequest } from './data.js';

// export const renderGoods = (arr) => {
//   for (let i = 0; i < arr.length; i++) {
//     createRow(base[i], i);
//   };
// }

export const renderGoods = (err, data) => {
  // const data = await getGoods(); 
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  };
  data.map((item, i) => {
    // console.log(item)
    createRow(item, i)
  });
};