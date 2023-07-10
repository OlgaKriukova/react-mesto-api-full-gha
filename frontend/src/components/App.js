import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/Api";
import { signin, signup, checkToken } from "../utils/Auth.js";
import Main from "./Main";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      console.log("token found - " + token);

      checkToken(token)
        .then((result) => {
          setEmail(result.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log("check token - catch - " + err);
        });
    } else {
      console.log("token not found");
    }
  }, []);

  useEffect(() => {
    if (email) {
      console.log("user logged on, loading information...");
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((results) => {
          setCurrentUser(results[0]);
          setCards(results[1]);
        })
        .catch((err) => {
          console.log("get intitial data - catch - " + err);
        });
    } else {
      console.log("user logged off");
    }
  }, [email]);

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("api.likeCard - catch - " + err);
      });
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log("api.delCard - catch - " + err);
      });
  }

  function handleUpdateUser(userInfo) {
    setisLoading(true);
    api
      .setUserInfo(userInfo)
      .then((result) => {
        console.log("api.setUserInfo - then - " + result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("api.setUserInfo - catch - " + err);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  function handleUpdateAvatar(avatarInfo) {
    setisLoading(true);
    api
      .setUserAvatar(avatarInfo)
      .then((result) => {
        console.log("api.setUserAvatar - then - " + result);
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("api.setUserAvatar - catch - " + err);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  function handleAddPlace(placeInfo) {
    setisLoading(true);
    api
      .addCard(placeInfo)
      .then((result) => {
        console.log("api.addCard - then - " + result);

        setCards([result, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log("api.addCard - catch - " + err);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleLogin(email) {
    setEmail(email);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  function handleRegisterSubmit(email, password) {
    if (!email || !password) {
      console.log("Register - Error - No register data");
      return null;
    }

    signup(email, password)
      .then(() => {
        setInfoTooltipData({
          isSuccess: true,
        });
        setInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setInfoTooltipData({
          isSuccess: false,
        });
        setInfoTooltipOpen(true);
        console.log("Register handleSubmit Error APPS -" + err);
      });
  }

  function handleLoginSubmit(email, password) {
    if (!email || !password) {
      console.log("Login - Error - No login data");
      return;
    }

    signin(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setInfoTooltipData({
          isSuccess: false,
        });
        setInfoTooltipOpen(true);
        console.log("Login signin Error -" + err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  email={email}
                  onEditProfile={() => setEditProfilePopupOpen(true)}
                  onAddPlace={() => setAddPlacePopupOpen(true)}
                  onEditAvatar={() => setEditAvatarPopupOpen(true)}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onLogOut={handleLogOut}
                  routeName={"Выйти"}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegisterSubmit={(email, password) =>
                    handleRegisterSubmit(email, password)
                  }
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login onLoginSubmit={handleLoginSubmit} />}
            />
            <Route
              path="*"
              element={
                email ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            data={infoTooltipData}
          />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
