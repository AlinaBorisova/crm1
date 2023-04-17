import {getElements} from './getElements.js';
import {fetchRequest} from './data.js';
import {sendGoods} from './data.js';
import {getModalTotalPrice} from './price.js';
import {updateTotalPrice} from './price.js';

export const getCategory = (err, data) => {
  const labelCategory = document.querySelector('.modal__label_category');
  labelCategory.children[1].setAttribute('list', 'category-list');

  const datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'category-list');


  data.map(item => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    datalist.append(option);
  });
  labelCategory.children[1].append(datalist)
  
  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  };
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', () => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

const checkboxCheck = () => {
  const elem = getElements();

  elem.modalInputDiscountCheckbox.addEventListener('change', e => {
    if (e.target.checked) {
      elem.modalInputDiscount.disabled = false;
    } else {
      elem.modalInputDiscount.disabled = true;
    }
  });
};

export const modalControl = (formOverlay) => {
  const elem = getElements();
  const openModal = () => {
    elem.formOverlay.classList.add('active');
    elem.modalId.innerHTML = '';
    checkboxCheck();
  }
  elem.btnAdd.addEventListener('click', openModal);

  const closeModal = () => {
    formOverlay.classList.remove('active');
  };
  
  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.closest('.overlay__modal modal')) {
        closeModal();
    };
  });
  
  elem.btnClose.addEventListener('click', () => {
    formOverlay.classList.remove('active');
  });
  
  return {
    closeModal,
  };
};

export const deleteControl = function(data) {
  const tbody = getElements().tableBody;
  const elem = getElements();

  tbody.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    if (target.closest('.table__btn_del')) {
      elem.overlayDelete.style.display = 'flex';

      elem.btnDeleteAsk.addEventListener('click',  (event) => {
        event.preventDefault();
        elem.overlayDelete.style.display = 'none';
        updateTotalPrice(data);
        const getId = target.getAttribute('data-id');

        fetchRequest(`goods/${getId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'aplication/json',
          },
          body: null,
        });
      });

      elem.btnCancelAsk.addEventListener('click', (event) => {
        event.preventDefault();
        elem.overlayDelete.style.display = 'none';
      });
    }
  })
};

export const addImage = () => {
  const file = document.querySelector('.modal__file');
  file.classList.remove('visually-hidden');

  const preview = document.createElement('img');
  preview.classList.add('preview');
  
  const text = document.createElement('div');
  text.style.cssText = `
    color: red;
    font-weight:bold;
  `;

  document.querySelector('.modal__fieldset').append(preview, text);
  
  file.addEventListener('change', async () => {    
    if(file.files.length > 0) {
      const src = URL.createObjectURL(file.files[0]);
      if(file.files[0].size <= 1048576) {
        preview.src = src;
        text.textContent ='';     
      } else {
        text.textContent = 'Изображение не должно превышать 1 Мб';
      };
    };
  });
};

export const picControl = (data) => {
  const elem = getElements();

  for (let i = 0; i < elem.buttonPic.length; i++) {
    elem.buttonPic[i].addEventListener('click', e => {
      let imgUrl = `http://localhost:3000/${data[i].image}`;
      elem.buttonPic[i].setAttribute('data-pic', imgUrl);

      const target = e.target;
      const img = target.getAttribute('data-pic');
      
      open(img, 'Image', 'width=800, height=600, top='+((screen.height/2)-330)+',left='+((screen.width-800)/2)+'');
    });
      
  };
};

const getEditDataModal = (getId, data) => {
  const elem = getElements();
  data.forEach(item => {
    let img = document.querySelector('.preview');

    if (getId === item.id) {
      elem.modalId.textContent = getId;
      elem.modalInputTitle.value = item.title;
      elem.modalInputCategory.value = item.category;
      elem.modalInputDescription.value = item.description;
      elem.modalInputUnits.value = item.units;
      elem.modalInputCount.value = item.count;
      elem.modalInputDiscount.value = item.discount;
      elem.modalInputPrice.value = item.price;

      if (elem.modalInputDiscount.value === 0 || elem.modalInputDiscount.value === '') {
        elem.modalTotalPrice.textContent = `${item.price * item.count} p.`;
      } else {
        elem.modalTotalPrice.textContent = `${item.price * item.count * (1 - item.discount / 100)} p.`;
      };
      img.src = `http://localhost:3000/${item.image}`;

      checkboxCheck();
    };
  });
};

const editPatch = (form, getId) => {
  form.addEventListener('submit', async event => {
    event.preventDefault()

    const formData = new FormData(event.target);
    const newGoods = Object.fromEntries(formData);
    const result = await toBase64(newGoods.image);

    fetchRequest(`goods/${getId}`, {
      method: 'PATCH',
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
        };
      },
      headers: {
        'Content-Type': 'aplication/json',
      },
    });
  });
};

export const editControl = function(data, form) {
  const tbody = getElements().tableBody;
  const elem = getElements();
  const modalTitle = document.querySelector('.modal__title');
  const modalSubmit = document.querySelector('.modal__submit');

  tbody.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.table__btn_edit')) {
      const getId = target.getAttribute('data-id');

      modalSubmit.classList.add('submit_edit');
      modalSubmit.textContent = 'Изменить товар';
      modalTitle.textContent = 'Изменить товар';

      fetchRequest(`goods/${getId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'aplication/json',
        },
        callback() {
          getEditDataModal(getId, data);
        },
      });

      elem.formOverlay.classList.add('active');

      if (modalSubmit.classList.contains('submit_edit')) editPatch(form, getId);
    };
  })
};

export const formControl = function(form, closeModal) {
  getModalTotalPrice();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const modalSubmit = document.querySelector('.modal__submit');
    
    const formData = new FormData(event.target);
    const newGoods = Object.fromEntries(formData);
    
    const result = await toBase64(newGoods.image);

    if (!(modalSubmit.classList.contains('submit_edit'))) sendGoods(form, result);
    
    closeModal();
  });
};