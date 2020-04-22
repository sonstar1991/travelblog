import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { withRouter } from "next/router";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";

import Search from "../../components/blog/Search";

import BlogCard2 from "../../components/blog/BlogCard2";
import BlogCard3 from "../../components/blog/BlogCard3";
import BlogCard4 from "../../components/blog/BlogCard4";
import Button from "@material-ui/core/Button";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogSkip,
  blogsLimit,
  router
}) => {
  const head = () => (
    <Head>
      <title>Travel Blogs | {APP_NAME}</title>
      <meta name="description" content="Travelling Blogs World Wide" />

      <Link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Best travel blogging site for suggestions | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Best Travel Blogs online and flight booking systems"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);
  const [loadedBlogs2, setLoadedBlogs2] = useState([]);

  const showAllBlogsCards = () => {
    return blogs.map((blog, i) => (
      <div className="col-lg-4 col-md-6 col-sm-12" key={i}>
        <article>
          <BlogCard2 blog={blog} />
        </article>
      </div>
    ));
  };

  const showSmallBlogsCards = () => {
    return blogs.map((blog, i) => (
      <div className=" " key={i}>
        <BlogCard3 blog={blog} />
      </div>
    ));
  };
  // const showAnotherDifferentBlogsCards = () => {
  //   return blogs.map((blog, i) => (
  //     <div className="col-md-4 " key={i}>
  //       <article>
  //         <BlogCard4 blog={blog} />
  //       </article>
  //     </div>
  //   ));
  // };

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button
          variant="outlined"
          // color="black"
          onClick={loadMore}
          style={{ width: "100%" }}
        >
          View More
        </Button>
      )
    );
  };
  const loadMore2 = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs2([...loadedBlogs2, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton2 = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button
          variant="outlined"
          // color="black"
          onClick={loadMore2}
          style={{ width: "100%" }}
        >
          View More
        </Button>
      )
    );
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <ul style={{ listStyle: "none" }} key={i}>
        <Link href={`/categories/${c.slug}`}>
          <li id="list-group-blogs">
            <a id="list-a">{c.name}</a>
          </li>
        </Link>
      </ul>
    ));
  };
  const showAllTags = () => {
    return tags.map((t, i) => (
      <ul style={{ listStyle: "none" }} key={i}>
        <Link href={`/tags/${t.slug}`}>
          <li id="list-group-blogs">
            <a id="list-a">{t.name}</a>
          </li>
        </Link>
      </ul>
    ));
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <article key={i}>
        <BlogCard4 blog={blog} />
      </article>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <BlogCard4 blog={blog} />
      </article>
    ));
  };
  const showLoadedBlogs2 = () => {
    return loadedBlogs2.map((blog, i) => (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <article key={i}>
          <BlogCard2 blog={blog} />
        </article>
      </div>
    ));
  };

  return (
    <React.Fragment>
      {head()}

      <Layout>
        <main>
          <div className="container-fluid" id="blog-hero">
            <div className="container pt-5" style={{}}>
              <h1 className="display-4 pt-5 font-weight-bold text-center">
                Travel Blog
              </h1>
            </div>
          </div>
          <div className="container mt-4" style={{ position: "relative" }}>
            <div className="row">
              <div className="col-md-8 ">
                <h2 className="pt-4">Recent Posts</h2>
                {showAllBlogs()}
                <div className="container-fluid">{showLoadedBlogs()}</div>
                <div className="text-center pt-5 ">{loadMoreButton()}</div>
              </div>

              <div className="col-md-4 pt-3" id="blogs-right">
                <div className="container-fluid">
                  <h3 className="mb-4 text-bold text-center">Search</h3>
                  <Search />
                </div>
                <br />
                <br />
                <div className="container">
                  <h3 className="mb-4 text-bold text-center">Categories</h3>
                  {showAllCategories()}
                </div>
                <br />
                <br />
                <div className="container">
                  <h3 className="mb-4 text-bold text-center">Gallery</h3>
                  {showSmallBlogsCards()}
                </div>

                {/* <div className="container">
                  <h3 className="mb-4 text-bold text-center">Gallery</h3>
                  </div> */}
              </div>
            </div>
            <div className="container-fluid mt-2">
              <div className="row">
                {showAllBlogsCards()}
                {showLoadedBlogs2()}
              </div>
              <div className="text-center pt-5 pb-5">{loadMoreButton2()}</div>
          
            </div>
            
          </div>
          
        </main>
        
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 3;

  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip
      };
    }
  });
};

export default withRouter(Blogs); //getInitialProps
