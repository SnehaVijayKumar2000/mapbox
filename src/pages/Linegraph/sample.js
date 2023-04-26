import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';


const LineGraph = ({ location, asset, businessCategory }) => {
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      // Perform data aggregation and fetch the necessary data for the selected location, asset, or business category
      const data = await fetchChartData(location, asset, businessCategory);
      
      // Set up the chart data using Chart.js format
      const chartData = {
        labels: data.map(d => d.year),
        datasets: [
          {
            label: 'Risk Rating',
            data: data.map(d => d.riskRating),
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
          }
        ]
      };
      
      setChartData(chartData);
    };
    
    fetchData();
  }, [location, asset, businessCategory]);
  
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

const fetchChartData = async (location, asset, businessCategory) => {
  // Perform data aggregation and fetch the necessary data for the selected location, asset, or business category
  // Return the data as an array of objects with the year and risk rating values
  // Example:
  return [
    { year: 2020, riskRating: 5 },
    { year: 2021, riskRating: 7 },
    { year: 2022, riskRating: 4 },
    { year: 2023, riskRating: 9 }
  ];
};

export default LineGraph;
