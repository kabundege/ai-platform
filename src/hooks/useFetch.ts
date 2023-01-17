import { useState } from 'react'
import { toast } from 'react-toastify'

interface FetchProps { initialLoading?:boolean,showPopUp?:boolean } 

const useFetch = (props?:FetchProps) => {
    const [ error,setError ]  = useState<string>()
    const [ success,setSuccess ]  = useState(false)
    const [ status,setStatus ]  = useState<string>()
    const [isLoading, setLoader] = useState(props?.initialLoading === undefined ? false : props.initialLoading);
    // show video
    const ShowPopUp = props?.showPopUp === undefined ? true : props.showPopUp

    const clearError = () => {
        if(error)
        setError('')
    }

    const load = async <T>(aPromise:Promise<T | any>) => {
        setLoader(true)
        clearError()
        return aPromise
        .then(res => {
            if(res.status === 200 || res.status === 201 ){
                setSuccess(res)
            }else{
                throw res
            }
            return res
        })
        .catch(er => {
            setStatus(er.status);
            if (er.error) {
                if(ShowPopUp){
                    toast.error(er.error);
                    setError(er.error);
                }
                throw new Error(er.error)
            } else {
                if(ShowPopUp){
                    toast.error(er.message);
                    setError(er.message);
                }
                throw new Error(er.message)
            }
        })
        .finally(() => setLoader(false))
    }


    return { isLoading,load, error, status, setLoader, clearError, setError, success, setSuccess } as const
}

export default useFetch
