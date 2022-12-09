import { useContext } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../UserContext";
import Navbar from "../Navbar";

function Login() {
  const { getToken, token, setToken, refreshToken, setRefreshToken, error, setError} = useContext(UserContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      getToken(values);
    },
  });


  return (
    <>     
      <Navbar />
      <section className="h-100  py-5 my-5 ">
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
                      <div className="text-center">
                        <img
                          src="https://www.freshcotton.com/bundles/freshcotton/logo.svg?16674859312643"
                          style={{ width: "185px" }}
                          alt="logo"
                          className="py-4"
                        />
                        <h4 className="mt-1 mb-5 pb-1">Tools</h4>
                        {error && <div className="text-danger text-center">{ error }</div>}
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
