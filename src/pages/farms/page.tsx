import React from 'react';
import FarmOne from '../../Components/farm';

const Farms = () => {
  return (
    <div className='w-full'>
      <h1 className='text-center text-5xl text-gray-700 my-5 font-black'>Check on your farms</h1>
      <p className="text-center text-xl text-gray-400 mb-10">Find here details on your farms</p>
      <div className="h-full w-full max-w-5xl mx-auto grid grid-cols-4 gap-3">
        { 
          React.Children.toArray(
            Array.from({length:20}).map((_,index)=><FarmOne {...{index}}/>)
          ) 
        }
      </div>
    </div>
  )
}

export default Farms
