import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div className="container-fluid">
        <a className="navbar-brand fs-6" href="/">
      <img src="https://www.freshcotton.com/bundles/freshcotton/logo.svg?16674859312643" alt="" width={150} height={50} className="d-inline-block align-text-top" />
    </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item fw-bold  text-dark">
                <Link className="nav-link text-decoration-none text-dark" to="/">
                    Home
                </Link>
              </li>
              <li className="nav-item fw-bold  text-dark">
                <Link className="nav-link text-decoration-none text-dark" to="/pac">
                    Product availability check
                </Link>
              </li>
              <li className="nav-item fw-bold">
                <Link className="nav-link ms-auto text-dark" to="/login">
                    Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
