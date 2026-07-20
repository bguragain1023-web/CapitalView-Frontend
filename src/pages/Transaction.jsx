import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { useUser } from "../contex/UserContex";
import { useEffect } from "react";

const Transaction = () => {
  const { showTransaction } = useUser();

  useEffect(() => {
    showTransaction();
  }, []);

  return (
    <div className="  ">
      <h1 className="header">View your Transcation here</h1>
      <Container className="p-5   ">
        <Row className="d-flex align-items-center">
          <Col>
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
