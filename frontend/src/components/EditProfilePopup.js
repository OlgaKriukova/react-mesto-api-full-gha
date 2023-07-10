import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name ? currentUser.name : "");
    setDescription(currentUser.about ? currentUser.about : "");
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__input popup__input_type_first"
          name="name"
          id="popup-input-name"
          type="text"
          placeholder="Ваше имя"
          required={true}
          tabIndex={1}
          minLength={2}
          maxLength={40}
          title="Длина поля должна быть 2 и более сиволов и менее или равно 40."
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup-input-name-error">
          Вы пропустили это поле.
        </span>
      </div>
      <div className="popup__form-item">
        <input
          className="popup__input "
          name="about"
          id="popup-input-about"
          type="text"
          placeholder="О себе"
          required={true}
          tabIndex={2}
          minLength={2}
          maxLength={200}
          title="Длина поля должна быть 2 и более сиволов и менее или равно 200."
          value={description}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error popup-input-about-error ">
          Вы пропустили это поле.
        </span>
      </div>
    </PopupWithForm>
  );
}
