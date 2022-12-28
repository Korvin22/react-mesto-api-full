import logo from "./../images/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";

function Header(props) {
  const [isRender, setIsRender] = useState(false);
  function linkRender() {
    setIsRender(true);
  }
  useEffect(() => {
    linkRender();
  }, [isRender]);
  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={logo} alt="лого" />
        <Route exact path="/">
          <p className="header__email">{props.email || ""}</p>
          <Link className="header__link" onClick={props.signOut} to="/sign-in">
            Выйти
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
