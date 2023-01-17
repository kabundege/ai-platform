import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Contacts from "./pages/contacts/page";
import Dashboard from "./pages/dashboard/page";
import Farms from "./pages/farms/page";
import Landing from "./pages/landing/page";
import SIGNIN from "./pages/login/page";
import Register from "./pages/register/page";
import Services from "./pages/service/page";

import { AnimatePresence } from "framer-motion";
import Forgot from "./pages/forgot/page";
import PrivateRoute from "./router/PrivateRoute";
import NotFound from "./pages/NotFound";
import Header from "./Components/Header";

function App() {
  const location = useLocation();
  return (
    <div className="w-screen h-screen">
      <Header/>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
        exitBeforeEnter
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/service"
            element={
              <PrivateRoute>
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/farms"
            element={
              <PrivateRoute>
                <Farms />
              </PrivateRoute>
            }
          />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/login" element={<SIGNIN />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}

export default App;
