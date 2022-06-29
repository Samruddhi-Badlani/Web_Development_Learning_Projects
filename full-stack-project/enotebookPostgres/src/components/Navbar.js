import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();

  const handleClick = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('token2');
    history('/login');

  }

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" && "active"
                  }  `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" && "active"
                  }  `}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
              

                <Link to="/login" className="btn btn-primary mx-1">
                  {" "}
                  Login
                </Link>
                <Link to="signup" className="btn btn-primary mx-1">
                  {" "}
                  SignUp
                </Link>
              </form>
            ) : (
              <button onClick={handleClick} className="btn btn-primary">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
