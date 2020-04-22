import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Button } from "@material-ui/core";
// import LoginGoogle  from './LoginGoogle';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        //save user info to localstorage
        //authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/`);
          }
        });
      }
    });
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signinForm = () => {
    //show the alert after signin
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
    return (
      <form onSubmit={handleSubmit} id="sign-form">
        <h2 className="text-center pt-4 pb-4">Welcome Back</h2>
        {showError()}
        {showLoading()}
        {showMessage()}
        <div className="form-group mt-1">
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
          <button className="btn btn-primary mr-3 mb-4" id="sign-button">
            Sign In
          </button>
          <Link href="/auth/password/forgot">
            <a className="small mt-5">Reset Password</a>
          </Link>
          <hr />
          <Link href="/signup">
            <a className="small mt-5">Register</a>
          </Link>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {/* <LoginGoogle  /> */}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;
