import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginForm } from "../components/LoginForm";
import { ExpensesSavings } from "../components/ExpensesSavings";
// import { useUser } from "../contex/UserContex";

const Login = () => {
  // const {user, setUser} = useUser();
  return (
    <div className="  ">
      <h1 className="header">Login</h1>
      <Container className="p-5  signup-box   ">
        <Row className="d-flex align-items-center">
          <Col md={6}>
            <LoginForm />
          </Col>
          <Col md={6}>
            <div className="d-flex  flex-column gap-3 finance-box-edit ">
              <ExpensesSavings />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
