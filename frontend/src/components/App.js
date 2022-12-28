import "./../App.css";
import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import React from "react";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "./../utils/Api";
import { apiAuth, ApiAuth } from "../utils/Api.auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { InitialCardsContext } from "../contexts/InitialCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [successReg, setSuccessReg] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [authUserData, setAuthUserData] = useState({});
  const [email,setEmail] = useState(null)
  const userInfo = React.useContext(CurrentUserContext);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (data) => {
    setSelectedCard(data);
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        return {
          userId: res._id,
          name: res.name,
          dedication: res.about,
          avatar: res.avatar,
        };
      })
      .then((initialData) => {
        setCurrentUser(initialData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);

          history.push('/')
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfile(data.name, data.about)
      .then((res) => {
        setCurrentUser({
          name: data.name,
          dedication: data.about,
          avatar: res.avatar,
          userId: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeAvatar(data.avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          dedication: res.about,
          avatar: data.avatar,
          userId: res._id,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api
      .getInitialCard()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке

    const isLiked = card.likes.some((i) => i._id === currentUser.userId);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.filter((c) => c.owner._id !== currentUser.userId)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateCard(data) {
    setIsLoading(true);
    api
      .addCard(data.name, data.link, data.likes)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .finally((res) => {
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleUpdateRegistration(data) {
    apiAuth
      .register(data.email, data.password)
      .then((res) => {
        setSuccessReg(true);
        setIsConfirmPopupOpen(true);
      })
      .catch((err) => {
        setSuccessReg(false);
        setIsConfirmPopupOpen(true);
      });
  }

  function handleUpdateAutharization(data) {
    apiAuth
      .authorize(data.email, data.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setUserData({ password: res.password, email: res.email });
        setAuthUserData({ password: res.password, email: res.email });
        handleLogin();
        console.log(userData)

        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page page_preload">
        <div className="page__container">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onDeleteCard={handleDeleteCard}
              onLikeCard={handleCardLike}
              cards={cards}
              email={email}
              signOut={signOut}
            ></ProtectedRoute>
            <Route path="/sign-in">
              <Login
                onUpdateAutharization={handleUpdateAutharization}
                handleLogin={handleLogin}
                userData={userData}
                authUserData={authUserData}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="/sign-up">
              <Register onUpdateRegistration={handleUpdateRegistration} />
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
          isLoading={isLoading}
        />

        <PopupWithForm name="delete" title="Вы уверены?" formName="" />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip
          isSuccess={successReg}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
