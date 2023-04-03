import React from "react";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Register(props) {
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

  function handleLoginButton() {
    props.onLoginButton();
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onRegisterUser({
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
            onClick={handleLoginButton}
          >
            Войти
          </button>
        </Header>
      </div>
      <div className="sign">
        <h2 className="sign__title">Регистрация</h2>
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
              Зарегистрироваться
            </button>
            <p className="sign__signin-footer">
              Уже зарегистрированы?{" "}
              <button
                className="sign__signin-link"
                type="button"
                onClick={handleLoginButton}
              >
                Войти
              </button>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Register;
