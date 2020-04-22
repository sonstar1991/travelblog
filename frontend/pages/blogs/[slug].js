import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { singleBlog, listRelated, like, unlike } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import SmallBlogCard from "../../components/blog/SmallBlogCard";
import Search from "../../components/blog/Search";
import DisqusThread from "../../components/DisqusThread";
import ReactImageFallback from "react-image-fallback";
import { isAuth } from "../../actions/auth";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
    </Head>
  );

  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = blog =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallBlogCard blog={blog} />
        </article>
      </div>
    ));
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog.id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

//   const [values, setValues] =useState({
//       likes: 0,
//       isLiked: false
//   })
//   const {likes, isLiked}= values;





// useEffect(()=>{
//     setValues({...values})
// })



//   const likeToggle = () => {
//     let likes= likes +1
//     setValues({...values, likes, isLiked: false})
//   };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <ReactImageFallback
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    fallbackImage="/static/default.svg"
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1
                    className=" pb-3 pt-3 text-center font-weight-bold"
                    style={{ maxWidth: "100%", overflow: "hidden" }}
                  >
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a> {blog.postedBy.username} </a>
                    </Link>
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    {/* {JSON.stringify(blog)} */}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div id="blog-body" className="container">
              {/* <h3 onClick={likeToggle}> Like{likes}</h3> */}
              <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <div className="row">{showRelatedBlog()}</div>
            </div>

            <div className="container pt-5 pb-5">{showComments()}</div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query, likes: data.likes.length };
    }
  });
};

export default SingleBlog;
