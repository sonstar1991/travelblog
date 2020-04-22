import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Link from "next/link";
import BlogCreate from "../../../components/crud/BlogCreate";

const BlogC = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="pl-2 pt-5 pb-5">Create a new blog</h2>
            </div>
            <div className="col-md-12">
              <BlogCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default BlogC;
