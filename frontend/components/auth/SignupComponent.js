import { useState, useEffect } from "react";
import { signup, isAuth, preSignup } from "../../actions/auth";
import Router from "next/router";
import { Alert, AlertTitle } from "@material-ui/lab";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: true
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  //show the alert after signup
  const showLoading = () =>
    loading ? (
      <Alert
        variant="filled"
        severity="info"
        style={{ display: loading ? "" : "none" }}
      >
        <AlertTitle>Loading....</AlertTitle>
      </Alert>
    ) : (
      ""
    );
  const showError = () =>
    error ? (
      <Alert
        variant="filled"
        severity="error"
        style={{ display: error ? "" : "none" }}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    ) : (
      ""
    );
  const showMessage = () =>
    message ? (
      <Alert
        variant="filled"
        severity="info"
        style={{ display: loading ? "" : "none" }}
      >
        <AlertTitle>Loading....</AlertTitle>
        {message}
      </Alert>
    ) : (
      ""
    );

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit} id="sign-form">
        <h2 className="text-center pt-4 pb-4">Register</h2>
        {showError()}
        {showLoading()}
        {showMessage()}
        <div className="form-group mt-1">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
            id="sign-input"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
            id="sign-input"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
            id="sign-input"
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary" id="sign-button">
            Sign Up
          </button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
