import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/Dashboard";
import Cashier from "../../pages/Cashier";
import Customers from "../../pages/Customers";

const pages = {
  dashboard: <Dashboard />,
  cashier: <Cashier />,
  customers: <Customers />
};

export default function MainLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" />

      <div className="dashboard-frame">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {pages[activePage]}
      </div>
    </div>
  );
}