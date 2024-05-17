import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
const Precion = ({envioCiudad}) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${envioCiudad}?unitGroup=metric&key=KUV4UMH6A4LM7FVYQK2D6RGH7`
      )
      .then((res) => setDatos(res.data));
  }, [envioCiudad]);

  const labels =
    datos.days && datos.days.length >= 8
      ? datos.days.slice(0, 8).map((day) => day.datetime)
      : [];
  // Verifica si datos.days está definido y tiene al menos 6 elementos, luego mapea los valores de feelslike
  const presion =
    datos.days && datos.days.length >= 8
      ? datos.days.slice(0, 8).map((day) => day.pressure)
      : [];
   
  const data = {
    labels: labels,
    datasets: [
      {
        label: "PRECION:",
        data: presion,
        backgroundColor: 'rgba(135, 206, 235, 1)',
            fill: false, // No rellenar las barras
            barThickness: 20, // Grosor de las barras
      },
      
    ],
  };
  const options = {
    interaction: {
      mode: 'index'
    },
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: false,
      text: 'Orders Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: true
    },
    hover: {
      mode: 'nearest', // Modo de visualización del evento hover
      intersect: true, // Las líneas de referencia se intersectan
    },
    legend: {
      labels: {
        fontColor: 'rgba(0,0,0,.4)'
      },
      align: 'end',
      position: 'bottom'
    },
    scales: {
      x: {
        stacked: true,
        
      },
      y: {
        beginAtZero: true,
        stacked: true,
     
      }
    },
    plugins: {
      
      tooltip: {
        callbacks: {
          label: function(context) {
            var label = context.dataset.label || '';
            if (label) {
              label += '\n';
            }
            if (context.parsed.y !== null) {
              var data = context.dataset.data[context.dataIndex];
              label += data + ' hPa';
            }
            return label;
          }
        }
      }
    },
    barThickness: 60
  };

  return (
    <div className='w-[768px] mx-auto px-2' >
  <Bar data={data} options={options} />
</div>
  );
};

export default Precion;
