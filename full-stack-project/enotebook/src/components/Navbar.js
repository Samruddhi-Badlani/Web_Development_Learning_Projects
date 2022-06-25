import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
const Navbar = () => {
  const context = useContext(NoteContext);
  const { notes } = context;
  const [q, setQ] = useState("");
  const [searchParam, setSearchParam] = useState(["title", "description"]);
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Enotebook
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={q}
                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <Link to="/login" className="btn btn-primary mx-1">
              {" "}
              Login
            </Link>
            <Link to="signup" className="btn btn-primary mx-1">
              {" "}
              SignUp
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
