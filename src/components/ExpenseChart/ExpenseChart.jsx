import { useEffect, useState } from "react";
import "./ExpenseChart.scss";
import { describeArc, getColor, getColorLabel } from "./utils";

const ExpenseChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("ALL TIME");
  const [angles, setAngles] = useState([]);

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

  useEffect(() => {
    const selectedData = data.find((item) => item.period === selectedPeriod);
    const values = Object.values(selectedData).filter(
      (value, index) =>
        index !== 0 && index !== Object.keys(selectedData).length
    );

    const total = values.reduce((acc, curr) => acc + curr, 0);
    let startAngle = 0;

    const newAngles = values.map((value) => {
      const angle = (value / total) * 360;
      const endAngle = startAngle + angle;
      const path = describeArc(50, 50, 40, startAngle, endAngle);
      startAngle = endAngle;
      return path;
    });

    setAngles(newAngles);
  }, [selectedPeriod]);

  const selectedData = data.find((item) => item.period === selectedPeriod);

  const totalExpense = Object.values(selectedData)
    .filter(
      (value, index) =>
        index !== 0 && index !== Object.keys(selectedData).length
    )
    .reduce((acc, curr) => acc + curr, 0);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const totalExpenseFormatted = totalExpense.toFixed(2);

  const values = Object.values(selectedData).filter(
    (value, index) => index !== 0 && index !== Object.keys(selectedData).length
  );

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
          <svg viewBox="0 0 100 100" className="chart-svg">
            {angles.map((path, index) => (
              <path
                key={index}
                d={path}
                fill="transparent"
                stroke={getColor(Object.keys(data[0])[index + 1])}
                strokeWidth="10"
              >
                <title>{`${Object.keys(data[0])[index + 1]}: ${
                  values[index]
                }`}</title>
              </path>
            ))}
          </svg>
          <div className="total-expense">
            <span>$ {totalExpenseFormatted.split(".")[0]}</span>
            <span style={{ color: "#9D9BF4", fontSize: "16px" }}>
              {`.${totalExpenseFormatted.split(".")[1]}`}
            </span>
          </div>
        </div>

        <div className="legend">
          {Object.entries(selectedData).map(
            ([key]) =>
              key !== "period" && (
                <div key={key} className="legend-item">
                  <div
                    className="color"
                    style={{ backgroundColor: getColor(key) }}
                  ></div>
                  <div className="label">{`${getColorLabel(key)}`}</div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
