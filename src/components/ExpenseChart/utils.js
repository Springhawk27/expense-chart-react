export const getColor = (key) => {
  switch (key) {
    case "personal":
      return "#4C49ED";
    case "shopping":
      return "#9D9BF4";
    case "phone":
      return "#4FD18B";
    case "other":
      return "#141197";
    default:
      return "#000000";
  }
};

export const getColorLabel = (key) => {
  switch (key) {
    case "personal":
      return "Personal";
    case "shopping":
      return "Shopping";
    case "phone":
      return "Phone";
    case "other":
      return "Other";
    default:
      return "Unknown";
  }
};

export const describeArc = (x, y, radius, startAngle, endAngle) => {
  const startRadians = (startAngle * Math.PI) / 180;
  const endRadians = (endAngle * Math.PI) / 180;
  const x1 = x + radius * Math.cos(startRadians);
  const y1 = y + radius * Math.sin(startRadians);
  const x2 = x + radius * Math.cos(endRadians);
  const y2 = y + radius * Math.sin(endRadians);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
  ].join(" ");
};
