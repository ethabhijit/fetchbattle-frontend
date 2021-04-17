import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";
import Menu from "../core/Menu";
import "../signin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/user/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row mt-2">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <main class="form-signin text-center">
        <h1 class="h3 mb-3 fw-normal">Signin</h1>
        <form>
          <input
            type="email"
            class="form-control"
            onChange={handleChange("email")}
            value={email}
            placeholder="Email address"
          />
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onChange={handleChange("password")}
            value={password}
          />

          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={onSubmit}
          >
            Sign in
          </button>

          <p class="mt-5 mb-3 text-muted">&copy; 2021 Battle Field Inc.</p>
        </form>
      </main>
    );
  };

  return (
    <div>
      <Menu />
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
