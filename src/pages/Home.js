import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Navbar from "../Navbar";

function Home() {
  const { token, setToken, getToken } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <header className="bg-surface-primary border-bottom py-6">
        <div className="container-fluid">
          <div className="mb-npx">
            <div className="row align-items-center">
              <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                <h1 className="h2 ls-tight">
                  <span className="d-inline-block me-3">👋</span>Welcome!
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid vstack gap-6 p-3 ">
        <div className="row g-6">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card">
            <Link className="nav-link text-decoration-none text-dark" to="/pac">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                    E-commerce
                    </span>
                    <span className="h3 font-bold mb-0">Product availability check</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                      <i className="bi bi-credit-card"></i>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="text-nowrap text-xs text-muted">
                    Check which freshcotton products are hidden.
                  </span>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
