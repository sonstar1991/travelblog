import Private from "../../../components/auth/Private";
import Layout from "../../../components/Layout";
import Link from "next/link";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const BlogU = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="pl-2 pt-5 pb-5">Update a new blog</h2>
            </div>
            <div className="col-md-12">
              <BlogUpdate />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default BlogU;
