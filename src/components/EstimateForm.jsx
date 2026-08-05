import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { useUser } from "../contex/UserContex";
import { getEstimate } from "../../helper/axios";
import { useState } from "react";

export const EstimateForm = () => {
  const {
    showTransaction,
    allTransaction,
    user,
    setEstimate,
    setLocalEstimate,
  } = useUser();
  const [loading, setLoading] = useState(false);

  const { form, handleOnChange } = useForm({ months: "" });

  const getMonthsOfHistory = (transactions) => {
    if (!transactions.length) return 0;

    const dates = transactions.map((t) => new Date(t.date));
    const earliest = new Date(Math.min(...dates));
    const latest = new Date(Math.max(...dates));

    const months =
      (latest.getFullYear() - earliest.getFullYear()) * 12 +
      (latest.getMonth() - earliest.getMonth()) +
      1; // +1 makes Jan-July inclusive = 7, not 6

    return months;
  };

  const getMostSpendingItems = (transactions) => {
    const totalByCatagories = {};

    transactions
      .filter((t) => t.type === "expenses")
      .forEach((t) => {
        totalByCatagories[t.category] =
          (totalByCatagories[t.category] || 0) + t.amount;
      });

    return totalByCatagories;
  };

  const incomeTotal = allTransaction.reduce((acc, item) => {
    return item.type === "income" ? item.amount + acc : acc;
  }, 0);
  const expensesTotal = allTransaction.reduce((acc, item) => {
    return item.type === "expenses" ? item.amount + acc : acc;
  }, 0);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const totalBalance = incomeTotal - expensesTotal;
    const numberOfMonths = getMonthsOfHistory(allTransaction);

    const estimateIncome =
      incomeTotal + Math.floor(incomeTotal / numberOfMonths) * form.months;

    const estimateExpenses =
      expensesTotal + Math.floor(expensesTotal / numberOfMonths) * form.months;

    const estimateTotalBalance =
      totalBalance + Math.floor((totalBalance / numberOfMonths) * form.months);

    const mostSpendingItem = getMostSpendingItems(allTransaction);

    const estimatePayload = {
      totalBalance,
      numberOfMonths,
      estimateExpenses,
      estimateIncome,
      estimateTotalBalance,
      mostSpendingItem,
      targetMOnths: form.months,
    };
    setLocalEstimate(estimatePayload);
    const aiResponse = await getEstimate(estimatePayload);

    if (aiResponse.status === "success") {
      const cleanJson = aiResponse.message
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const estimateData = JSON.parse(cleanJson);
      console.log(estimateData);

      setEstimate(estimateData);
    }
    setLoading(false);
    // call ai to find can save from
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className=" text-white totalbalance">
            Estimate Timeframe{" "}
          </Form.Label>
          <Form.Select
            name="months"
            onChange={handleOnChange}
            value={form.months || ""}
            required
          >
            <option value="">Select</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
            <option value={24}>2 year</option>
          </Form.Select>
        </Form.Group>

        <Button variant="danger" type="submit" disabled={loading}>
          {loading ? " calculating" : "Calculate"}
        </Button>
      </Form>
    </>
  );
};
