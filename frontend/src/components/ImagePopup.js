function ImagePopup(props) {
  return (
    <div
      className={`popup popup_image ${props.card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_image">
        <img
          src={props.card.link}
          className="popup__image"
          alt={props.card.name}
        />
        <p className="popup__text">{props.card.name}</p>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
