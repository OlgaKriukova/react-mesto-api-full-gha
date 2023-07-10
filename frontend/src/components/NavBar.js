import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav>
      <ul className="navBar">
        {location.pathname === "/" && (
          <li>
            <p className="header__mail">{props.email ? props.email : ""}</p>
          </li>
        )}
        {location.pathname === "/sign-in" && (
          <li>
            {" "}
            <button
              type="button"
              className="header__link"
              onClick={() => navigate("/sign-up", { replace: true })}
            >
              Регистрация
            </button>{" "}
          </li>
        )}
        {location.pathname === "/sign-up" && (
          <li>
            {" "}
            <button
              type="button"
              className="header__link"
              onClick={() => navigate("/sign-in", { replace: true })}
            >
              Войти
            </button>{" "}
          </li>
        )}
        {location.pathname === "/" && (
          <li>
            {" "}
            <button
              type="button"
              className="header__link"
              onClick={props.onLogOut}
            >
              Выйти
            </button>{" "}
          </li>
        )}
      </ul>
    </nav>
  );
}
