import markSuccess from "../images/success.svg";
import markFail from "../images/fail.svg";
import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} popup_${
        props.name
      }`}
    >
      <div className="popup__container popup__container_tooltip">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        {props.isSuccessful ? (
          <>
            <img
              src={markSuccess}
              alt="Результат регистрации"
              className="popup__tooltip-mark"
            />
            <p className="popup__tooltip-text">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={markFail}
              alt="Результат регистрации"
              className="popup__tooltip-mark"
            />
            <p className="popup__tooltip-text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
