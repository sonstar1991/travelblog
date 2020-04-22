import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import BlogCard from "../../components/blog/BlogCard";

const Tag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best travelling blog on ${tag.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best travelling blog on ${tag.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />


    </Head>
  );

  return (
    <React.Fragment>
      {head()}

      <Layout>
        <main>
          <div className="container-fluid ">
            <div className="col-md-12 ">
              <div className="container-fluid" id="blog-hero">
                <div className="container pt-5 " style={{}}>
                  <h1 className="display-4 font-weight-bold  text-center pt-5">
                    {tag.name}
                  </h1>
                </div>
              </div>
              {blogs.map((b, i) => (
                <section className="mt-3">
                  <BlogCard key={i} blog={b} />
                  <hr />
                </section>
              ))}
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default Tag;
