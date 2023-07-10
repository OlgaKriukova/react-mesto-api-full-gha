import trash from "../images/Trash.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `figure__like ${
    isLiked && "figure__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <figure className="figure">
      {isOwn && (
        <button
          type="button"
          className="figure__trash"
          onClick={handleDeleteClick}
        >
          <img src={trash} alt="корзина" />
        </button>
      )}
      <img
        src={props.card.link}
        className="figure__img"
        alt="место"
        onClick={handleClick}
      />
      <figcaption className="figure__caption">
        <p className="figure__text"> {props.card.name} </p>
        <div className="counter-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="figure__counter"> {props.card.likes.length} </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
