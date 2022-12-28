import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import isOpen from "./App";

function EditProfilePopup(props) {
  const userInfo = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [dedication, setDedication] = useState("");

  useEffect(() => {
    setName(userInfo.name);
    setDedication(userInfo.dedication);
  }, [userInfo, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDedication(e) {
    setDedication(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
        name: name,
        about: dedication,
    });
  } 

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      formName="name-and-job"
      isOpen={props.isOpen}
      buttonText={props.isLoading ?"Сохранение..." :"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="error name-error"></span>
      <input
        type="text"
        name="dedication"
        id="dedication"
        className="popup__input popup__input_type_job"
        minLength="2"
        maxLength="200"
        value={dedication || ''}
        onChange={handleChangeDedication}
        required
      />
      <span className="error dedication-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
