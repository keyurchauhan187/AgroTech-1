import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge, Input, Button } from "antd";  // Import Ant Design components
import Search from "antd/es/input/Search";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const onSearch = (value) => {
    console.log(value); // Handle search functionality here
  };

  return (
    <header className="container-fluid fixed-top bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src="/images/agriculture-logo.jpg" alt="Logo" height="70" className="me-2" />
            <span><span style={{ color: "green" }}>Agrotech Solution</span></span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="d-flex mx-auto align-items-center" style={{ flexGrow: 1, maxWidth: "500px" }}>
              <div style={{ width: "100%", maxWidth: "500px" }}>
                <Search
                  placeholder="Search products..."
                  enterButton={
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        borderColor: "black",
                        transition: "background-color 0.3s, color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "black";
                        e.target.style.color = "white";
                      }}
                    >
                      Search
                    </Button>
                  }
                  size="large"
                  onSearch={onSearch}
                  style={{
                    width: "100%",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "black";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = ""; // Reset border color
                  }}
                />
              </div>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <ul className="navbar-nav ms-3">
                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    <Badge count={cart?.length} showZero offset={[10, -5]}>
                      Cart
                    </Badge>
                  </NavLink>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </nav>
      <div className="container-fluid justify-content-center p-2">
        <div className="d-flex flex-wrap justify-content-center">
          {categories?.map((c) => (
            <NavLink
              key={c.slug}
              to={`/category/${c.slug}`}
              className="nav-link mx-3 text-dark"
              style={{ fontSize: "20px", padding: "8px 0" }}
            >
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
