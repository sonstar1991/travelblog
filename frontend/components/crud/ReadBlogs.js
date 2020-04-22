import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";
import { Button } from '@material-ui/core';
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap";
import ReactImageFallback from "react-image-fallback";
import { API } from "../../config";
import DeleteIcon from '@material-ui/icons/Delete';

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm("Are you sure you want to delete your blog");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Button variant="contained"  >
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="">Edit</a>
        </Link>
        </Button>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Button variant="contained" >
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="">Edit</a>
        </Link>
        </Button>
      );
    }
  };
  const bigCard ={
    height:'auto',
    width: '100%'
}


  const showAllBlogs = () => {
    return blogs.slice(0).reverse().map((blog, i) => {
      return (
        
        <div  key={i} className="mt-5 pb-5 col-md-4">
        <Card className="big-card mt-3" style={bigCard} key={i}>
      <ReactImageFallback
        className="img img-fluid"
        style={{ height: '25vh'}}
        fallbackImage="/static/default.svg"
        src={`${API}/blog/photo/${blog.slug}`}
        alt={blog.title}
      />
      <CardBody>
        <CardTitle>
          <Link href={`/blogs/${blog.slug}`}>
            <a style={{textDecoration:'none'}}>
              <h2 className="pt-2 pb-2 font-weight-bold">{blog.title}</h2>
            </a>
          </Link>
         
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">
            Published {moment(blog.updatedAt).fromNow()}
          </span>
        <hr/>
          <Button
                variant="contained"
           color="secondary"
            className="mr-3"
            onClick={() => deleteConfirm(blog.slug)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          {showUpdateButton(blog)}
        </CardSubtitle>
       
      </CardBody>
    
    </Card>
          {/* <Link href={`/user/crud/${blog.slug}`}>
            <a className="">{blog.title}</a>
          </Link>
          <p className="mark">
            Written by {blog.postedBy.name} | Published on{" "}
            {moment(blog.updatedAt).fromNow()}
          </p> */}
       
        </div>
  
      );
    });
  };

  return (
    <React.Fragment>
    
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
   
    </React.Fragment>
  );
};

export default ReadBlogs;
