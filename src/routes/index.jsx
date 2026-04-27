import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../components/layout/MainLayout";
import Ponto from "../pages/Ponto";
import Produto from "../pages/Produto";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainLayout />} />

        <Route path="/ponto" element={<Ponto />} />

        <Route path="/produto" element={<Produto/>}/>

      </Routes>
    </BrowserRouter>
  );
}