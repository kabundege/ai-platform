import { AiOutlineLoading } from 'react-icons/ai'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text: string | ReactNode,
  isLoading?: boolean,
  LeftIcon?: ReactNode,
  RightIcon?: ReactNode,
  textClassName?: string,
}

export const btnStyle = "bg-bblue rounded-lg py-2 px-8 border font-medium text-lg text-white cursor-pointer"

const Button:FC<Props> = ({ isLoading,LeftIcon,RightIcon,text,textClassName, ...props }) => {
  return (
    <button {...props} className={props.className+' w-full text-center p-3 text-white bg-black rounded-lg hover:opacity-80'} >
      {LeftIcon}
      <AiOutlineLoading 
          className={`animate-spin mx-2 my-1 absolute ${!isLoading && 'opacity-0'} cursor-pointer`}
        /> 
      <label className={`${isLoading && 'opacity-0'} cursor-pointer text-sm font-medium uppercase md:text-base ${textClassName}`}>
        {text}
      </label>
      {RightIcon}
    </button>
  )
}

export default Button
