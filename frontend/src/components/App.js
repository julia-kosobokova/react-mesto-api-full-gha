import React, { useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api.js";
import { authApi } from "../utils/AuthApi.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [popupsOptions, setPopupsOptions] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isInfoTooltipOpen: false,
    isRegisterSuccessful: false,
    selectedCard: { name: "", link: "" },
  });

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    userEmail: "",
    userPassword: "",
  });

  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const tokenCheck = useCallback(() => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");

    if (token) {
      // проверим токен
      authApi
        .getEmail(token)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  React.useEffect(() => {
    const initUserInfo = () => {
      api
        .getUserInfo()
        .then((info) => {
          setCurrentUser((previousUserState) => {
            return {
              ...previousUserState,
              userName: info.name,
              userDescription: info.about,
              userAvatar: info.avatar,
              id: info._id,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    initUserInfo();

    return () => {};
  }, []);

  const handleEditAvatarClick = () => {
    setPopupsOptions({
      ...popupsOptions,
      isEditAvatarPopupOpen: true,
    });
  };

  const handleEditProfileClick = () => {
    setPopupsOptions({
      ...popupsOptions,
      isEditProfilePopupOpen: true,
    });
  };

  const handleAddPlaceClick = () => {
    setPopupsOptions({
      ...popupsOptions,
      isAddPlacePopupOpen: true,
    });
  };

  const closeAllPopups = () => {
    setPopupsOptions({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isInfoTooltipOpen: false,
      isRegisterSuccessful: popupsOptions.isRegisterSuccessful, //Оставляем прежнее значение, чтобы не мигало окно ошибки регистрации
      selectedCard: { name: "", link: "" },
    });
  };

  const handleCardClick = (card) => {
    setPopupsOptions({
      ...popupsOptions,
      selectedCard: card,
    });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .saveUserInfo({
        name: name,
        description: about,
      })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          userName: name,
          userDescription: about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .updateUserAvatar(avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          userAvatar: avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([initialCards]) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    // Проверяем, моя ли это карточка
    const isOwn = card.owner._id === currentUser.id;

    if (isOwn) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((cards) =>
            cards.filter((c) => (c._id === card._id ? false : true))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleAddPlaceSubmit(card) {
    api
      .saveNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Форма регистрации пользователя
  const handleRegisterUser = ({ email, password }) => {
    authApi
      .signup({
        email: email,
        password: password,
      })
      .then(() => {
        closeAllPopups();
        setCurrentUser({
          ...currentUser,
          userEmail: email,
          userPassword: password,
        });
        setPopupsOptions({
          ...popupsOptions,
          isInfoTooltipOpen: true,
          isRegisterSuccessful: true,
        });
      })
      .catch((err) => {
        console.log(err);
        setPopupsOptions({
          ...popupsOptions,
          isInfoTooltipOpen: true,
          isRegisterSuccessful: false,
        });
      });
  };

  // Форма входа пользователя
  const handleLoginUser = ({ email, password }) => {
    authApi
      .signin({
        email: email,
        password: password,
      })
      .then((data) => {
        setCurrentUser({
          ...currentUser,
          userEmail: email,
          userPassword: password,
        });

        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);
          navigate("/", { replace: true });
        }
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Выход пользователя
  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  // Переход в форму регистрации
  function handleRegisterButton() {
    navigate("/sign-up", { replace: true });
  }

  // Переход в форму входа
  function handleLoginButton() {
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <div className="registerContainer">
                  <Register
                    onRegisterUser={handleRegisterUser}
                    onLoginButton={handleLoginButton}
                  />
                  <InfoTooltip
                    isOpen={popupsOptions.isInfoTooltipOpen}
                    isSuccessful={popupsOptions.isRegisterSuccessful}
                    onClose={closeAllPopups}
                  />
                </div>
              }
            />

            <Route
              path="/sign-in"
              element={
                <div className="loginContainer">
                  <Login
                    onLoginUser={handleLoginUser}
                    onRegisterButton={handleRegisterButton}
                  />
                </div>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <div>
                    <div className="top">
                      <Header>
                        <span className="header__user">{userEmail}</span>
                        <button
                          className="header__link"
                          type="button"
                          onClick={signOut}
                        >
                          Выйти
                        </button>
                      </Header>
                    </div>
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />

                    <EditProfilePopup
                      isOpen={popupsOptions.isEditProfilePopupOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                    />

                    <AddPlacePopup
                      onClose={closeAllPopups}
                      isOpen={popupsOptions.isAddPlacePopupOpen}
                      onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                      card={popupsOptions.selectedCard}
                      onClose={closeAllPopups}
                    />

                    <PopupWithForm
                      name="confirm"
                      title="Вы уверены?"
                      buttonText="Да"
                    />

                    <EditAvatarPopup
                      isOpen={popupsOptions.isEditAvatarPopupOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                    />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
