import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (!props.isOpen) {
      avatarRef.current.value = "";
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__form-item">
        <input
          className="popup__input"
          name="avatar"
          id="popup-input-url-avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required={true}
          tabIndex={2}
          title="в поле «Ссылка на картинку» должен быть URL"
          ref={avatarRef}
        />
        <span className="popup__input-error popup-input-url-avatar-error">
          Вы пропустили это поле.
        </span>
      </div>
    </PopupWithForm>
  );
}
