import { createContext, FC, ReactNode, useEffect, useState} from 'react';

type ContextState = {
    token?: string,
    isLoading: boolean,
    isAuth: boolean
}

interface Props { 
    children?:ReactNode,
}

type handleContext = <T extends keyof ContextState,Y extends ContextState[T]>(key: T,value: Y) => void

interface ContextProps extends ContextState {
    handleContext: handleContext,
    setContext: React.Dispatch<React.SetStateAction<ContextState>>
}

const initialState:ContextProps = {
    isLoading:false,
    isAuth: false,
    setContext: () => {},
    handleContext: () => {},
}

const StoreContext = createContext<ContextProps>(initialState);

const StoreProvider:FC<Props> = ({ children }) =>{
    const [ state,setState ] = useState<ContextState>(initialState)

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            handleContext('token',token)
        }
    },[])
      
    const handleContext:handleContext = (key,value) => {
        setState(
            (prev:ContextState) =>
            ({ ...prev,[key] : value })
        )
    }

    return(
        <StoreContext.Provider 
                value = {{
                    ...state,
                    handleContext,
                    setContext: setState,
                }}
            >
            {children}
        </StoreContext.Provider>
    )
} 

export { StoreContext,StoreProvider }
