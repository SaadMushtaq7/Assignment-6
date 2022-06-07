import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
//src
import "../styles/comparison-table.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Downloads",
    },
  },
};
interface ComparisonData {
  from: string;
  to: string;
  count: number;
}
interface Props {
  firstName: string;
  firstData: ComparisonData[];
  secondName: string;
  secondData: ComparisonData[];
}
const ComparisonChart: FC<Props> = ({
  firstName,
  firstData,
  secondName,
  secondData,
}) => {
  const firstLabels = firstData.map((data) => data.from.split("T")[0]);
  const firstDownloads = firstData.map((data) => data.count);
  //const secondLabels = secondData.map((data) => data.from);
  const secondDownloads = secondData.map((data) => data.count);
  return (
    <div className="chart-container">
      <Line
        options={options}
        data={{
          labels: firstLabels,
          datasets: [
            {
              label: firstName,
              data: firstDownloads,
              borderColor: "rgb(0, 138, 82)",
              backgroundColor: "rgba(120, 223, 182, 0.5)",
            },
            {
              label: secondName,
              data: secondDownloads,
              borderColor: "rgb(120, 223, 182)",
              backgroundColor: "rgba(0, 138, 82, 0.5)",
            },
          ],
        }}
        height={400}
        width={600}
      />
    </div>
  );
};

export default ComparisonChart;
