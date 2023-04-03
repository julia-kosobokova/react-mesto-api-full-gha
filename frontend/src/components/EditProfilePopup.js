import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [profileData, setProfileData] = React.useState({
    name: "",
    description: "",
  });
  const currentUser = React.useContext(CurrentUserContext);

  function onNameChange(event) {
    setProfileData({
      ...profileData,
      name: event.target.value,
    });
  }

  function onDescriptionChange(event) {
    setProfileData({
      ...profileData,
      description: event.target.value,
    });
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: profileData.name,
      about: profileData.description,
    });
  }

  React.useEffect(() => {
    setProfileData({
      name: currentUser.userName,
      description: currentUser.userDescription,
    });
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Введите имя"
        onChange={onNameChange}
        value={profileData.name}
        required
        className="popup__input popup__input_type_name"
        id="name-input"
        minLength="2"
        maxLength="40"
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        name="description"
        placeholder="Введите описание"
        onChange={onDescriptionChange}
        value={profileData.description}
        required
        className="popup__input popup__input_type_description"
        id="description-input"
        minLength="2"
        maxLength="200"
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
