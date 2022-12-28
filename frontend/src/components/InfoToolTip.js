import success_registration from "./../../src/images/success_registration.svg";
import failed_registration from "./../../src/images/failed_registration.svg";

function InfoToolTip(props) {
  return (
    <section
      className={`popup popup-delete ${
        props.isOpen ? "popup_opened" : "popup_closed"
      }`}
    >
      <div className="popup__container-delete">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.isSuccess ? success_registration : failed_registration}
          alt={
            props.isSuccess
              ? "Знак успешной регистрации"
              : "Знак ошибочной регистрации"
          }
        />
        <h2 className="popup__title popup__title_confirm">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoToolTip;
