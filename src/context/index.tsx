import { createContext, FC, ReactNode, useEffect, useState} from 'react';

export type User = {
    name:string,
    isAdmin:boolean,
    firstName: string,
    lastName: string,
    phone: string
}

type ContextState = {
    user?: User, 
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
    logout: () => void,
    setContext: React.Dispatch<React.SetStateAction<ContextState>>
}

const initialState:ContextProps = {
    isLoading:false,
    isAuth: false,
    logout: () => {},
    setContext: () => {},
    handleContext: () => {},
}

const StoreContext = createContext<ContextProps>(initialState);

const StoreProvider:FC<Props> = ({ children }) =>{
    const [ state,setState ] = useState<ContextState>(initialState)

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if(token&&user){
            setState(prev => ({
                ...prev, token, user: JSON.parse(user), isAuth:true
            }))
        }
    },[])
      
    const handleContext:handleContext = (key,value) => {
        setState(
            (prev:ContextState) =>
            ({ ...prev,[key] : value })
        )
    }

    const logout  = () => {
        Promise.resolve([
            localStorage.removeItem('token'),
            localStorage.removeItem('user')
        ])
        .then(()=>{setState(initialState)})
    }

    return(
        <StoreContext.Provider 
                value = {{
                    ...state,
                    logout,
                    handleContext,
                    setContext: setState,
                }}
            >
            {children}
        </StoreContext.Provider>
    )
} 

export { StoreContext,StoreProvider }
