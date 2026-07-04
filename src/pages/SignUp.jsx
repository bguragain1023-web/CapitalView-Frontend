import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SignUPForm } from "../components/SignUPForm";
import { FinanceTips } from "../components/FinanceTips";

const SignUp = () => {
  return (
    <div className="  ">
      <h1 className="header">Register your Account</h1>
      <Container className="p-5  signup-box   ">
        <Row className="d-flex align-items-center">
          <Col md={6}>
            <FinanceTips />
          </Col>
          <Col md={6}>
            <SignUPForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
