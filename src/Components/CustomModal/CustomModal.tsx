import  { FC } from 'react'
import Modal from '../Modal'
import { ModalProps } from '../Modal/Modal'

interface Props extends ModalProps {
  containerClassName?: string
}

const CustomModal:FC<Props> = ({ containerClassName="",children,...props}) => {
  return (
    <Modal {...props} >
        <div className={'relative z-10 bg-white p-5 rounded-md shadow-md ' +  containerClassName}>
            {children}
        </div>
    </Modal>
  )
}

export default CustomModal