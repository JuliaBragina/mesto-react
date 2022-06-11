import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const imageRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imageRef.current.value
    });
  }

  React.useEffect(() => {
    imageRef.current.value="";
  }, [isOpen]);

  return(
    <PopupWithForm name={"update"} formTitle={"Обновить аватар"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="popup__section">
        <input type="url" name="link" ref={imageRef} className="popup-update__item popup-item popup-update__item" placeholder="Ссылка на новый аватар"  autoComplete="off" required />
        <span className="descr-input-error popup__input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;