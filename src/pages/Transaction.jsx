import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TransactionForm } from "../components/TransactionForm";
import { TransactionTable } from "../components/TransactionTable";
import { useUser } from "../contex/UserContex";
import { useEffect } from "react";
import { CustomModal } from "../components/CustomModal";

const Transaction = () => {
  const { showTransaction } = useUser();

  useEffect(() => {
    showTransaction();
  }, []);

  return (
    <div className=" dashboard-theme  ">
      <h1 className="header text-white">View your Transcation here</h1>

      <Container className="p-5   ">
        <Row className="d-flex align-items-center">
          <Col>
            <CustomModal>
              <TransactionForm />
            </CustomModal>

            <hr />
            <TransactionTable />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Transaction;
