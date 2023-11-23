import { useState } from "react";
import "./ExpenseChart.scss";

const ExpenseChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const data = [
    {
      period: "1M",
      personal: 150,
      shopping: 90,
      phone: 60,
      other: 80,
    },
    {
      period: "6M",
      personal: 320,
      shopping: 240,
      phone: 255,
      other: 298,
    },
    {
      period: "1Y",
      personal: 950,
      shopping: 930,
      phone: 738,
      other: 490,
    },
    {
      period: "ALL TIME",
      personal: 1800,
      shopping: 1420,
      phone: 1265,
      other: 1000,
    },
  ];

  const selectedData = data.find((item) => item.period === selectedPeriod);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="expense-chart">
      <div className="card">
        <h2>Expenses</h2>
        <div className="options">
          {["1M", "6M", "1Y", "ALL TIME"].map((period) => (
            <span
              key={period}
              className={selectedPeriod === period ? "active" : ""}
              onClick={() => handlePeriodChange(period)}
            >
              {period}
            </span>
          ))}
        </div>
        <div className="pie-chart">
          <div className="total-expense">${selectedData.total || 0.0}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
