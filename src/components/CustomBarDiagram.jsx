import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useUser } from "../contex/UserContex";

// #region Sample data
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// #endregion
const CustomBarDiagram = () => {
  const { allTransaction } = useUser();

  const getMonthName = (transactionDate) => {
    const date = new Date(transactionDate);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });

    return `${month} ${year}`;
  };

  const groupedData = allTransaction.reduce((acc, transaction) => {
    const month = getMonthName(transaction.date);
    let existing = acc.find((item) => item.name === month);

    if (!existing) {
      existing = { name: month, income: 0, expenses: 0 };
      acc.push(existing);
    }

    if (transaction.type === "income") {
      existing.income += transaction.amount;
    } else if (transaction.type === "expenses") {
      existing.expenses += transaction.amount;
    }

    return acc;
  }, []);

  const sortedData = groupedData.sort((a, b) => {
    return new Date(a.name) - new Date(b.name); // works since "Jul 2026" is parseable by Date()
  });

  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={sortedData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="name" />
      <YAxis width="100" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="income"
        fill="#8884d8"
        activeBar={{ fill: "pink", stroke: "blue" }}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="expenses"
        fill="#82ca9d"
        activeBar={{ fill: "gold", stroke: "purple" }}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
};

export default CustomBarDiagram;
