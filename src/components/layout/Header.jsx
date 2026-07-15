import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { TbLogin } from "react-icons/tb";
import { IoIosCreate } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdAttachMoney } from "react-icons/md";
import { useUser } from "../../contex/UserContex";

export const Header = () => {
  const { user, setUser } = useUser();

  const handleOnLogout = () => {
    localStorage.removeItem("accessJWT");
    setUser({});
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Capital view</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <RxDashboard /> Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/transaction">
                  <MdAttachMoney />
                  Transaction
                </Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleOnLogout}>
                  <IoLogOut />
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  <TbLogin /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <IoIosCreate /> Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
