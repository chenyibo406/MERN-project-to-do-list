import React, { useEffect, useState } from "react";
import "./Navbar.styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  useEffect(() => {
    const id = tick();
    return () => clearTimeout(id);
  }, []);

  const tick = () => {
    return setInterval(() => {
      setTime(() => new Date().toLocaleTimeString());
    }, 1000);
  };

  return (
    <div className="navbar container d-flex h-100">
      <div className="px-4 h1 text-center text-primary d-flex ">
        <i className="bi bi-clock-fill"> {time}</i>
      </div>

      <div className="login-container px-4">
        {user ? (
          <div className="d-flex">
            <h2 className="userName">{user.result.name}</h2>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <form className="form">
            <Link to="/auth">
              <button type="botton" className="btn">
                <h4 className="text-primary">Login</h4>
              </button>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default Navbar;
