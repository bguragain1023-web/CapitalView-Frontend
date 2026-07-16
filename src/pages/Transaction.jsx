import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";

const Transaction = () => {
  return (
    <div className="  ">
      <h1 className="header">View your Transcation here</h1>
      <Container className="p-5   ">
        <Row className="d-flex align-items-center">
          <Col md={6}>
            <TransactionForm />
            <hr />
            <TransactionTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Transaction;
