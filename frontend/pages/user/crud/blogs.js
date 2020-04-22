import Private from "../../../components/auth/Private";
import Layout from "../../../components/Layout";
import Link from "next/link";
import ReadBlogs from "../../../components/crud/ReadBlogs";
import {isAuth} from '../../../actions/auth'

const BlogsM = () => {
    const username = isAuth() && isAuth().username
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="pl-2 pt-5 pb-5">Manage Blogs</h2>
            </div>
            <div className="col-md-12">
              <ReadBlogs username={username}/>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default BlogsM;
