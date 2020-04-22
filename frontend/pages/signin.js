import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    }
  };
  return (
    <Layout>
      <div className="container-fluid" id="sign-container">
        <div className="column" style={{textAlign:'center', display:'inline-block'}} >
        
          {showRedirectMessage()}
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
