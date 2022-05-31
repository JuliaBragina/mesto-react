import React from 'react';
import Card from './Card';

function Main({data, onEditAvatar, onEditProfile, onAddPlace, userName, userDescription, userAvatar, onCardClick}) {
  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}/>
        <button type="button" aria-label="Редактировать" className="profile__edit-avatar"></button>
        <div className="profile__info">
          <div className="profile__edit-container">
            <h1 className ="profile__name">{userName}</h1>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className = "profile__description">{userDescription}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <>
          {
              data.map((card, id) => <Card key={id} card={card} onCardClick={onCardClick}/>)          
          }
        </>
      </section>
    </main>
  );
};

export default Main;