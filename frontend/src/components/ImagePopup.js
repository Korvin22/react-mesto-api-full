function ImagePopup(props) {
  return (
    <section
      className={`popup popup-image ${
        props.selectedCard ? "popup_opened" : "popup_closed"
      }`}
    >
      <div className="popup-image__container">
        <button
          className="popup__button-close popup__button-close_image"
          type="button"
          onClick={props.onClose}
        ></button>
        <img src={props.selectedCard ? props.selectedCard.link : ''} alt={props.selectedCard ? props.selectedCard.name : ''} className="popup__picture" />
        <p className="popup__caption">{props.selectedCard ? props.selectedCard.name : ''}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
