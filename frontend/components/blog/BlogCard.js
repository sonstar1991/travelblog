import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";


const BlogCard = ({ blog }) => {

 

  const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    return (
        <div className="lead pb-4">
         
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <h2 className="pt-2 pb-2 font-weight-bold">{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <p className="mark ml-1 pt-2 pb-2">
                    {/* Written by 
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.username}</a>
                    </Link> */}
                    Published {moment(blog.updatedAt).fromNow()}
                </p>
            </section>
            <section>
                {showBlogCategories(blog)}
                {showBlogTags(blog)}
                <br />
                <br/>
            </section>

            <div className="row " >
                <div className="col-md-4">
                    <section>
                        <ReactImageFallback
                            className="img img-fluid"
                            style={{ height: '180px', width: '100%' }}
                            fallbackImage="/static/default.svg"
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        /> 
                       
                    </section>
                </div>
                <div className="col-md-8" >
                    <section >
                        <div className="" style={{maxHeight:'180px', overflow:'hidden'}}>{renderHTML(blog.excerpt)}</div>
                        <div className="mt-2">
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className="" style={{padding:'0'}}>Read more</a>
                        </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
