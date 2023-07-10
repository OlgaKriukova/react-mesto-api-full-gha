import imgSuccess from "../images/success.png";
import imgFail from "../images/fail.png";

export default function InfoTooltip(props) {
  const textSuccess = props.data?.textSuccess ? props.data?.textSuccess : "Вы успешно зарегистрировались!";
  const textFail = props.data?.textFail ? props.data?.textFail : "Что-то пошло не так! Попробуйте ещё раз.";

  return (
      <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_type_input">
          <button className="popup__close" type="button" onClick={props.onClose}/>
          <figure className="popup__figure">
            <img src={props.data.isSuccess ? imgSuccess : imgFail} className="popup__figure-img" />
            <figcaption className="popup__figure-text">
              {props.data.isSuccess ? textSuccess : textFail}
            </figcaption>
          </figure>
        </div>
      </div>
  );
}
