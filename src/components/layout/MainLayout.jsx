import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import Caixa from "../../pages/Caixa"; 
import Cliente from "../../pages/Cliente";
import Ponto from "../../pages/Ponto";
import Funcionario from "../../pages/Funcionario";

export default function MainLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    caixa: <Caixa />,
    cliente: <Cliente />,
    ponto: <Ponto />,
    produto: <div style={{ padding: 40 }}>Página de Produtos em construção...</div>,
    funcionario: <Funcionario />,
    relatorio: <div style={{ padding: 40 }}>Página de Relatórios em construção...</div>
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