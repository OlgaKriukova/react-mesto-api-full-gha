import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    if (!props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      buttonText={props.isLoading ? "Создание" : "Создать"}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__input popup__input_type_first "
          name="name"
          id="popup-input-title"
          type="text"
          placeholder="Название"
          required={true}
          tabIndex={1}
          minLength={2}
          maxLength={30}
          title="Длина поля должна быть 2 и более сиволов и менее или равно 40"
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup-input-title-error">
          Вы пропустили это поле.
        </span>
      </div>
      <div className="popup__form-item">
        <input
          className="popup__input"
          name="link"
          id="popup-input-url"
          type="url"
          placeholder="Ссылка на картинку"
          required={true}
          tabIndex={2}
          title="в поле «Ссылка на картинку» должен быть URL"
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error popup-input-url-error">
          Вы пропустили это поле.
        </span>
      </div>
    </PopupWithForm>
  );
}
