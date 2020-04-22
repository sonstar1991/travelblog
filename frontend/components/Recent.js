import Link from "next/link";
import moment from "moment";
import { API } from "../config";
import ReactImageFallback from "react-image-fallback";


const RecentCard = ({ blog }) => {
  return (
    <div className="card mb-3" style={{ height: "315px", width: "100%" }}>
      <section style={{ height: "200px", width: "100%" }}>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <ReactImageFallback
              className="img img-fluid"
              style={{ height: "200px", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              fallbackImage="/static/default.svg"
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div
        className="card-body"
        style={{ height: "100px", overflow: "hidden" }}
      >
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title" style={{fontSize:'2.2vh'}}>{blog.title}</h5>
            </a>
          </Link>
          <div className="card-text text-muted">
          <h5  style={{fontSize:'1vh'}}> Posted {moment(blog.updatedAt).fromNow()} </h5>
          <br/>
          <h5  style={{fontSize:'1.3vh'}}>
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a className="float-right " style={{textDecoration:'none', color:'#474B4E'}}>{blog.postedBy.username}</a>
            </Link>
            </h5>
         
          </div>
        </section>
      </div>
      <style jsx>{`
        .card {
          height: 500px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
        .card-title {
          color: #474B4E;
          font-weight: bold;
          text-decoration: none;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default RecentCard;
