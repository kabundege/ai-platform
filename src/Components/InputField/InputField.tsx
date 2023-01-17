import React, { FC, FocusEvent, memo, ReactNode, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  handleChange?: (value:string) => void,
  onLabelClick?: (label:string) => void,
  ConatinerClassName?: string,
  wrapperClassName?: string,
  showDimensions?: boolean,
  IconProp?: ReactNode,
  Icon?: IconType,
  error?: string,
  value?: string,
  label: string,
  maximum?: number,
  register?: any,
}

const InputField:FC<Props> = ({ handleChange,Icon,error,label,IconProp,ConatinerClassName,wrapperClassName,register,onLabelClick,showDimensions=false,maximum=0, ...rest }) => {
  const [ focused,setFocus ] = useState(false)
  const inputRef = useRef<any>(null)

  const onFocus = (e?:FocusEvent<HTMLInputElement>) => {
    if(e)
    e.stopPropagation()
    /**
     * when an input if focused
     * and the user assigned type is number
     * * it should change type back to number
     */
    setFocus(true)
    if(rest.type === 'number' && rest.value ){
      inputRef.current.type = 'number'
      inputRef.current.value = rest.value
    }
  }

  const onBlur = (e?:FocusEvent<HTMLInputElement>) => {
    if(e)
    e.stopPropagation()
    /**
     * when an input if focused
     * and the user assigned type is number
     * * it should change type to text to be able to append commas
     */
    setFocus(false)
    if(rest.type === 'number' && rest.value && !isNaN(Number(rest.value || 0))){
      inputRef.current.type = 'text'
      inputRef.current.value = Number(rest.value || 0).toLocaleString()
    }
  }

  const handleCommars = () => {
    if( rest.value && inputRef.current && !focused && !isNaN(Number(rest.value || 0))){
      inputRef.current.type = 'text'
      inputRef.current.value = Number(rest.value || 0).toLocaleString()
    }
  }


  useEffect(()=>{
    if(rest.type === 'number' && rest.value){
      handleCommars()
    }
    // eslint-disable-next-line
  },[rest])

  const inputStyle = "flex-1 text-base placeholder-bash font-medium outline-none py-3 w-full " + rest.className

  return (
    <div key={label} className={'my-3 overflow-hidden w-full '+ConatinerClassName}>
      <label className="text-bash font-medium capitalize text-sm">{label}</label>
      <div className={`border border-bash mt-1 flex items-center px-4 ${error?"border border-bred":""} `+wrapperClassName}>

      {
          /**
           * when an input if of type number we need,
           * to add commas within the number for better ux,
           * which register prohibits when distructured in an input
           */
          rest.type === "number" ? (
            <input 
              ref={inputRef}
              onChange={(e)=> {
                if(handleChange)
                handleChange(e.target.value)
              }}
              {...rest}
              className={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
              min={0}
            />
          ) : (
            <input 
              {...rest}
              {...register}
              className={inputStyle}
            />
          ) 
      }
      { IconProp ? IconProp : null }
      </div>
      {
        !rest.value || Number(rest.value) > maximum ?
          <p className='text-base text-left text-bred mt-1 w-full'>{error}</p>:
            showDimensions && 
            <p 
              onClick={()=>{
                if(onLabelClick)
                onLabelClick(label)
              }} 
              className="hover:opacity-90 text-blue-600 cursor-pointer"
            >Set dimensions</p>
      }
    </div>
  )
}

export default memo(InputField)
