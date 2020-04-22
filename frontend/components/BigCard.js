import Link from "next/link";
import moment from "moment";
import { API } from "../config";
import ReactImageFallback from "react-image-fallback";
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";

const BigCard = ({ blog }) => {
  return (
    <div>
      <Card inverse className="mt-2">
        <Link href={`/blogs/${blog.slug}`}>
          <CardImg
            width="100%"
            height="450px"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
            id="main-image"
          />
        </Link>
        <CardImgOverlay>
        <CardTitle className="text-bold" style={{color:'black'}}>{blog.title}</CardTitle>
          <CardText>
            <small className="text-muted">Published {moment(blog.updatedAt).fromNow()}</small>
          </CardText>
          </CardImgOverlay>
      </Card>
    </div>
  );
};

export default BigCard;
