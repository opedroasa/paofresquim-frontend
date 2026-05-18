import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import Caixa from "../../pages/Caixa"; 
import Cliente from "../../pages/Cliente";
import Ponto from "../../pages/Ponto";
import Funcionario from "../../pages/Funcionario";
import Produto from "../../pages/Produto";
import Relatorio from "../../pages/Relatorio";
import Camera from "../../pages/Camera";
import Chatbot from "../../pages/Chatbot";

export default function MainLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  console.log("PAGINA ATIVA:", activePage);

  const pages = {
    dashboard: <Dashboard />,
    caixa: <Caixa />,
    cliente: <Cliente />,
    ponto: <Ponto />,
    produto: <Produto />,
    funcionario: <Funcionario />,
    relatorio: <Relatorio />,
    camera: <Camera />,
    chatbot: <Chatbot />
  };

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" />

      <div className="dashboard-frame">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {}
        <div className="content-area">
          {pages[activePage]}
        </div>
        
      </div>
    </div>
  );
}