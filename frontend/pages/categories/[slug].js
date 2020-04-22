import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";
import BlogCard from "../../components/blog/BlogCard";

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best travel blogging site ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best travel blogging site ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
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
                    {category.name}
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

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;
