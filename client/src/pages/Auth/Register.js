import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://agrotech-y7d0.onrender.com/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - AgroTech Solution">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="form-container p-4" style={{
          maxWidth: "80vw",
          width: "100%",
          backgroundColor: "#eaf8e0", // Light green background
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          boxSizing: "border-box",
        }}>
          <form onSubmit={handleSubmit}>
            <h4 className="title text-center mb-4" style={{ color: "#3a7731" }}>REGISTER FORM</h4>

            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Enter Your Name"
                required
                autoFocus
                style={{ borderColor: "#3a7731", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                required
                style={{ borderColor: "#3a7731", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                placeholder="Enter Your Password"
                required
                style={{ borderColor: "#3a7731", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                placeholder="Enter Your Phone"
                required
                style={{ borderColor: "#3a7731", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Your Address"
                required
                style={{ borderColor: "#3a7731", borderRadius: "5px", width: "100%", fontSize: "16px", padding: "10px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3" style={{
              backgroundColor: "#4CAF50", // Dark green
              borderColor: "#3a7731",
              borderRadius: "5px",
              color: "#fff",
              padding: "10px",
              fontSize: "16px",
            }}>
              REGISTER
            </button>
            <span className="mx-2" >Already have an account?&nbsp;</span>
            <Link className="text-dark " to="/login">
              <span style={{ color: "#4CAF50", textDecoration: "none" }}>Login</span>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
