import logo from "./../images/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import InfoToolTip from "./InfoToolTip";
import { api } from "../utils/Api";
import Header from "./Header";
import useForm from "../hooks/UseForm";

function Register(props) {
  const [isRender, setIsRender] = useState(false);

  const {values, handleChange, setValues} = useForm({});

  function linkRender() {
    setIsRender(true);
  }

  useEffect(() => {
    linkRender();
  }, [isRender]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateRegistration({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="page page_preload">
      <Header />
      <div className="register__container">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          name="email-and-password"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            required
            type="email"
            name="email"
            className="register__input"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            id="email"
            value={values.email || ""}
            onChange={handleChange}
          />

          <input
            required
            type="password"
            name="password"
            className="register__input"
            placeholder="Пароль"
            id="password"
            value={values.password || ""}
            onChange={handleChange}
          />

          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="register__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
