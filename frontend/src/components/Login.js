import React from "react";
import { useState } from "react";
import Header from "./Header";

export default function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onLoginSubmit(formValue.email, formValue.password);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <div className="login">
          <div className="login__container login__container_type_input">
            <h2 className="login__title">Вход</h2>
            <form
              action="#"
              name="edit-form"
              className="login__form"
              tabIndex={0}
              onSubmit={handleSubmit}
            >
              <div className="login__form-item">
                <input
                  className="login__input login__input_type_first"
                  name="email"
                  id="popup-input-email"
                  type="email"
                  placeholder="Email"
                  required={true}
                  tabIndex={1}
                  minLength={2}
                  maxLength={40}
                  title="Длина поля должна быть 2 и более сиволов и менее или равно 40."
                  value={formValue.email}
                  onChange={handleChange}
                />
                <span className="login__input-error login-input-name-error">
                  Вы пропустили это поле.
                </span>
              </div>
              <div className="login__form-item">
                <input
                  className="login__input "
                  name="password"
                  id="popup-input-password"
                  type="password"
                  placeholder="Пароль"
                  required={true}
                  tabIndex={2}
                  minLength={2}
                  maxLength={200}
                  title="Длина поля должна быть 2 и более сиволов и менее или равно 200."
                  value={formValue.password}
                  onChange={handleChange}
                />
                <span className="login__input-error login-input-occupation-error ">
                  Вы пропустили это поле.
                </span>
              </div>
              <button className="login__save">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
