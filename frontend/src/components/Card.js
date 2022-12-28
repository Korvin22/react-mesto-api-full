
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
    const userInfo = React.useContext(CurrentUserContext); 
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
    console.log(props.card)
  }

  function handleDeleteClick() {
    props.onDeleteCard(props.card);
  }

  const isOwner = userInfo.userId === props.owner._id;
  const trashButtonClass = `${isOwner ? 'elements__trash' : 'elements__trash_hidden'}`

  const isLiked = props.likes.some(i => i._id === userInfo.userId);
  const cardLikesClass = `${isLiked ? 'elements__like elements__like_active' : 'elements__like'}`

  return (
    <div className="elements__element">
      <img
        src={props.link}
        alt={props.name}
        className="elements__picture"
        onClick={handleClick}
      />
      <button className={trashButtonClass} type="button" onClick={handleDeleteClick}></button>
      <div className="elements__description">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__likes">
          <button className={cardLikesClass} type="button" onClick={handleLikeClick}></button>
          <p className="elements__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
