import Private from "../../components/auth/Private";
import Layout from "../../components/Layout";
import Link from "next/link";
import ReadBlogs from "../../components/crud/ReadBlogs";
import { isAuth, getCookie } from "../../actions/auth";
import { API } from "../../config";
import { useState, useEffect } from "react";
import { getProfile } from "../../actions/user";
import ReactImageFallback from "react-image-fallback";
import { Button } from "@material-ui/core";

const UserIndex = () => {
  const [values, setValues] = useState({
    photo: "",
    about: "",
    error: false
  });
  const { photo, about } = values;

  const token = getCookie("token");
  const username = isAuth() && isAuth().username;

  const init = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          photo: data.username,
          about: data.about
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <Private>
          <div className="container-fluid" id="dashboard-hero">
            <div className="container pt-5" style={{}}>
              {/* <h1 className="display-4 pt-5 font-weight-bold text-center">
                {`${username}`}'s Dashboard
              </h1> */}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="container-fluid" style={{ textAlign: "center" }}>
                <ReactImageFallback
                  src={`${API}/user/photo/${photo}`}
                  className="img img-fluid rounded-circle mb-3"
                  fallbackImage="/static/default.svg"
                  style={{
                    height: "30vh",
                    width: "250px",
                    marginTop: "-17vh"
                  }}
                  alt="user profile"
                />
                <div
                  className="container mb-3 mt-3 pb-3 pt-3"
                  style={{ textAlign: "center" }}
                >
                  <h2 className="text-bold" style={{ fontSize: "3rem" }}>
                    {`${username}`}{" "}
                  </h2>
                  <br />
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {" "}
                    {about}
                  </p>
                </div>
                <hr />
                <Button
                  variant="contained"
                  color="primary"
                  className="ml-2 mr-2 mt-2 mb-2"
                >
                  <a href="/user/crud/blog" style={{ color: "white" }}>
                    Create Blog
                  </a>
                </Button>

                {/* 
                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                    <a>My Blogs</a>
                  </Link>
                </li> */}

                <Button
                  variant="contained"
                  color="primary"
                  className="ml-2 mr-2 mt-2 mb-2"
                >
                  <a href="/user/update" style={{ color: "white" }}>
                    {" "}
                    Update Profile
                  </a>
                </Button>

                <hr />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="container mt-4" style={{ textAlign: "center" }}>
                {" "}
                <h2>Your Blogs</h2>
              </div>

              {/* <div className="col-md-3"> */}
              <ReadBlogs username={username} />
            </div>
            {/* </div> */}
          </div>
        </Private>
      </Layout>
    </React.Fragment>
  );
};

export default UserIndex;
