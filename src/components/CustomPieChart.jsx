import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { useUser } from "../contex/UserContex";
import { useState } from "react";

const CustomPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { allTransaction, showTransaction } = useUser();
  const totalIncome = allTransaction.reduce((acc, item) => {
    return item.type === "income" ? item.amount + acc : acc;
  }, 0);

  const totalExpenses = allTransaction.reduce((acc, item) => {
    return item.type === "expenses" ? item.amount + acc : acc;
  }, 0);
  console.log("income:", totalIncome);
  console.log("expenses:", totalExpenses);
  console.log(allTransaction[0]?.type);

  const data = [
    // { name: allTransaction?[0].ty, value: 400 },
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpenses },
  ];
  const COLORS = ["green", "red"];

  return (
    <div className="customPieChart">
      <PieChart width={400} height={500} background={"red"}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={190}
          paddingAngle={4}
          label
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={800}
          animationEasing="ease-out"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={`url(#grad${index})`}
              stroke={"none"}
              style={{
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity:
                  activeIndex === null || activeIndex === index ? 1 : 0.5,
                filter: "drop-shadow(0px 6px 8px grey)",
              }}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`$${value}`, name]}
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "none",
            borderRadius: 10,
            color: "#fff",
          }}
          itemStyle={{ color: "#fff" }}
        />
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={{ color: "#e5e7eb", fontSize: 13, paddingTop: 10 }}
        />
      </PieChart>
    </div>
  );
};
export default CustomPieChart;
