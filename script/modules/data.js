import {createModalError} from './createElements.js'; 

const URL = 'http://localhost:3000/api/';

export const fetchRequest = async (postfix, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    
    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${URL}${postfix}`, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) {
        
        return callback(null, data);
      };
    };
    
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  };

};

export const sendGoods = (form, result) => {
  return new Promise (resolve => {
    resolve(true);
    
    fetchRequest('goods', {
      method: 'POST',
      body: {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        price: form.price.value,
        units: form.units.value,
        count : form.count.value,
        discount: form.discount.value,
        image: result || [],
      },
      
      callback(err, data) {       
        if (err) {
          console.warn(err, data)
          createModalError(err.message);         
        } else {
          form.reset();
        }
      },
      headers: {
        'Content-Type': 'aplication/json',
      },
    });
    
  });
};




