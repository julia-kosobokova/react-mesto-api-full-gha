import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [formData, setFormData] = React.useState({ name: "", link: "" });

  function onNameChange(event) {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  }

  function onLinkChange(event) {
    setFormData({
      ...formData,
      link: event.target.value,
    });
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: formData.name,
      link: formData.link,
    });
  }

  React.useEffect(() => {
    setFormData({ name: "", link: "" });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        onChange={onNameChange}
        value={formData.name}
        required
        className="popup__input popup__input_type_name"
        id="element-name-input"
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error element-name-input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={onLinkChange}
        value={formData.link}
        required
        className="popup__input popup__input_type_link"
        id="url-input"
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
