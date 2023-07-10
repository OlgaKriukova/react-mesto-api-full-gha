import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_input">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="#"
          name={props.name}
          className="popup__form popup__form-validated"
          tabIndex={0}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save" disabled={props.isLoading}>
            {props.buttonText || props.isLoading ? "Сохранение" : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
