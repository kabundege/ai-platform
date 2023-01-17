"use client"
import React,{ FC,useState,useEffect, useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';
import { TbSearch } from 'react-icons/tb';
import { flexer } from '../../constants/comon.styles';
import IconInput from '../IconInput';

export interface Option {
  value: string,
  label?: string // incase its not provided, we render the actual value
}

interface Props {
  onChange: (value:string) => void,
  showSearch?: boolean,
  placeholder?: string,
  className?: string,
  data: Option[],
  value?: string,
  error?: string,
  disabled?: boolean,
  showAcheck?: boolean,
  wrapperClassName?: string,
  labelClassName?: string
}

const SelectField:FC<Props> = ({ error,value,wrapperClassName,labelClassName,showAcheck,onChange,data,placeholder,className, disabled=false,showSearch = false }) => {
  const [ customData,setCustomData ] = useState<Option[]>([])
  const [ showModal,setModal ] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [ localValue,setValue ] = useState<string>()
  const [ query,setQuery ] = useState<string>()
  //
  useEffect(()=>{
    if(value){
      /**
       * when the valued is updated,
       * it find the corresponding value
       * in the data, and sets it label
       */
      for(const one of data){
        if(one.value.includes(value) || one.label?.includes(value)){
          setValue(one.label || one.value)
        }
      }
    }else{
      setValue('')
    }
  },[value,data])

  useEffect(()=>{
    // clicke event that's incharge of 
    // closing the modal
    document.addEventListener('click', (e:any) => {
      if(e.target && e.target.contains(selectRef.current)){
        setModal(false)
      }
    })

    return () => {
      // clear the event
      document.removeEventListener('click', () => {
        setModal(false)
      })
    }
  },[])

  useEffect(()=>{
    if(query){
      const newData = data.filter(({ value }) => String(value).toLowerCase().includes(query.toLowerCase()) )
      setCustomData(newData)
    }else{
      setCustomData(data)
    }
  },[query,data])

  const toggleModal = () => {
    if(!disabled)
    setModal( prev => !prev)
  }

  const handleChange = (value:string,label?:string) => {
    onChange(value)
    setValue(label||value)
    toggleModal()
  }

  return (
    <div className={"w-full flex my-3 relative flex-col "+className} ref={selectRef}>
      <div className={flexer+`px-4 py-3 cursor-pointer border ${error?'border-red-300':""} bg-gray-100 ${disabled && 'bg-gray-200'} mt-1 ${wrapperClassName}`} onClick={toggleModal}>
        {
          localValue ?
            <p className="font-medium text-base text-gray-700">{localValue}</p> :
            <p className="text-gray-400 text-base" >{placeholder || "Choose"}</p>  
        }
        {
          showModal ?
            <BsChevronUp className="text-bash" />:
            <BsChevronDown className="text-bash" />
        }
      </div>
      {
        showModal &&
        <div className="absolute w-full top-full left-0 z-20 shadow-lg p-3 bg-white" >
          {
            showSearch &&
            <IconInput
              value={query}
              Icon={TbSearch}
              style={{padding:0}}
              placeholder="Search"
              onChange={val => setQuery(val)}
            />
          }
          <div className="max-h-40 h-fit overflow-y-scroll">
            { // creating unique keys
              React.Children.toArray(
                customData.map(({ value,label },index) => 
                  showAcheck ? (
                    <div className={`
                      flex items-center px-1 py-1 text-left
                      hover:bg-blue-100 hover:text-bblue w-full
                      ${value !== localValue ? 'pl-5' : 'bg-bblue'} 
                      ${index ? null : 'mt-1'}
                    `}>
                      {
                        localValue === value ? (
                          <AiOutlineCheck className="text-white text-base mr-1" />
                        ) : null
                      }
                      <p
                        className={`
                          w-full cursor-pointer truncate
                          ${value !== localValue ? '' : 'text-white'}
                        `}
                        onClick={() => handleChange(value,label)} 
                      >
                        {" "}{label || value}
                      </p> 
                    </div> 
                  ) : (
                    <p 
                      className={`px-5 py-1 w-full cursor-pointer hover:bg-gray-200 hover:text-gray-800 ${index ? null : 'mt-1'} ${labelClassName}`}
                      onClick={() => handleChange(value,label)} 
                    >
                      {label || value}
                    </p> 
                  )
                )
              )
            }
          </div>
        </div>
      } 
      <p className={`text-red-400 text-left w-full mt-1 ${!error?"hidden":""}`}>{error}</p>
    </div>
  )
}

export default SelectField
