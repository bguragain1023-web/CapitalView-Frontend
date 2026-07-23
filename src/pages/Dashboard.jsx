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

const Dashboard = () => {
  const { showTransaction, allTransaction } = useUser();

  useEffect(() => {
    showTransaction();
  }, []);
  return (
    <div className=" dashboard-theme ">
      <h1 className="header text-white">Dashboard</h1>

      <Container fluid className="p-2   ">
        <Row className="d-flex align-items-center">
          <Col
            md={4}
            className="d-flex justify-content-start align-items-center p-3"
          >
            <CustomPieChart />
          </Col>
          <Col md={8}>
            <div className="balance d-flex gap-3">
              <div className="totalBalance">
                <div className="oswald-balance">
                  <FcMoneyTransfer /> Balance
                </div>
                <hr />
                <div className="space-grotesk-amount">
                  {allTransaction.reduce((acc, t) => t.amount + acc, 0)}
                </div>
              </div>
              <div className="incomeTotal">
                <div className="oswald-balance">
                  <GiReceiveMoney /> Income
                </div>
                <hr />
                <div className="space-grotesk-amount">
                  {allTransaction.reduce((acc, item) => {
                    return item.type === "income" ? item.amount + acc : acc;
                  }, 0)}
                </div>
              </div>

              <div className="expensesTotal">
                <div className="oswald-balance">
                  {" "}
                  <GiTakeMyMoney /> Expenses
                </div>
                <hr />
                <div className="space-grotesk-amount">
                  {allTransaction.reduce((acc, item) => {
                    return item.type === "expenses" ? item.amount + acc : acc;
                  }, 0)}
                </div>
              </div>
            </div>

            <div>
              <CustomLineGraph />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
