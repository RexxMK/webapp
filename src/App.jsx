import { useState } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import "./App.css";
import Navigation from "./components/Navigation";
import Hjem from "./pages/Hjem";
import Lykken from "./pages/Lykken";
import Find from "./pages/Find";
import Tilfoj from "./pages/Tilfoj";
import Favoritter from "./pages/Favoritter";
import LightMode from "./components/LightMode";

function App() {
  return (
    <>
      <LightMode />
    <div className="mobilewrap">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Hjem/>}/>
        <Route path="/lykken" element={<Lykken/>}/>
        <Route path="/find" element={<Find/>}/>
        <Route path="/tilfoj" element={<Tilfoj/>}/>
        <Route path="/favoritter" element={<Favoritter/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
}

export default App;
