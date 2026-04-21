import "./App.css";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Cashier from "./pages/Cashier";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";

const pages = {
  dashboard: <Dashboard />,
  cashier: <Cashier />,
  customers: <Customers />
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" aria-hidden="true" />

      <div className="dashboard-frame">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {pages[activePage] ?? pages.dashboard}
      </div>
    </div>
  );
}

export default App;
