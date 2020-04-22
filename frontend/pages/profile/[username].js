import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { userPublicProfile, getProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME } from "../../config";
import BlogCard from "../../components/blog/BlogCard";
import moment from "moment";
import FollowProfileButton from "../../components/auth/FollowProfile";
import { isAuth, getCookie } from "../../actions/auth";
import { useState, useEffect } from "react";
import {withRouter}from 'next/router'

const UserProfile = ({ user, blogs, query, router }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
    </Head>
  );

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };
  
//   const [getuser, setGetUser] = useState({});

//   const [following, setFollowing] = useState(false);
 
//   const [followingList, setFollowingList] = useState([]);
//   const [followersList, setFollowersList] = useState([]);

//   const checkFollow = user => {
//     const jwt = isAuth();
//     const match = user.followers.find(follower => {
//         // one id has many other ids (followers) and vice versa
//         return follower._id === jwt.user._id;
//     });
//     return match;
// };


//   const token = getCookie("token");
//   const username = isAuth() && isAuth().username;

//   const init = () => {
//     getProfile(token).then(data => {
//         if (data.error) {
//          console.log(data.error)
//         } else {
//             console.log("DATA: ", data);
//             let following = checkFollow(data);
//             setGetUser(data);
//             setFollowing(following);
//             setFollowingList(data.following);
//             setFollowersList(data.followers);
//         }
//     });
// };

// const clickFollowButton = callApi => {
//   const userId = isAuth().user._id;
//   const token = isAuth().token;

//   callApi(userId, token, user._id).then(data => {
//       if (data.error) {
//           console.log(data.error);
//       } else {
//           let following = checkFollow(data);
//           setGetUser(data);
//           setFollowing(following);
//           setFollowingList(data.following);
//           setFollowersList(data.followers);
//       }
//   });
// };

// useEffect(() => {
//   init();
// }, [user._id]);

 
 

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mt-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h2 className="text-bold">{user.name}</h2>
                      <p className="text-muted">
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                      <br />

                      <p className="text-muted">{user.about}</p>
                    {/* {isAuth() && <FollowProfileButton following={following} onButtonClick={clickFollowButton} />}   */}
                    <br/>
                    {/* {JSON.stringify(user)} */}
                    <br/>
                    
                    </div>
                    <div className="col-md-4">
                      <img
                        src={`${API}/user/photo/${user.username}`}
                        className="img img-fluid img-thumbnail mb-3 mt-3"
                        style={{ height: "300px", width: "100%" }}
                        alt="user profile"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                    Recent blogs by {user.name}
                  </h5>

                  {showUserBlogs()}
                </div>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white">
                    Message {user.name}
                  </h5>
                  <br />
                  <p>contact form</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      //   console.log(data);

      return {
        user: data.user,
        blogs: data.blogs,
        query
      };
    }
  });
};

export default withRouter(UserProfile);
