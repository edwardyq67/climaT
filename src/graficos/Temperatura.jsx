import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Temperatura = ({ envioCiudad }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${envioCiudad}?unitGroup=metric&key=KUV4UMH6A4LM7FVYQK2D6RGH7`
        );
        setDatos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (envioCiudad) {
      fetchData();
    }
  }, [envioCiudad]);

  const getDataForChart = (days) => {
    const labels = days.slice(0, 8).map((day) => day.datetime);
    const temperatures = days.slice(0, 8).map((day) => day.feelslike);
    const temperatureMax = days.slice(0, 8).map((day) => day.feelslikemax);
    const temperatureMin = days.slice(0, 8).map((day) => day.feelslikemin);
    return { labels, temperatures, temperatureMax, temperatureMin };
  };

  const { labels, temperatures, temperatureMax, temperatureMin } = datos.days
    ? getDataForChart(datos.days)
    : { labels: [], temperatures: [], temperatureMax: [], temperatureMin: [] };

  const data = {
    labels,
    datasets: [
      {
        label: "TEM:",
        data: temperatures,
        backgroundColor: "rgba(255, 255, 0, 1)",
        fill: false,
        barThickness: 20,
      },
      {
        label: "TEM_MAX:",
        data: temperatureMax,
        backgroundColor: "rgba(255, 0, 0, 1)",
        fill: false,
        barThickness: 20,
      },
      {
        label: "TEM_MIN:",
        data: temperatureMin,
        backgroundColor: "rgba(255, 165, 0, 1)",
        fill: false,
        barThickness: 20,
      },
    ],
  };

  const options = {
    interaction: {
      mode: "index",
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          fontColor: "rgba(0,0,0,.4)",
        },
        align: "end",
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += "\n";
            }
            if (context.parsed.y !== null) {
              const data = context.dataset.data[context.dataIndex];
              label += data + "°C";
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
        min: -20,
        max: 50,
      },
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[768px] mx-auto px-2">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Temperatura;
