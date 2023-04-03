import React from "react";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Login(props) {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const currentUser = React.useContext(CurrentUserContext);

  function onEmailChange(event) {
    setFormData({
      ...formData,
      email: event.target.value,
    });
  }

  function onPasswordChange(event) {
    setFormData({
      ...formData,
      password: event.target.value,
    });
  }

  function handleRegisterButton() {
    props.onRegisterButton();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onLoginUser({
      email: formData.email,
      password: formData.password,
    });
  }

  return (
    <div>
      <div className="top">
        <Header>
          <button
            className="header__link"
            type="button"
            onClick={handleRegisterButton}
          >
            Регистрация
          </button>
        </Header>
      </div>
      <div className="sign">
        <h2 className="sign__title">Вход</h2>
        <form
          name="loginForm"
          className="form sign__form"
          onSubmit={handleSubmit}
        >
          <fieldset className="sign__form-set">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={onEmailChange}
              className="sign__input"
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              required
              onChange={onPasswordChange}
              className="sign__input"
              value={formData.password}
            />
            <button type="submit" className="sign__button">
              Войти
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
