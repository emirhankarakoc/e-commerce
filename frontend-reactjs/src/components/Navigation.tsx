import { Button } from "@nextui-org/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const handleToken = () => {
      const token = localStorage.getItem("jwtToken");
      if (token != null) {
        setLoggedIn(true);
      }
    };
    handleToken();
  }, [isLoggedIn]);

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Navbar>
      <NavbarBrand>
        <button
          className="font-bold text-inherit"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          KARAKOC
        </button>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to="/smartphones" className="text-foreground">
            Smartphones
          </Link>
        </NavbarItem>
      </NavbarContent>
      {!isLoggedIn && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/register" color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {isLoggedIn && (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} to="/cart" color="secondary" variant="flat">
              <i className="fa-solid fa-cart-shopping fa-2xl"></i>
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} to="/profile" color="secondary" variant="flat">
              Profile
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button onPress={handleLogOut} color="danger" variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
