import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Grafico1() {
  const [monthlyData, setMonthlyData] = useState<number[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const months = Array(12).fill(0);

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.createdAt) return;

        const month = data.createdAt.toDate().getMonth();
        months[month] += 1;
      });

      setMonthlyData(months);
    });

    return () => unsub();
  }, []);

  const chartData = {
    labels: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    datasets: [
      {
        label: "Novos usuários por mês",
        data: monthlyData,
        borderWidth: 3,
        tension: 0.3,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mt-10">
      <h2 className="text-lg font-bold mb-4">Crescimento Mensal</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
