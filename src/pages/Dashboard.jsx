import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomPieChart from "../components/CustomPieChart";
import { useEffect } from "react";
import { useUser } from "../contex/UserContex";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import CustomLineGraph from "../components/CustomLineGraph";
import CustomBarDiagram from "../components/CustomBarDiagram";

const Dashboard = () => {
  const { showTransaction, allTransaction } = useUser();
  const incomeTotal = allTransaction.reduce((acc, item) => {
    return item.type === "income" ? item.amount + acc : acc;
  }, 0);
  const expensesTotal = allTransaction.reduce((acc, item) => {
    return item.type === "expenses" ? item.amount + acc : acc;
  }, 0);

  useEffect(() => {
    showTransaction();
  }, []);
  return (
    <div className=" dashboard-theme ">
      <h1 className="header text-white">Dashboard</h1>

      <Container fluid className="p-2   ">
        <div className="balance d-flex gap-3">
          <div className="totalBalance">
            <div className="oswald-balance">
              <FcMoneyTransfer /> Balance
            </div>
            <hr />
            <div
              className={
                incomeTotal >= expensesTotal
                  ? "space-grotesk-amount text-success "
                  : "space-grotesk-amount text-danger "
              }
            >
              {incomeTotal - expensesTotal}
            </div>
          </div>
          <div className="incomeTotal">
            <div className="oswald-balance title-text">
              <GiReceiveMoney /> Income
            </div>
            <hr />
            <div className="space-grotesk-amount amount-font">
              {incomeTotal}
            </div>
          </div>

          <div className="expensesTotal">
            <div className="oswald-balance">
              {" "}
              <GiTakeMyMoney /> Expenses
            </div>
            <hr />
            <div className="space-grotesk-amount">{expensesTotal}</div>
          </div>
        </div>
        <Row className="d-flex align-items-center p-1">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center p-3"
          >
            <CustomPieChart />
          </Col>
          <Col md={6}>
            <div className="mt-2 d-flex justify-content-center align-items-center">
              <CustomLineGraph />
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <div>
            <CustomBarDiagram />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
