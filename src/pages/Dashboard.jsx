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
import { EstimateForm } from "../components/EstimateForm";
import ReactMarkDown from "react-markdown";

const Dashboard = () => {
  const { showTransaction, allTransaction, user, estimate, localEstimate } =
    useUser();
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
      {user?.name && (
        <h1 className="header text-white">
          {" "}
          Welcom to your Dashboard, {user?.name}!!!{" "}
        </h1>
      )}
      {allTransaction.length ? (
        <>
          <Container fluid className="p-2 topBar  ">
            <div className=" balance d-flex gap-3">
              <div className="totalBalance">
                <div className="oswald-balance">
                  <FcMoneyTransfer /> Balance
                </div>
                <hr />
                <div
                  className={
                    incomeTotal >= expensesTotal
                      ? "space-grotesk-amount text-success amount-font "
                      : "space-grotesk-amount text-danger amount-font "
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
                <div className="space-grotesk-amount amount-font">
                  {expensesTotal}
                </div>
              </div>
            </div>

            <div className="estimate">
              <EstimateForm />
            </div>
          </Container>
          <Container>
            {estimate && (
              <div
                className="response-box"
                style={{
                  lineHeight: "1.6",
                }}
              >
                <div className="text-white text-center fw-bold">
                  {localEstimate.targetMOnths} Months Estimate Balance
                </div>
                <div className="localEstimate d-flex bg-danger rounded p-2">
                  <p>
                    <strong>Estimated Balance </strong>:{""}$
                    {localEstimate?.estimateTotalBalance}
                  </p>
                  <p>
                    <strong>Estimated Income </strong>:{""}$
                    {localEstimate?.estimateIncome}
                  </p>
                  <p>
                    <strong>Estimated Expenses </strong>:{""}$
                    {localEstimate?.estimateExpenses}
                  </p>
                </div>
                <hr />

                <p>
                  <strong>Most Spending</strong>:{""}
                  {estimate?.mostSpending?.category} ($
                  {estimate?.mostSpending?.amount})
                </p>
                <p>
                  <strong>Least Spending </strong>: {""}
                  {estimate?.leastSpending?.category} ($
                  {estimate?.leastSpending?.amount})
                </p>

                <p>
                  <strong>Suggestion to reduce exepnses </strong>: {""}
                  {estimate?.reduceExpenseSuggestion}
                </p>

                <p>
                  <strong>Suggestion to increase Income </strong>: {""}
                  {estimate?.increaseIncomeSuggestion}
                </p>
              </div>
            )}
          </Container>

          <Container>
            {" "}
            <Row className="d-flex align-items-center p-1">
              <Col>
                <div className="mt-2 d-flex justify-content-center align-items-center">
                  <CustomLineGraph />
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              <Col
                md={6}
                className="d-flex justify-content-center align-items-center "
              >
                <CustomPieChart />
              </Col>
              <Col
                md={6}
                className="d-flex justify-content-center align-items-center "
              >
                <CustomBarDiagram />
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div className="empty-div container py-5">
          No transactions yet <br /> Start tracking your income and expenses by
          adding your first transaction.
          <br /> <hr />{" "}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
