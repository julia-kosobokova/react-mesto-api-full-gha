import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} popup_${
        props.name
      }`}
    >
      <div className={`popup__container popup__container_${props.name}`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={`${props.name}Form`}
          className="form popup__form"
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__form-set">
            {props.children}
            <button type="submit" className="popup__save-button">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;