import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard"
import InsertData from "./components/InsertData"
const App = () => {
  return(
    <div>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Dashboard/>}/>
                  <Route path="/insertData" element={<InsertData/>}/>
              </Routes>
    </div>
  )
};

export default App;
