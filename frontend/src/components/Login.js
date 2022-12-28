import logo from "./../images/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import useForm from "../hooks/UseForm";


function Login(props) {
  const [isRender, setIsRender] = useState(false);
  const {values, handleChange, setValues} = useForm({});

  function linkRender() {
    setIsRender(true);
  }


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAutharization({
      email: values.email,
      password: values.password,
    });
    props.handleLogin();
    console.log(props.handleLogin);
  }
  return (
    <div className="page page_preload">
      <Header />
      <div className="register__container">
        <h2 className="register__title">Вход</h2>
        <form
          className="register__form"
          name="email-and-password"
          noValidate
          onSubmit={handleSubmit}
        >
          <input
            required
            type="text"
            name="email"
            className="register__input"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            id="email"
            onChange={handleChange}
            value={values.email || ""}
          />

          <input
            required
            type="password"
            name="password"
            className="register__input"
            placeholder="Пароль"
            id="password"
            onChange={handleChange}
            value={values.password || ""}
          />

          <button className="register__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
