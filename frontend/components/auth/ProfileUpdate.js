import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Alert, AlertTitle } from "@material-ui/lab";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    userData: process.browser && new FormData(),
    username_for_photo: ""
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    username_for_photo,
    userData
  } = values;

  const init = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          username_for_photo: data.username,
          name: data.name,
          email: data.email,
          about: data.about
        });
      }
    });
  };

  useEffect(() => {
    init();
    setValues({ ...values, userData: new FormData() });
  }, []);

  const handleChange = name => e => {
    // console.log(e.target.value);

    let value = name === "photo" ? e.target.files[0] : e.target.value;

    userData.set(name, value);

    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false
    });
    // console.log(...userData)
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(...userData);
    setValues({ ...values, loading: true });
    update(token, userData).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        // console.log(data)
        updateUser(data, () => {
          setValues({
            ...values,
            // usernameImgSrc: data.username,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            password: "",
            success: true,
            loading: false
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit} className="pl-5">
      <div className="form-group">
        <Button
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
        >
          <label className="">
            Featured photo
            <input
              onChange={handleChange("photo")}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </Button>
      </div>
      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          onChange={handleChange("username")}
          type="text"
          value={username}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="text"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          onChange={handleChange("about")}
          type="text"
          value={about}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );

  const showError = () => (
    <Alert
      variant="filled"
      severity="error"
      style={{ display: error ? "" : "none" }}
    >
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <Alert
      variant="filled"
      severity="success"
      style={{ display: success ? "" : "none" }}
    >
      <AlertTitle>Success</AlertTitle>
      {success}
    </Alert>
  );

  const showLoading = () => (
    <Alert
      variant="filled"
      severity="info"
      style={{ display: loading ? "" : "none" }}
    >
      <AlertTitle>Loading....</AlertTitle>
    </Alert>
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <ReactImageFallback
              src={`${API}/user/photo/${username_for_photo}`}
              className="img img-fluid img-thumbnail mb-3"
              fallbackImage="/static/default.svg"
              style={{ maxHeight: "auto", maxWidth: "100%" }}
              alt="user profile"
            />
          </div>
          <div className="col-md-8  mt-5">
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
