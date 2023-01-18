import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { BiCurrentLocation } from 'react-icons/bi';
import { SiEquinixmetal } from 'react-icons/si';
import Moment from 'react-moment';
import 'moment-timezone';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GiSandsOfTime } from 'react-icons/gi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const barData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random()*1000)),
      backgroundColor: '#FF8A34',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random()*1000)),
      backgroundColor: '#222',
    },
  ],
};

interface Info {
  timestamp: number,
  userLocation: string,
  predictions: {yes:number,no:number},
}

const testData = [
  {
    userLocation:"Huye",
    timestamp: Date.now(),
    predictions: { yes:200, no:200  }
  },
  {
    timestamp: Date.now(),
    userLocation: "Musanze",
    predictions: { yes:200, no:350  }
  }
]

const Dashboard = () => {
  const [ data,setData ] = React.useState<Info[]>([])

  const columns:any = [
    {
      name: (
        <p className="flex items-center">
          <BiCurrentLocation className='text-lg text-orange-500 mr-2' />
          <span className="font-medium text-base">Provinces</span>
        </p>
      ),
      selector: (row:Info) => <p className="font-medium text-base truncate">{row.userLocation}</p>,
    },
    {
      name: (
        <p className="flex items-center">
          <SiEquinixmetal className='text-lg text-orange-500 mr-2' /> 
          <span className="font-medium text-base">Found healthy</span>
        </p>
      ),
      selector: (row:Info) => (
        <p className="font-medium text-sm truncate">
          {row.predictions.yes} 
        </p>
      ),
    },
    {
      name: (
        <p className="flex items-center">
          <SiEquinixmetal className='text-lg text-orange-500 mr-2' /> 
          <span className="font-medium text-base">Found Sick</span>
        </p>
      ),
      selector: (row:Info) => (
        <p className="font-medium text-sm truncate">
          {row.predictions.no} 
        </p>
      ),
    },
    {
      name: (
        <p className="flex items-center">
          <GiSandsOfTime className="text-lg text-orange-500 mr-2" />
          <span className="font-medium text-base">
            Temistamp
          </span>
        </p>
      ),
      selector: (row: Info) => (
        <Moment className="font-medium text-sm truncate" fromNow>
          {row.timestamp}
        </Moment>
      ),
    },
  ];

  useEffect(()=>{
    setData(testData)
  },[])

  return (
    <div className="h-full w-full max-w-5xl mx-auto ">
      <h1 className='text-center text-5xl text-gray-700 mt-20 font-black'>Recent Predictions</h1>
      <p className="text-center text-base text-gray-400 my-5">Find here all the prediction made or done and their corresponding results bellow</p>
      <div className="mb-10">
        <DataTable
          columns={columns}
          pagination={true}
          data={data||[]}
          // selectableRows
        />
      </div>
      <Bar options={options} data={barData} />;
    </div>
  )
}

export default Dashboard
