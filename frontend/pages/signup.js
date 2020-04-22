import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";
import Link from "next/link";

const Signup = () => {
  return (
    <Layout>
      <div className="container-fluid" id="sign-container">
        <div
          className="column"
          style={{ textAlign: "center", display: "inline-block" }}
        >
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
