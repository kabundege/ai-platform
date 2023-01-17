import { AiOutlineLoading } from 'react-icons/ai'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import { centerd } from '../../constants/comon.styles';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  text: string | ReactNode,
  isLoading?: boolean,
  LeftIcon?: ReactNode,
  RightIcon?: ReactNode,
  textClassName?: string,
}

export const btnStyle = "bg-bblue py-2 px-8 border font-medium text-lg text-white cursor-pointer"

const Button:FC<Props> = ({ isLoading,LeftIcon,RightIcon,text,textClassName, ...props }) => {
  return (
    <button {...props} className={props.className+' w-full text-center p-3 text-white bg-black hover:opacity-80'+centerd} >
      {LeftIcon}
      <AiOutlineLoading 
          className={`animate-spin my-1 absolute ${!isLoading && 'opacity-0'} cursor-pointer`}
        /> 
      <label className={`${isLoading && 'opacity-0'} cursor-pointer text-sm font-medium uppercase md:text-base ${textClassName}`}>
        {text}
      </label>
      {RightIcon}
    </button>
  )
}

export default Button
