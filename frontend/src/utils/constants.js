
// Находим форму в DOM
const formEdit = document.querySelector(".popup__form_edit");
const formAddCard = document.querySelector(".popup__form_plus");
const formAvatar1 = document.querySelector(".popup__form_avatar");
const buttonOpenPopupAvatar = document.querySelector(".profile__change");

const selectors = {
  inputTitle: ".popup__input_type_title",
  inputReference: ".popup__input_type_reference",
  elements: ".elements",
  template: ".element-template",
  element: ".elements__element",
  element__title: ".elements__title",
  elements__picture: ".elements__picture",
  trash: ".elements__trash",
  like: ".elements__like",
  popup__picture: ".popup__picture",
  popup__caption: ".popup__caption",
};

const validationConfig = {
  button: ".popup__button-save",
  inactiveButton: "popup__button-save_disabled",
  activeButton: "popup__button-save_abled",
  input: "popup__input",
};

const initialCardsLocal = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  selectors,
  validationConfig,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddCard,
  formEdit,
  formAddCard,
  formAvatar1,
  buttonOpenPopupAvatar,
};

export function addSpinner(popup) {
  const button = popup.querySelector(".popup__button-save");
  button.textContent = "Сохранение...";
}

export function removeSpinner(popup) {
  const button = popup.querySelector(".popup__button-save");
  button.textContent = "Сохранить";
}
