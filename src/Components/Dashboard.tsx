import React from 'react'
import DataTable from 'react-data-table-component';
import { BiCurrentLocation } from 'react-icons/bi';
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
import { BsShieldCheck, BsShieldX } from 'react-icons/bs';
import Input from './Input';
import { FiSearch } from 'react-icons/fi';

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
      text: 'Corresponding to the above data',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface Info {
  timestamp: number,
  userLocation: string,
  predictions: {yes:number,no:number},
}

const RN = () => Math.floor(Math.random()*500)

const testData = [
  {
    userLocation:"Huye",
    timestamp: Date.now(),
    predictions: { yes:RN(), no:RN()  }
  },
  {
    timestamp: Date.now(),
    userLocation: "Musanze",
    predictions: { yes:RN(), no:RN()  }
  }
]

const Dashboard = () => {
  const [ data ] = React.useState<Info[]>(testData)
  const [query, setQuery] = React.useState<string>('');

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
          <BsShieldCheck className='text-lg text-orange-500 mr-2' /> 
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
          <BsShieldX className='text-lg text-orange-500 mr-2' /> 
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

  const handleQueryData = () => {
    return data.filter((row)=>{
      let matches = false;
      for(const one of Object.values(row)){
        if(String(one).includes(query)){
          matches = true
        }
      }
      return matches
    })
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Found Healthy',
        data: labels.map(() => Math.floor(Math.random()*1000)),
        backgroundColor: '#FF8A34',
      },
      {
        label: 'Found Sick',
        data: labels.map(() => Math.floor(Math.random()*1000)),
        backgroundColor: '#222',
      },
    ],
  };

  return (
    <div className="h-full w-full max-w-5xl mx-auto ">
      <h1 className='text-center text-5xl text-gray-700 mt-20 font-black'>Recent Predictions</h1>
      <p className="text-center text-base text-gray-400 my-5">Find here all the prediction made or done and their corresponding results bellow</p>
      <Input
        value={query}
        LeftIcon={<FiSearch />}
        placeholder="Search here"
        onChange={(ev) => setQuery(ev.target.value)}
        conatinerClassName="mb-10 max-w-xl mx-auto"
      />
      <div className="mb-10">
        <DataTable
          columns={columns}
          pagination={true}
          data={handleQueryData()}
          // selectableRows
        />
      </div>
      <Bar options={options} data={barData} />
    </div>
  )
}

export default Dashboard
