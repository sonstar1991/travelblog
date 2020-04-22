import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from "reactstrap";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';

const BlogCard4 = ({ blog }) => {
    const showBlogCategories = blog =>
      blog.categories.map((c, i) => (
        <Link key={i} href={`/categories/${c.slug}`}>
        <Chip key={i} color="primary" size="medium" icon={<LocalOfferIcon />} label={c.name}>
        {c.name}
      </Chip>
      </Link>
      ));


const bigCard ={
    height:'auto',
    width: '100%',
    boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25)'
}

  return (
    <Card className="big-card mt-3" style={bigCard}>
        <Link href={`/blogs/${blog.slug}`}>
      <ReactImageFallback
        className="img img-fluid"
        style={{ height: '30vh'}}
        fallbackImage="/static/default.svg"
        src={`${API}/blog/photo/${blog.slug}`}
        alt={blog.title}
      />
      </Link>
      <CardBody>
        <CardTitle>
          <Link href={`/blogs/${blog.slug}`}>
            <a style={{textDecoration:'none'}}>
              <h2 className="pt-2 pb-2 font-weight-bold" style={{color:'#474B4E'}}>{blog.title}</h2>
            </a>
          </Link>
          {showBlogCategories(blog)}
        </CardTitle>
        <CardSubtitle >
          <span  className="text-muted">
            Published {moment(blog.updatedAt).fromNow()} by
          </span>
        
          <span >
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a style={{textDecoration:'none', color:'#474B4E'}}> {blog.postedBy.username}</a>
            </Link>
          </span>
        </CardSubtitle>
        <CardText>{renderHTML(blog.excerpt)}</CardText>
        <Link href={`/blogs/${blog.slug}`}>
          <a className="float-right " style={{padding:'0', borderBottom:'2px solid' , color:'black', textDecoration:'none' }}>
            Read More...
          </a>
        </Link>
      </CardBody>
    
    </Card>
    
  );
};

export default BlogCard4;
