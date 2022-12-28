import React from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
  const inputAvatar = React.useRef();
 

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputAvatar)
    props.onUpdateAvatar({
      avatar: `${inputAvatar.current.value}` /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      formName="title-and-reference"
      isOpen={props.isOpen}
      buttonText={props.isLoading ?"Сохранение..." :"Сохранить"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        name="reference"
        className="popup__input popup__input_type_reference"
        placeholder="Ссылка"
        id="reference-avatar"
        ref={inputAvatar || ''}
      />
      <span className="error reference-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
