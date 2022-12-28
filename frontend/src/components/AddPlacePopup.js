import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
const [cardName,setCardName] = useState('');
const [cardLink,setCardLink] = useState('');


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateCard({
      name: cardName,
      link: cardLink,
      likes:[]
    });
  }

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }



  return (
    <PopupWithForm
      name="plus"
      title="Новое место"
      formName="title-and-reference"
      isOpen={props.isOpen}
      buttonText={props.isLoading ?"Сохранение..." :"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        name="title"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        id="title"
        value={cardName}
        onChange={handleChangeCardName}
      />
      <span className="error title-error"></span>
      <input
        required
        type="url"
        name="reference"
        className="popup__input popup__input_type_reference"
        placeholder="Ссылка"
        id="reference"
        value={cardLink}
        onChange={handleChangeCardLink}
      />
      <span className="error reference-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
