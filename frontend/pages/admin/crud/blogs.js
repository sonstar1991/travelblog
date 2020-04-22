import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Link from "next/link";
import ReadBlogs from "../../../components/crud/ReadBlogs";

const BlogsM = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="pl-2 pt-5 pb-5">Manage Blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlogs />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default BlogsM;
