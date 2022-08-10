import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import '../index.css';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState(null);
  const [currenUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getAllCards()
    .then(res => setCards(res))
    .catch(err => alert(err));

    api.getUser()
    .then(res => setCurrentUser(res))
    .catch(err => alert(err));
  }, []);

  const onCardClick = (cards) => setSelectCard(cards);

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

  function handleUpdateUser(data) {
    api.setUserInfo(data)
    .then((newUser) => setCurrentUser(newUser));
    handleCloseButton();
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    api.setUserAvatar(data)
    .then((newAvatar) => setCurrentUser(newAvatar));
    handleCloseButton();
  }

  function handleAddPlace(data) {
    api.addCards(data)
    .then((newCard) => setCards([newCard, ...cards]));
    handleCloseButton();
  }

  function handleCardLike(data, currenUser) {
    const isLiked = data.likes.some(i => i._id === currenUser._id);
    api.changeLikeCardStatus(data._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === data._id ? newCard : c));
    });
  } 

  function handleCardDelete(idCard) {
    api.deletCard(idCard)
    .then(() => {
      setCards(cards => cards.filter(c => c._id != idCard));
    });
  }

  return (
    <CurrenUserContext.Provider value={currenUser}>
      <div className="App">
          <div className="page">

            <Header />
            <Main 
              data={cards} 
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onCardClick={onCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            <Footer />

          </div>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={handleCloseButton} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup  isOpen={isEditAvatarPopupOpen} onClose={handleCloseButton} onUpdateAvatar={handleUpdateAvatar}/>

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={handleCloseButton} onAddCard={handleAddPlace}/>

          <PopupWithForm name={"delete"} formTitle={"Вы уверенны?"} buttonText={"Да"} />

          <ImagePopup card={selectCard} onClose={handleCloseButton}/>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
