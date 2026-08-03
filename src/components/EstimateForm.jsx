import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { useUser } from "../contex/UserContex";

export const EstimateForm = () => {
  const { showTransaction, allTransaction, user } = useUser();

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

    const entries = Object.entries(totalByCatagories);
    if (!entries.length) return null;

    const [mostSpentCategory, mostSpentAmount] = entries.reduce(
      (max, current) => (current[1] > max[1] ? current : max),
    );

    return { category: mostSpentCategory, amount: mostSpentAmount };
  };

  const incomeTotal = allTransaction.reduce((acc, item) => {
    return item.type === "income" ? item.amount + acc : acc;
  }, 0);
  const expensesTotal = allTransaction.reduce((acc, item) => {
    return item.type === "expenses" ? item.amount + acc : acc;
  }, 0);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const totalBalance = incomeTotal - expensesTotal;
    const numberOfMonths = getMonthsOfHistory(allTransaction);

    const estimateIncome =
      incomeTotal + Math.floor(incomeTotal / numberOfMonths) * form.months;

    const estimateExpenses =
      expensesTotal + Math.floor(expensesTotal / numberOfMonths) * form.months;

    const estimateTotalBalance =
      totalBalance + Math.floor((totalBalance / numberOfMonths) * form.months);

    const mostSpendingItem = getMostSpendingItems(allTransaction);

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

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
