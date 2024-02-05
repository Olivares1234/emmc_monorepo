import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";

import { useGetCharData } from "../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: `Collection & Due for ${dayjs().format("MMMM")}`,
    },
  },
};

function CollectionChart() {
  const [data] = useGetCharData();

  const labels = useMemo(() => data?.map((val) => val.month), [data]);
  const graphData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Collected",
          data: data.map((val) => val?.total_collected),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Due",
          data: data.map((val) => val?.total_due),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    }),
    [labels, data],
  );

  return (
    <div className="mt-16">
      <Line options={options} data={graphData} />
    </div>
  );
}

export default CollectionChart;
