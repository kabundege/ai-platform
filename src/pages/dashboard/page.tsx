import React from "react";
import DataTable from "react-data-table-component";
import { RiUser6Fill } from "react-icons/ri";
import { BiCurrentLocation } from "react-icons/bi";
import { GiFarmTractor, GiSandsOfTime } from "react-icons/gi";
import Moment from "react-moment";
import "moment-timezone";
import Input from "../../Components/Input";
import { FiSearch } from "react-icons/fi";
import { BsShieldCheck, BsShieldX } from 'react-icons/bs';

interface Info {
  userName: string;
  timestamp: number;
  userLocation: string;
  predictions: {yes:number,no:number};
}

const RN = () => Math.floor(Math.random()*500)

const testData = [
  {
    userName: "Farm 01",
    timestamp: Date.now(),
    userLocation: "kk 555 st",
    predictions: { yes:RN(), no:RN()  }
  },
  {
    userName: "Farm 02",
    timestamp: Date.now(),
    userLocation: "kk 333 st",
    predictions: { yes:RN(), no:RN()  }
  },
];

const columns: any = (isPublic = false) => [
  {
    name: (
      <p className="flex items-center">
        {!isPublic ? (
          <RiUser6Fill className="text-lg text-orange-500 mr-2" />
        ) : (
          <GiFarmTractor className="text-lg text-orange-500 mr-2" />
        )}
        <span className="font-medium text-base">Farm Name</span>
      </p>
    ),
    selector: (row: Info) => (
      <p className="font-medium text-base truncate">{row.userName}</p>
    ),
  },
  {
    name: (
      <p className="flex items-center">
        <BiCurrentLocation className="text-lg text-orange-500 mr-2" />
        <span className="font-medium text-base">Farm Location</span>
      </p>
    ),
    selector: (row: Info) => (
      <p className="font-medium text-base truncate">{row.userLocation}</p>
    ),
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
          {isPublic ? "Temistamp" : "Created At"}
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

const Dashboard = () => {
  const [data] = React.useState<Info[]>(testData);
  const [query, setQuery] = React.useState<string>('');

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
  }

  return (
    <div className="h-full w-full max-w-5xl mx-auto ">
      <h1 className="text-center text-5xl text-gray-700 mt-12 font-black">
        Recent Predictions
      </h1>
      <p className="text-center text-base text-gray-400 my-5">
        Find here all the prediction made or done and their corresponding
        results bellow
      </p>
      <Input
        value={query}
        LeftIcon={<FiSearch />}
        placeholder="Search here"
        onChange={(ev) => setQuery(ev.target.value)}
        conatinerClassName="mb-10 max-w-xl mx-auto"
      />
      <div className="">
        <DataTable
          columns={columns(!!testData)}
          data={handleQueryData()}
          pagination={true}
          // selectableRows
        />
      </div>
    </div>
  );
};

export default Dashboard;
