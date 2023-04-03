import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__details">
          <div className="profile__avatar-wrapper">
            <img
              src={currentUser.userAvatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <div className="profile__avatar-overlay">
              <button
                type="button"
                className="profile__avatar-button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
          </div>
          <div className="profile__info">
            <div>
              <h1 className="profile__name">{currentUser.userName}</h1>
              <p className="profile__description">
                {currentUser.userDescription}
              </p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
