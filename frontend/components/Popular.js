import React from "react";
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from "reactstrap";
import Link from "next/link";

const Popular = props => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-lg-3 col-md-6 pt-4">
          <Link href="/categories/asia">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/china.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>Asia</CardTitle>
                <CardText>China, Singapore, Japan, Korea ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/europe">
            <Card inverse>
              <CardImg
                height="150px"
                width="100%"
                src="/static/paris.jpg"
                alt="Card image cap"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>Europe</CardTitle>
                <CardText>British, France, Germany, Denmark ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/india">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/india.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>India</CardTitle>
                <CardText>New Delhi, Mumbai ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/africa">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/africa.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>Africa</CardTitle>
                <CardText>Cape Town, Kenya, Egypt ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>

        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/north-america">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/newyork.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>North America</CardTitle>
                <CardText>
                  Canada, Washington, New York, Los Angeles ...
                </CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/south-america">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/brazil.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>South America</CardTitle>
                <CardText>Brazil, Argentina ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/middle-east">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/dubai.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>Middle East</CardTitle>
                <CardText>Saudi Arab, Iran, Dubai ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6  pt-4">
          <Link href="/categories/oceania">
            <Card inverse>
              <CardImg
                height="150px"
                src="/static/Sydney.jpg"
                alt="Card image cap"
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle style={{ fontSize: "3vh" }}>Oceania</CardTitle>
                <CardText>Australia, New Zealand ...</CardText>
              </CardImgOverlay>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popular;
