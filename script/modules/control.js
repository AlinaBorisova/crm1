import {getElements} from './getElements.js';
import {fetchRequest, sendGoods, getGoods} from './data.js';
import {getModalTotalPrice, setTotalPrice} from './price.js';
import {createRow, editRow} from './tableRows.js';
import {createModalError, createModalDeleteGoods} from './modal.js';

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
  labelCategory.children[1].append(datalist);

  if (err) {
    console.warn(err, data);
    const h2 = document.createElement('h2');
    h2.style.color = 'red';
    h2.textContent = err;
    document.body.append(h2);
    return;
  }
};

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', (err) => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

export const checkboxCheck = () => {
  const elem = getElements();

  elem.modalInputDiscountCheckbox.addEventListener('change', e => {
    if (e.target.checked) {
      elem.modalInputDiscount.disabled = false;
    } else {
      elem.modalInputDiscount.value = '';
      elem.modalInputDiscount.disabled = true;
    }
  });
};

export const modalControl = function (formOverlay) {
  const elem = getElements();
  const openModal = () => {
    elem.formOverlay.classList.add('active');
    elem.modalId.innerHTML = '';
    elem.form.reset();
    elem.modalTotalPrice.textContent = `0 р.`;
    document.querySelector('.preview').src = '';

    checkboxCheck();
  };

  elem.btnAdd.addEventListener('click', () => {
    const modalTitle = document.querySelector('.modal__title');
    const modalSubmit = document.querySelector('.modal__submit');
    modalSubmit.textContent = 'Добавить товар';
    modalTitle.textContent = 'Добавить товар';
    openModal();
  });

  const closeModal = () => {
    formOverlay.classList.remove('active');
  };

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.closest('.overlay__modal modal')) {
        closeModal();
    }
  });

  elem.btnClose.addEventListener('click', () => {
    formOverlay.classList.remove('active');
  });

  return {
    closeModal,
  };
};

export const {closeModal} = modalControl(getElements().formOverlay);

export const deleteControl = function(data) {
  const tbody = getElements().tableBody;

  tbody.addEventListener('click', async ({target}) => {
    const getId = target.getAttribute('data-id');

    if (target.closest('.table__btn_del')) {
      await createModalDeleteGoods(data, getId, target);
      setTotalPrice(data);
    }
  });
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
      }
    }
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
  }
};

const editedPicControl = (data) => {
  const tbody = getElements().tableBody;

  tbody.addEventListener('click', ({target}) => {
    const elemPic = target.closest('.table__btn_pic')
    if (elemPic) {
      let imgUrl = `http://localhost:3000/${data.image}`;
      elemPic.setAttribute('data-pic', imgUrl);

      const img = target.getAttribute('data-pic');
      open(img, 'Image', 'width=800, height=600, top=' + ((screen.height / 2) - 330) + ',left=' + ((screen.width - 800) / 2) + '');
    }
  });
};

const getEditDataModal = (getId, resp) => {
  const elem = getElements();
  let img = document.querySelector('.preview');

  elem.modalId.textContent = getId;
  elem.modalInputTitle.value = resp.title;
  elem.modalInputCategory.value = resp.category;
  elem.modalInputDescription.value = resp.description;
  elem.modalInputUnits.value = resp.units;
  elem.modalInputCount.value = resp.count;
  elem.modalInputDiscount.value = resp.discount;
  elem.modalInputPrice.value = resp.price;

  if (elem.modalInputDiscount.value === 0 || elem.modalInputDiscount.value === '') {
    elem.modalTotalPrice.textContent = `${resp.price * resp.count} p.`;
    elem.modalInputDiscountCheckbox.checked = false;
  } else {
    elem.modalTotalPrice.textContent = `${resp.price * resp.count * (1 - resp.discount / 100)} p.`;
    elem.modalInputDiscountCheckbox.checked = true;
  }
  img.src = `http://localhost:3000/${resp.image}`;

  getModalTotalPrice();
  checkboxCheck();
};

const editPatch =  async (form) => {
  const getId = getElements().modalId.textContent;
  if (!getId) return;
  const formData = new FormData(form);

  const goods = {};
  for (const [key, val] of formData) {
    if (val) {
      goods[key] = val;
    }
  }

  if (goods.image.size) {
    goods.image = await toBase64(goods.image);
  } else {
    delete goods.image;
  }

  await fetchRequest(`goods/${getId}`, {
      method: 'PATCH',
      body: {
        title: form.title.value,
        description: form.description.value,
        category: form.category.value,
        price: form.price.value,
        units: form.units.value,
        count : form.count.value,
        discount: form.discount_count.value,
        image: goods.image,
      },
      callback(err, data) {
        if (err) {
          console.warn(err, data);
          createModalError(err.message);
        } else {
          editRow(goods, getId);
          editedPicControl(data);
          form.reset();
        }
     },
    });

  closeModal();
};

export const editControl = function(data, form) {
  const tbody = getElements().tableBody;
  const elem = getElements();
  const modalTitle = document.querySelector('.modal__title');
  const modalSubmit = document.querySelector('.modal__submit');

  tbody.addEventListener('click', async ({target}) => {
    if (target.closest('.table__btn_edit')) {
      const getId = target.getAttribute('data-id');

      modalSubmit.classList.add('submit_edit');
      modalSubmit.textContent = 'Изменить товар';
      modalTitle.textContent = 'Изменить товар';

      await fetchRequest(`goods/${getId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'aplication/json',
        },
        callback: (dd, data) => {
          getEditDataModal(getId, data);
        },
      });

      elem.formOverlay.classList.add('active');
      setTotalPrice(data);
    }
  });

  form.addEventListener('click',  event => {
    const target = event.target;
    if (target.closest('.submit_edit')) {
      event.preventDefault();
      editPatch(form);
      document.querySelector('.modal__submit').classList.remove('submit_edit');
    }
  });
};

export const formControl = function(form) {
  getModalTotalPrice();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const elem = getElements();
    const modalSubmit = document.querySelector('.modal__submit');
    const formData = new FormData(event.target);
    const newGoods = Object.fromEntries(formData);
    const result = await toBase64(newGoods.image);

    if (!(modalSubmit.classList.contains('submit_edit'))) {
      const index = elem.tableBody.rows.length;

      await sendGoods(form, result);

      const goods = await getGoods();
      const lastGoods = goods[goods.length - 1];

      createRow(lastGoods, index);
      setTotalPrice(goods);
    }

    closeModal();
  });
};


