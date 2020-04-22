import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";
const SmallBlogCard = ({ blog }) => {


    return (
        <div className="card mb-3" style={{height:'500px'}}>
         
            <section style={{height: '200px', width: '100%'}}>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <ReactImageFallback
                            className="img img-fluid"
                            style={{ height: '200px', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            fallbackImage="/static/default.svg"
                            alt={blog.title}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body"  style={{height:'200px', overflow: 'hidden'}}>
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h5 className="card-title">{blog.title}</h5>
                        </a>
                    </Link>
                    <div className="card-text">{renderHTML(blog.excerpt)}</div>
                </section>
            </div>

            <div className="card-body"  style={{height:'50px'}}>
                Posted {moment(blog.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${blog.postedBy.username}`}>
                    <a className="float-right">{blog.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallBlogCard;
