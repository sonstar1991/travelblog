import Link from "next/link";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import ReactImageFallback from "react-image-fallback";
import { API } from "../../config";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Alert, AlertTitle } from "@material-ui/lab";


//close ssr
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// Quill.register('modules/imageDrop', ImageDrop)

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const token = getCookie("token");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCat, setCheckedCat] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [body, setBody] = useState(blogFromLS());

  const [values, setValues] = useState({
    error: "",

    success: "",
    formData: "",
    title: ""
  });

  const {
    error,

    success,
    formData,
    title
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() }),
      initCategories(),
      initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    e.preventDefault();

    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog ${data.title} is created`
        });

        setBody("");
      }
    });
  };

  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = e => {
    // console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggleCat = c => () => {
    setValues({ ...values, error: "" });

    const clickedCategory = checkedCat.indexOf(c);
    const all = [...checkedCat];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setCheckedCat(all);
    formData.set("categories", all);
  };

  const handleToggleTag = t => () => {
    setValues({ ...values, error: "" });

    const clickedTags = checkedTag.indexOf(t);
    const all = [...checkedTag];
    if (clickedTags === -1) {
      all.push(t);
    } else {
      all.splice(clickedTags, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleCat(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

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

  const createBlogForm = () => (
    <form onSubmit={publishBlog}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("title")}
          value={title}
          placeholder="Type your blog title"
        ></input>
      </div>
      <div className="form-group">
        <ReactQuill
          modules={QuillModules}
          formats={QuillFormats}
          value={body}
          placeholder="Write your experience..."
          onChange={handleBody}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          type="submit"
        >
          Publish
        </Button>
      </div>
    </form>
  );

  const mouseMoveHandler = e => {
    setValues({ ...values, success: false, remove: false });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="pb-3">
            <div onMouseMove={mouseMoveHandler}>
              {showError()}
              {showSuccess()}
            </div>
          </div>

          {createBlogForm()}
        </div>
        <div className="col-md-6">
          <div>
            <div className="form-group mb-3">
              <h2>Featured Image</h2>
              <hr />

              <small className="text-muted mr-2">Max Size: 30MB</small>
              <Button
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
              >
                <label className="">
                  Upload Featured Image
                  <input
                    onChange={handleChange("photo")}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </label>
              </Button>
            </div>
          </div>
          <div className="mb-3">
            <h2>Categories</h2>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h2>Tags</h2>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
