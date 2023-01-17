import React from 'react'
import DataTable from 'react-data-table-component'
import { RiUser6Fill } from 'react-icons/ri';
import { BiCurrentLocation } from 'react-icons/bi';
import { SiEquinixmetal } from 'react-icons/si';
import { GiFarmTractor, GiSandsOfTime } from 'react-icons/gi';
import Moment from 'react-moment';
import 'moment-timezone';

interface Info {
  userName: string,
  userLocation: string,
  predictions: string[],
  timestamp: number
}

const testData = [
  {
    userName:"Nyabisindu",
    timestamp: Date.now(),
    userLocation:"kk 555 st",
    predictions: ['Deasease A','Deasease C','Deasease B']
  },
  {
    userName:"Rwinkwavu",
    timestamp: Date.now(),
    userLocation:"kk 333 st",
    predictions: ['Deasease C','Deasease A','Deasease B']
  }
]

const columns:any = (isPublic = false) => [
  {
    name: (
      <p className="flex items-center">
        {
          !isPublic ? (
            <RiUser6Fill className='text-lg text-orange-500 mr-2' /> 
          ) : (
            <GiFarmTractor className='text-lg text-orange-500 mr-2'/>
          )
        }
        <span className="font-medium text-base">{isPublic?'User':'Farm'} Name</span>
      </p>
    ),
    selector: (row:Info) => <p className="font-medium text-base truncate">{row.userName}</p>
  },
  {
    name: (
      <p className="flex items-center">
        <BiCurrentLocation className='text-lg text-orange-500 mr-2' />
        <span className="font-medium text-base">Farm Location</span>
      </p>
    ),
    selector: (row:Info) => <p className="font-medium text-base truncate">{row.userLocation}</p>,
  },
  {
    name: (
      <p className="flex items-center">
        <SiEquinixmetal className='text-lg text-orange-500 mr-2' /> 
        <span className="font-medium text-base">Predictions</span>
      </p>
    ),
    selector: (row:Info) => (
      <p className="font-medium text-sm truncate">
        {
          React.Children.toArray(
            row.predictions.map((one,index)=><span>{index?", ":''}{one}</span>)
          )
        }
      </p>
    ),
  },
  {
    name: (
      <p className="flex items-center">
        <GiSandsOfTime className='text-lg text-orange-500 mr-2'/> 
        <span className="font-medium text-base">{isPublic?'Temistamp':'Created At'}</span>
      </p>
    ),
    selector: (row:Info) => <Moment className='font-medium text-sm truncate' fromNow>{row.timestamp}</Moment>,
  }
];

const Dashboard = () => {
  const [ data ] = React.useState<Info[]>(testData)

  return (
    <div className="h-full w-full max-w-5xl mx-auto ">
      <h1 className='text-center text-5xl text-gray-700 mt-32 font-black'>Recent Predictions</h1>
      <p className="text-center text-base text-gray-400 my-5">Find here all the prediction made or done and their corresponding results bellow</p>
      <div className="">
        <DataTable
          columns={columns(!!testData)}
          pagination={true}
          data={data||[]}
          // selectableRows
        />
      </div>
    </div>
  )
}

export default Dashboard
