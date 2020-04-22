import React from "react";

import Link from "next/link";

const Footer = props => {
  return (
    <div className="container-fluid text-center footer  pt-5 pb-3 sticky-bottom">
      <div className="footer-menu">
        <ul>
          <li>
            <h4 className="ml-2 mr-2 ">Contact</h4>
          </li>
          <li>
            <h4 className="ml-2 mr-2 ">Terms</h4>
          </li>
          <li>
            <h4 className="ml-2 mr-2 ">Privacy</h4>
          </li>
          <li>
            <h4 className="ml-2 mr-2 ">About</h4>
          </li>
        </ul>
      </div>
<hr/>
      <div className="footer-social-icons">
        <p className=" ml-2 mr-2">
          <small className="">Follow Us</small>
        </p>

        <ul className="mt-3">
          <li>
            <a href="#" className=" ml-2 mr-2">
              <i className="fa fa-facebook-square mr-1 fa-3x"></i>
            </a>
          </li>
          <li>
            <a href="#" className=" ml-2 mr-2">
              <i className="fa fa-twitter-square mr-1 fa-3x"></i>
            </a>
          </li>
          <li>
            <a href="#" className=" ml-2 mr-2">
              <i className="fa fa-linkedin-square fa-3x"></i>
            </a>
          </li>
          <li>
            <a href="#" className=" ml-2 mr-2">
              <i className="fa fa-google-plus-square fa-3x"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="row mt-3">
        <div className="col  ">
          <p className="">
            <small className="">
              © 2020. Travel Blog All Rights Reserved.
            </small>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        h4{
          font-size:2vh;
        }
        .footer {
          width: 100%
          height: auto;
          background: white;
          color: black;
          // padding: 20px 0px;
          align-items: center;
          justify-content: center;
       
        }
        .footer-social-icons{
          width:100%;
          height:auto;
          margin: auto;
        }
        .footer-social-icons ul{
          margin:0 px;
          padding: 0px;
          text-align: center;
        }
        .footer-social-icons ul li{
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 0px 10px;
          border-radius: 100%;
        } 
        .footer-menu{
          width:100%;
          height:auto;
          margin: auto;
        }
        .footer-menu ul{
          margin:0 px;
          padding: 0px;
          text-align: center;
        }
        .footer-menu ul li{
          display: inline-block;
          margin: 0px 10px;
          border-radius: 100%;
        }
      `}</style>
    </div>
  );
};

export default Footer;
