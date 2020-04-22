import Layout from "../components/Layout";
import Slider from "../components/Slider";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import Head from "next/head";
import RecentCard from "../components/Recent";
import BigCard from "../components/BigCard";
import Popular from "../components/Popular";
import Link from "next/link";

const Index = ({
  blogs,

  totalBlogs,
  blogSkip,
  blogsLimit
}) => {
  const head = () => (
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>TravelBlog</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="stylesheet" type="text/css" href="/static/jquery/reset.css" />
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/css/bootstrap-datepicker3.standalone.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/jquery/style.css?v_1207"
      />

      <script src="/static/jquery/jquery.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-dateFormat/1.0/jquery.dateFormat.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.0/js/bootstrap-datepicker.min.js"></script>
      <script src="/static/jquery/jquery.twidget.js?v_1207"></script>

      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,300italic,600,600italic,700,700italic,800,800italic"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans&subset=latin,cyrillic"
        rel="stylesheet"
        type="text/css"
      />
    </Head>
  );

  // const [limit, setLimit] = useState(blogsLimit);
  // const [skip, setSkip] = useState(0);
  // const [size, setSize] = useState(totalBlogs);
  // const [loadedBlogs, setLoadedBlogs] = useState([]);

  // const loadMore = () => {
  //   let toSkip = skip + limit;
  //   listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setLoadedBlogs([...loadedBlogs, ...data.blogs]);
  //       setSize(data.size);
  //       setSkip(toSkip);
  //     }
  //   });
  // };

  // const loadMoreButton = () => {
  //   return (
  //     size > 0 &&
  //     size >= limit && (
  //       <a onClick={loadMore} style={{ float: "right", fontSize: "2.5vh" }}>
  //         View more...
  //       </a>
  //     )
  //   );
  // };
  // const showLoadedBlogs = () => {
  //   return loadedBlogs.map((blog, i) => (
  //     <div className="col-lg-3  col-md-6 " key={i}>
  //       <RecentCard blog={blog} />
  //     </div>
  //   ));
  // };

  const showAllBlogs2 = () => {
    let blog = blogs[0];
    return (
      <div className="col-md-12">
        <article>
          <BigCard blog={blog} />
        </article>
      </div>
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => (
      <div className="col-lg-3  col-md-6" key={i}>
        <RecentCard blog={blog} />
      </div>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <Slider />
        <div className="container">
          <h2 className="pl-3 pt-5 pb-3 " style={{ fontSize: "3.5vh" }}>
            Shared By Travellers
          </h2>
          <div className="container-fluid">
            {/* <div className="row">{showAllBlogs2()}</div> */}
            <div className="row mt-4">
              {showAllBlogs()}
              {/* {showLoadedBlogs()} */}
            </div>
            <div className="text-center pt-5 mb-3">
              <Link href="/blogs">
                <a
                  href={"/blogs"}
                  style={{ float: "right", fontSize: "2.5vh", color:'black' }}
                >
                  View more...
                </a>
              </Link>
            </div>
          </div>

          <div className="container-fluid mb-5">
            <h2 className="pl-3 pt-5  " style={{ fontSize: "3.5vh" }}>
              Popular Destinations
            </h2>

            <Popular />
          </div>

          <div className="gcse-search"></div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

Index.getInitialProps = () => {
  let skip = 0;
  let limit = 8;
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log(data);
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

export default Index;
