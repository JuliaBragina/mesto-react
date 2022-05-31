//Для формы редактирования 
const popupEdit = document.querySelector('.popup-edit');
export const popupEditForm = popupEdit.querySelector('.popup-edit__form');
export const profileEditOpenButton = document.querySelector('.profile__edit-button');

//Для формы добавления карточки 
export const popupAddForm = document.querySelector('.popup-add__form');
export const profileAddOpenButton = document.querySelector('.profile__add-button');

export const popupUpdateFrom = document.querySelector('.popup-update');
export const profileUpdateAvatarButtnon = document.querySelector('.profile__avatar');

export const popupName = document.querySelector('.popup-edit__item_el_name');
export const popupDescr = document.querySelector('.popup-edit__item_el_description');

export const objects = {
    formSelector: '.popup__form',
    popupItemSelector: '.popup-item',
    submitButtonSelector: '.popup-button',
    inactiveButtonClass: 'popup-button_inactive',
    inputErrorClass: 'popup-item_type_error',
    inputActiveClass: 'popup__input-error_active',
    popupSectionSelector: '.popup__section',
    inputErrorSelector: '.popup__input-error'
  }; 