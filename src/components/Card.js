import React from 'react';
import deleteButton from '../images/delete-button.svg';

function Card({card, onCardClick}) {
  return (
    <div className="elements__item">
      <img className="elements__img" style={{ backgroundImage: `url(${card.link})`}} onClick={_ => onCardClick(card)}/>
      <button className='elements__delete-button' src={deleteButton}></button>
      <div className="elements__flex-container">
      <h2 className="elements__title">{card.name}</h2>
        <section className = "elements__section">
          <button type="button" aria-label = "Нравится" className="elements__like-button"></button>
          <p className="elements__likes-quantity" >{card.likes}</p>
        </section>
      </div>
    </div>
  );
};

export default Card;