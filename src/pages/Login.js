import { useContext } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import { UserContext } from "../UserContext";
import Navbar from "../Navbar";

function Login() {
  const { getToken, token, setToken } = useContext(UserContext);
  const { refreshToken, setRefreshToken } = useContext(UserContext);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const checkLogin = async (credentials) => {
    const login = {
      client_id: "administration",
      grant_type: "password",
      scopes: "write",
      username: credentials.email,
      password: credentials.password,
    };

    const fetchToken = await fetch(
      "https://www.freshcotton.com/api/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      }
    );
    const convertToken = await fetchToken.json();

    console.log(convertToken.access_token);
    setToken(convertToken.access_token);

    console.log(convertToken.refresh_token);
    console.log(convertToken);
    setRefreshToken(convertToken.refresh_token);
    // console.log("token: " + JSON.stringify(token))

    if (fetchToken.ok == false) {
      setError(() => (
        <p className="text-danger text-center">
          <b>Error</b> Incorrect user credentials.
        </p>
      ));
    } else {
      setError(() => <p className="text-center">Correct user credentials.</p>);
      // navigate("/")
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      getToken(values);
    },
  });

  async function refreshAuth() {
    const body = {
      grant_type: "refresh_token",
      client_id: "administration",
      refresh_token: { refreshToken },
    };

    const fetchNewToken = await fetch(
      "https://www.freshcotton.com/api/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
  }

  return (
    <>
      {refreshToken}
      <Navbar />
      <section className="h-100  py-5 my-5">
        { JSON.stringify(getToken())}
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div
                    className="col-lg-6 d-flex align-items-center gradient-custom-2"
                    style={{
                      backgroundImage: `url("https://www.freshcotton.com/media/04/fc/e9/1667904445/Tekengebied%202_(3).png")`,
                    }}
                  ></div>
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      {error}
                      <div className="text-center">
                        <img
                          src="https://www.freshcotton.com/bundles/freshcotton/logo.svg?16674859312643"
                          style={{ width: "185px" }}
                          alt="logo"
                          className="py-4"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Tools</h4>
                      </div>
                      <form onSubmit={formik.handleSubmit}>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input
                            id="email"
                            name="email"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="form-control"
                            placeholder="Phone number or email address"
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="form-control"
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password
                          </label>
                        </div>
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
