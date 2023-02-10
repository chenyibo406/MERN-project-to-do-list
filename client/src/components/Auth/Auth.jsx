import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { signin, signup } from "../../actions/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.post(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );
      const result = res?.data;
      const token = tokenResponse.access_token;
      try {
        dispatch({ type: "AUTH", data: { result, token } });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="vh-100" style={{ backgroundColor: "transparent" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {isSignup ? "Sign up" : "Sign in"}
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {isSignup && (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              name="name"
                              type="text"
                              className="form-control"
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="form3Example1c"
                              className="form-label"
                            >
                              <i className="bi bi-people-fill  me-3 bi-fw">
                                Your Name
                              </i>
                            </label>
                          </div>
                        </div>
                      )}

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="form3Example3c"
                            className="form-label"
                          >
                            <i className="bi bi-envelope-at-fill me-3">
                              Your Email
                            </i>
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="form3Example4c"
                            className="form-label"
                          >
                            <i className="bi bi-file-earmark-lock2-fill me-3">
                              Your Password
                            </i>
                          </label>
                        </div>
                      </div>
                      {isSignup && (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              name="confirmPassword"
                              type="password"
                              className="form-control"
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="form3Example4cd"
                              className="form-label"
                            >
                              <i className="bi bi-check2-all me-3">
                                Confirm your password
                              </i>
                            </label>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-primary d-flex flex-row align-items-center mb-4 "
                      >
                        {isSignup ? "Sign Up" : "Sign In"}
                      </button>

                      <button
                        className="btn btn-primary mb-4 "
                        onClick={() => login()}
                      >
                        Google Sign In
                      </button>

                      <div className="d-flex justify-content-end">
                        <div className="align-items-center">
                          <button
                            onClick={switchMode}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            {isSignup
                              ? "Already have an account? Sign in"
                              : "Don't have an account? Sign Up"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
