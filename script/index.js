'use strict';
//Вместо querySelectorAll я написала querySelector
const heading = document.querySelector('h1');
console.log(heading);

// Указала, что нужен имеено элемент под 1 индексом
const modalForm = document.querySelectorAll('form')[1];
console.log(modalForm);

//Вместо querySelectorAll я написала querySelector
const modalCheckbox = document.querySelectorAll('.modal__input')[4];
console.log(modalCheckbox);

//Вместо querySelectorAll я написала querySelector
const nearCheckbox = document.querySelector('.modal__checkbox-wrapper');
console.log(nearCheckbox);

