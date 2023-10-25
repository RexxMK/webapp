import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Hjem from "./pages/Hjem";
import Lykken from "./pages/Lykken";
import Find from "./pages/Find";
import Tilfoj from "./pages/Tilfoj";
import Favoritter from "./pages/Favoritter";
import Rediger from "./pages/Rediger";
import NyDrink from "./pages/NyDrink";

function App() {
  return (
    <div className="mobilewrap">
      {/* SD */}
      <Routes>
        <Route path="/" element={<Hjem />} />
        <Route path="/lykken" element={<Lykken />} />
        <Route path="/find" element={<Find />} />
        <Route path="/tilfoj" element={<Tilfoj />} />
        <Route path="/favoritter" element={<Favoritter />} />
        <Route path="/nydrink" element={<NyDrink />} />
        <Route path="/drinks/:tilfojId" element={<Rediger />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
