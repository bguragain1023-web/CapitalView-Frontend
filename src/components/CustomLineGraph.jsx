import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useUser } from "../contex/UserContex";

// #region Sample data

// #endregion

const CustomLineGraph = () => {
  const { allTransaction } = useUser();

  const getMonthLabel = (transactionDate) => {
    const date = new Date(transactionDate);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return { label: `${month} ${year}`, sortKey: year * 12 + date.getMonth() };
  };

  const groupData = allTransaction.reduce((acc, transaction) => {
    const { label, sortKey } = getMonthLabel(transaction.date);

    let existing = acc.find((item) => item.name === label);

    if (!existing) {
      existing = { name: label, income: 0, expenses: 0, sortKey };
      acc.push(existing);
    }
    if (transaction.type === "income") {
      existing.income += transaction.amount;
    } else if (transaction.type === "expenses") {
      existing.expenses += transaction.amount;
    }
    return acc;
  }, []);
  const data = groupData
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...rest }) => rest);
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "200px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
        background: "rgba(241, 239, 239, 0.091)",
        borderRadius: "10px",
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.08)" />
      <XAxis dataKey="name" stroke="grey" />
      <YAxis width="a" stroke="grey" />
      <Tooltip
        cursor={{
          stroke: "white",
        }}
        contentStyle={{
          backgroundColor: "#1f2937",
          border: "none",
          borderRadius: 10,
          color: "#fff",
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="expenses"
        stroke="red"
        dot={{
          fill: "red",
        }}
        activeDot={{ r: 8, stroke: "red" }}
      />
      <Line
        type="monotone"
        dataKey="income"
        stroke="green"
        dot={{
          fill: "green",
        }}
        activeDot={{ r: 1, stroke: "green" }}
      />
    </LineChart>
  );
};
export default CustomLineGraph;
