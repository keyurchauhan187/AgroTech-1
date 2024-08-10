import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-light py-4 mt-5">
      <div className="container text-center">
        <h1 className="mb-3">All Rights Reserved &copy; Agrotech Solution</h1>
        <p className="mb-2">
          <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link>
        </p>
        <p className="mb-2">Team: Core Tech</p>
        <p className="mb-2">Email: <a href="mailto:contact@agrotechsolution.com">coretech@gamil.com</a></p>
        <p className="mt-3">
          Follow us on:
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ms-2">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ms-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="ms-2">
            <i className="fab fa-linkedin"></i>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
