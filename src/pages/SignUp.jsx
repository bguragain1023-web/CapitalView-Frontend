import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SignUPForm } from "../components/SignUPForm";
import { FinanceTips } from "../components/FinanceTips";

const SignUp = () => {
  return (
    <Container className="p-5 border border-danger m-5">
      <Row>
        <Col className="border border-danger">
          <FinanceTips />
        </Col>
        <Col>
          <SignUPForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
