const URL = 'http://localhost:3000/api/goods';

export const fetchRequest = async (url, {
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

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    };

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    callback(err);
  };
};

export const sendGoods = (form) => {
  fetchRequest('http://localhost:3000/api/goods', {
    method: 'POST',
    body: {
      category: form.category.value,
      count : form.count.value,
      description: form.description.value,
      discount: form.discount.value,
      id: form.id.value,
      image: form.id.value,
      price: form.price.value,
      title: form.title.value,
      units: form.units.value,
    },
    callback(data) {
      console.log(data);
    },
    headers: {
      'Content-Type': 'aplication/json',
    },
  });
};




