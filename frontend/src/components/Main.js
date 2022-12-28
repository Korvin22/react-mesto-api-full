import { api } from "./../utils/Api";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { InitialCardsContext } from "../contexts/InitialCardsContext";
import Header from "./Header";

function Main(props) {
  const userInfo = React.useContext(CurrentUserContext);
  
  const initialCardsInfo = React.useContext(InitialCardsContext);

  return (
    <>
      <Header email={props.email} signOut={props.signOut}/>
      <main className="content page__content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__edition">
              <img
                className="profile__image"
                alt="Фото пользователя"
                src={userInfo.avatar}
              />
              <button
                className="profile__change"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__text">
              <div className="profile__name">
                <h1 className="profile__title">{userInfo.name}</h1>
                <button
                  className="profile__open-popup"
                  type="button"
                  onClick={props.onEditProfile}
                />
              </div>
              <p className="profile__subtitle">{userInfo.dedication}</p>
            </div>
          </div>
          <button
            className="profile__button-plus"
            type="button"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                _id={card._id}
                name={card.name}
                link={card.link}
                likes={card.likes}
                owner={card.owner}
                onCardClick={props.onCardClick}
                onCardLike={props.onLikeCard}
                onDeleteCard={props.onDeleteCard}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
