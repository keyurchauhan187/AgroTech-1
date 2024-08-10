import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - AgroTech App">
      <div className="container d-flex justify-content-center align-items-center ">
        <div className="form-container p-4" style={{
          width: "100vh",

          backgroundColor: "#eaf8e0",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          boxSizing: "border-box",
        }}>
          <form onSubmit={handleSubmit}>
            <h4 className="title text-center mb-4" style={{ color: "#4CAF50" }}>LOGIN FORM</h4>

            <div className="mb-3">
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
                style={{ borderColor: "#4CAF50", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
                style={{ borderColor: "#4CAF50", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" style={{
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
              borderRadius: "5px",
              color: "#fff",
              padding: "10px",
              fontSize: "16px",
            }}>
              LOGIN
            </button>
            <div className="text-center">
              <Link className="text-dark " to="/forgot-password" style={{ color: "#4CAF50", textDecoration: "none" }}>
                Forgot Password?
              </Link>
              <span className="mx-2" style={{ color: "#4CAF50" }}>|</span>
              <Link className="text-dark " to="/register" style={{ color: "#4CAF50", textDecoration: "none" }}>
                Register?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
