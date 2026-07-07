import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { TbLogin } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Capital view</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">
              <TbLogin /> Login
            </Link>
            <Link className="nav-link" to="/">
              <IoIosCreate /> Signup
            </Link>
            <Link className="nav-link" to="/">
              <IoLogOut />
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
