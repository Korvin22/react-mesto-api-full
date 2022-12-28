function PopupWithForm(props) {
    
  return (
    <section
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : "popup_closed"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.formName}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
          className="popup__button-save popup__button-save_abled"
          type="submit"
        >
          {props.buttonText}
        </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
