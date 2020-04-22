import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';


const BlogCard2 = ({ blog }) => {
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
      
        <Chip color="primary" size="small" icon={<LocalOfferIcon />} label={c.name} className="ml-2 mt-2 mr-2">
          {c.name}
        </Chip>
      </Link>
    ));

  return (
    <div className="card mt-5">
      
      <div className="card-body d-flex flex-row">
        <ReactImageFallback
          className="img img-fluid rounded-circle mr-4"
          style={{ height: "50px" , width:'50px'}}
          fallbackImage="/static/default.svg"
          src={`${API}/user/photo/${blog.postedBy.username}`}
          alt={blog.title}
        />
        <div className="">
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a style={{textDecoration:'none',color:'#474B4E'}}>{blog.postedBy.username}</a>
          </Link>
          <i className="fas fa-clock"></i>
          <p className="card-text">
            Published {moment(blog.updatedAt).fromNow()}
          </p>
        </div>
      </div>

      <div className="view overlay">
        <Link href={`/blogs/${blog.slug}`}>
          <ReactImageFallback
            className="img img-fluid card-img-top rounded-0"
            style={{ height: "180px", width: "100%" }}
            fallbackImage="/static/default.svg"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />
        </Link>
        {showBlogCategories(blog)}
      </div>

      <div className="card-body">
        <div className="" style={{ height: "100px", overflow: "hidden" }}>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h3 className="blog-title" style={{color:'#474B4E', textDecoration:'none'}}>{blog.title}</h3>
            </a>
          </Link>
       <p style={{fontSize:'1rem !important'}}>{renderHTML(blog.excerpt)}</p> 
        </div>
        <div className="mt-2 mb-2">
          <Link href={`/blogs/${blog.slug}`}>
            <a className="" style={{ paddingBottom: "3rem", paddingTop:'2rem', textDecoration:'none', color:'#474B4E'}}>
              Read More...
            </a>
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .card {
          height: 500px;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
        }
        .blog-title {
          color: #2D73C0;
          font-weight: bold;
          text-decoration: none;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default BlogCard2;
