import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import pencilBig from "../images/pencil-big.png";
import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <Header onLogOut={props.onLogOut} email={props.email} />
      <section className="profile" aria-label="инфо">
        <button
          type="button"
          className="edit-avatar-button"
          onClick={props.onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="аватарка"
            className="profile__avatar"
          />
          <div className="overlay">
            <img src={pencilBig} alt="карандаш" />
          </div>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="add-button"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements" aria-label="фото">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}

export default Main;
