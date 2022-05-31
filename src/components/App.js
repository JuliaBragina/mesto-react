import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [me, setMe] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCloseButton() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectCard(null);
  }

  const onCardClick = (cards) => setSelectCard(cards);

  useEffect(() => {
    api.getUser()
    .then(res => setMe(res))
    .catch(err => alert(err));
  }, []);

  useEffect(() => {
    api.getAllCards()
    .then(res => {
      setCards(res.map((item) => ({
        name: item.name,
        link: item.link,
        id: item._id,
        likes: item.likes.length
      })))
    })
    .catch(err => alert(err));
  }, []);

  return (
    <div className="App">
        <div className="page">

          <Header />
          <Main 
            data={cards} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            userAvatar={me.avatar} 
            userName={me.name} 
            userDescription={me.about} 
            onCardClick={onCardClick} />
          <Footer />

        </div>

        <PopupWithForm name={"edit"} formTitle={"Редактировать профиль"} buttonText={"Сохранить"} isOpen={isEditProfilePopupOpen} onClose={handleCloseButton}>
          <section className="popup__section">
            <input id="name-input" type="text" name="name" className="popup-edit__item popup-item popup-edit__item_el_name" placeholder="Имя"  required minLength="2" maxLength="40" autoComplete="off"/>
            <span className="name-input-error popup__input-error"></span>
          </section>
          <section className="popup__section">
            <input id="descr-input" type="text" name="description" className="popup-edit__item popup-item popup-edit__item_el_description" placeholder="Краткое описание"  required minLength="2" maxLength="200" autoComplete="off"/>
            <span className="descr-input-error popup__input-error"></span>
          </section>
        </PopupWithForm>

        <PopupWithForm name={"add"} formTitle={"Новое место"} buttonText={"Сохранить"} isOpen={isAddPlacePopupOpen} onClose={handleCloseButton}>
          <section className="popup__section">
            <input type="text" name="name" className="popup-add__item popup-item popup-add__item_el_name" placeholder="Название"  minLength="2" maxLength="30" autoComplete="off" required/>
            <span className="name-input-error popup__input-error"></span>
          </section>
          <section className="popup__section">
            <input type="url" name="link" className="popup-add__item popup-item popup-add__item_el_description" placeholder="Ссылка на картинку"  autoComplete="off" required/>
            <span className="descr-input-error popup__input-error"></span>
          </section>
        </PopupWithForm>

        <PopupWithForm name={"update"} formTitle={"Обновить аватар"} buttonText={"Сохранить"} isOpen={isEditAvatarPopupOpen} onClose={handleCloseButton}>
          <section className="popup__section">
            <input type="url" name="link" className="popup-update__item popup-item popup-update__item" placeholder="Ссылка на новый аватар"  autoComplete="off" required />
            <span className="descr-input-error popup__input-error"></span>
          </section>
        </PopupWithForm>

        <PopupWithForm name={"delete"} formTitle={"Вы уверенны?"} buttonText={"Да"}>
        </PopupWithForm>

        <ImagePopup card={selectCard} onClose={handleCloseButton}/>
      </div>
  );
}

export default App;
