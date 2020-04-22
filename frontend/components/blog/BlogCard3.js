import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import ReactImageFallback from "react-image-fallback";
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";

const BlogCard3 = ({ blog }) => {
  return (
    <div>
      <Card inverse className="mt-2">
      <Link href={`/blogs/${blog.slug}`}>
        <CardImg
          width="100%"
          height="130px"
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
        />
        </Link>
       
      </Card>
    </div>
  );
};

export default BlogCard3;
