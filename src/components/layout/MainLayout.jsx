import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import Caixa from "../../pages/Caixa"; 
import Cliente from "../../pages/Cliente";
import Ponto from "../../pages/Ponto";
import Funcionario from "../../pages/Funcionario";
import Produto from "../../pages/Produto";
import Relatorio from "../../pages/Relatorio";

export default function MainLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    caixa: <Caixa />,
    cliente: <Cliente />,
    ponto: <Ponto />,
    produto: <Produto />,
    funcionario: <Funcionario />,
    relatorio: <Relatorio />,
  };

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" />

      <div className="dashboard-frame">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {}
        {pages[activePage]}
      </div>
    </div>
  );
}