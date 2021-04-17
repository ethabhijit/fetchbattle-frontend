import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  const { user, token } = isAutheticated();

  /* Set the width of the side navigation to 250px */
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  /* Set the width of the side navigation to 0 */
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <div>
      <nav class="navbar fixed-top">
        <div class="container-fluid">
          <Link to="/" className="none-underline">
            <a class="navbar-brand text-white">Fetch Battle</a>
          </Link>
          <div class="d-flex">
            {!isAutheticated() && (
              <Fragment>
                <Link to="/signup">
                  <button class="btn nav-btn text-white tags">Signup</button>
                </Link>
                <Link to="/signin">
                  <button class="btn nav-btn me-2 text-white">Signin</button>
                </Link>
              </Fragment>
            )}
            {isAutheticated() && (
              <span>
                <span
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  <button class="btn nav-btn mr-2 text-white">Signout</button>
                </span>
                <Link to="/user/dashboard">
                  <button class="btn nav-btn text-white">{user.name[0]}</button>
                </Link>
              </span>
            )}

            {/* Sidenav open btn  */}
            <i className="fas fa-bars ml-2 nav-menu-icon" onClick={openNav}></i>

            {/* Side navbar  */}
            <div id="mySidenav" class="sidenav">
              <a
                href="javascript:void(0)"
                className="closebtn"
                onClick={closeNav}
              >
                &times;
              </a>
              <Link to="/">Home</Link>
              {isAutheticated() && (
                  <Link to="/user/dashboard">Profile</Link>
              )}
              <Link to="tournament/create">Create a tournament</Link>
              {!isAutheticated() && (
                <Fragment>
                  <Link to="/signin">Signin</Link>
                  <Link to="/signup">Signup</Link>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
