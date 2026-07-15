import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  return (
    <div className="  ">
      <h1 className="header">Dashboard</h1>
      <Container className="p-5   ">
        <Row className="d-flex align-items-center">
          <Col md={6}>TO DO Dashboard</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
