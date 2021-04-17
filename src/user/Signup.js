import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Menu from "../core/Menu";
import "../signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const signUpForm = () => {
    return (
      <main class="form-signin text-center">
        <h1 class="h3 mb-3 fw-normal">Signup</h1>
        <form>
          <input
            type="text"
            class="form-control"
            onChange={handleChange("name")}
            value={name}
            placeholder="Name"
            autoFocus
          />
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
            onChange={handleChange("password")}
            value={password}
            placeholder="Password"
          />

          <button
            class="w-100 btn btn-lg btn-primary"
            type="submit"
            onClick={onSubmit}
          >
            Sign up
          </button>

          <p class="mt-5 mb-3 text-muted">&copy; 2021 Battle Field Inc.</p>
        </form>
      </main>
    );
  };

  const successMessage = () => {
    return (
      <div className="row mt-2">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your account was created successfully. Please 
            <Link to="/signin" className="none-underline"> Login Here</Link>
          </div>
        </div>
      </div>
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

  return (
    <div>
      <Menu />
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </div>
  );
};

export default Signup;
