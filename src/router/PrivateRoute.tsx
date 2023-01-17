import React, { FC, Fragment, ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context";


const PrivateRoute:FC<{ children:ReactNode }> = ({ children }) => {
  const { user,token,isAuth } = useContext(StoreContext)

  const one = (user||token||isAuth)

  if(!localStorage.getItem('token') && !one){
    return (
      <Navigate replace to="/login" />
    )
  }
 
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

export default PrivateRoute;
