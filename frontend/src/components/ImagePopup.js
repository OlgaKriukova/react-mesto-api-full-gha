function ImagePopup(props) {
  return (
    <div className={`popup img-popup ${props.card.link ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <figure className="figure-img">
          <img
            src={props.card.link}
            className="figure-img__image"
            alt={props.card.name}
          />
          <figcaption className="figure-img__caption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
