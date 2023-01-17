import { FC, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context";


const PublicRoute:FC<{ children:ReactNode }> = ({ children }) => {
  const { user,token,isAuth } = useContext(StoreContext)


  const one = (user||token||isAuth)

  if(localStorage.getItem('token')||one){
    return <Navigate to="/dashboard" />
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default PublicRoute;
