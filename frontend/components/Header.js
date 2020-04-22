import React, { useState, useRef, useEffect, createRef } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import { signout, isAuth, getCookie } from "../actions/auth";
import Nprogress from "nprogress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateIcon from '@material-ui/icons/Create';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {
  faGlobe,
  faCompass,
  faShareSquare,
  faBurn
} from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import Router from "next/router";
import { Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { API} from "../config";
import { makeStyles } from '@material-ui/core/styles';
import { getProfile } from "../actions/user";

Router.onRouteChangeStart = url => Nprogress.start();
Router.onRouteChangeComplete = url => Nprogress.done();
Router.onRouteChangeError = url => Nprogress.done();




// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));



const Header = (props) => {

  // const classes = useStyles();

  // const [values, setValues] = useState({
  //   photo: ""
  // });
  // const { photo} = values;

  // const token = getCookie("token");
  // const username = isAuth() && isAuth().username;

  // const init = () => {
  //   getProfile(token).then(data => {
  //     if (data.error) {
  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({
  //         ...values,
  //         photo: data.username,
  //       });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   init();
  // }, []);




  const [isOpen, setIsOpen] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  const closeNav = () => setNavExpanded(!navExpanded);
  const toggle = () => setIsOpen(!isOpen);
  const wrapperRef = useRef(null);

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
      };
    }, [ref, handler]);
  };
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div ref={wrapperRef}>
      <React.Fragment>
        <Navbar color="light" light expand="lg" className="sticky-top" style={{borderBottom:'solid 1px grey '}}>
          <div className="container">
            <Link href="/">
              <NavLink className="font-weight-bold">Travel Blog</NavLink>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} setIsOpen={setIsOpen} navbar>
              <Nav className="ml-auto" navbar onSelect={closeNav}>
                <React.Fragment>
                  <NavItem className="p-2">
                    <Link href="/blogs">
                      <NavLink style={{ fontSize: "2.2vh", cursor: "pointer" }}>
                        {" "}
                        <FontAwesomeIcon icon={faCompass} /> Explore
                      </NavLink>
                    </Link>
                  </NavItem>
                </React.Fragment>

                <UncontrolledDropdown className="p-2" nav inNavbar>
                  <DropdownToggle nav caret style={{ fontSize: "2.2vh" }}>
                    <FontAwesomeIcon icon={faGlobe} /> Destinations
                  </DropdownToggle>
                  <DropdownMenu left="true" style={{ color: "inherit" }}>
                    <DropdownItem>
                      <Link href="/categories/asia">
                        <NavLink>Asia</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/europe">
                        <NavLink>Europe</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/india">
                        <NavLink>India</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/north-america">
                        <NavLink>North America</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/south-america">
                        <NavLink>South America</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/middle-east">
                        <NavLink>Middle East</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/oceania">
                        <NavLink>Oceania</NavLink>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link href="/categories/africa">
                        <NavLink>Africa</NavLink>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <UncontrolledDropdown className="p-2 mr-3" nav inNavbar>
                  <DropdownToggle nav caret style={{ fontSize: "2.2vh" }}>
                  <i className="fa fa-fw fa-user"></i> User
                  </DropdownToggle>
                  <DropdownMenu left="true" style={{ color: "inherit" }}>
                    {!isAuth() && (
                      <DropdownItem className="p-2">
                        <Link href="/signin">
                          <NavLink
                            style={{ fontSize: "2.2vh", cursor: "pointer" }}
                          >
                            Login
                          </NavLink>
                        </Link>
                      </DropdownItem>
                    )}

                    {isAuth() && isAuth().role !== 1 && (
                      <DropdownItem className="p-2">
                        <Link href="/user">
                          <NavLink
                            style={{ fontSize: "2.2vh", cursor: "pointer" }}
                          >
                            Dashboard
                          </NavLink>
                        </Link>
                      </DropdownItem>
                    )}

                    {isAuth() && isAuth().role === 1 && (
                      <DropdownItem className="p-2">
                        <Link href="/admin">
                          <NavLink
                            style={{ fontSize: "2.2vh", cursor: "pointer" }}
                          >
                       
                             Dashboard
                          </NavLink>
                        </Link>
                      </DropdownItem>
                    )}

                    {isAuth() && (
                      <DropdownItem className="p-2 ">
                        <NavLink
                          className="text-muted"
                          style={{ cursor: "pointer", fontSize: "2.2vh" }}
                          onClick={() =>
                            signout(() => Router.replace(`/signin`))
                          }
                        >
                           Logout
                        </NavLink>
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>

               

                {isAuth() && (
                  <NavItem className="">
                    <Button variant="contained" color="primary" size="small">
                      <Link href="/user/crud/blog">
                        <NavLink
                          active
                          className="text-white"
                          style={{ fontSize: "2.2vh", cursor: "pointer" }}
                     
                        >
                          Create
                        </NavLink>
                      </Link>
                    </Button>
                  </NavItem>
                )}

                {!isAuth() && (
                  <NavItem className="">
                    <Button variant="contained" color="primary" size="small">
                      <Link href="/signin">
                        <NavLink
                          active
                          className="text-white"
                          style={{ fontSize: "2.2vh", cursor: "pointer" }}
                        
                        >
                     Create
                        </NavLink>
                      </Link>
                    </Button>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    </div>
    // )
  );
};

export default Header;
