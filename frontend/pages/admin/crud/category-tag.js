import Admin from "../../../components/auth/Admin";
import Layout from "../../../components/Layout";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="pl-2 pt-5 pb-5">Manage Category and Tags</h2>
            </div>
            <div className="col-md-6">
           <Category/>
            </div>
            <div className="col-md-6">
           <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
