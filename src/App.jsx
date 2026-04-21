import "./App.css";
import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="page-shell">
      <div className="bakery-backdrop" aria-hidden="true" />

      <div className="dashboard-frame">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        {activePage === "dashboard" ? <Dashboard /> : <Customers />}
      </div>
    </div>
  );
}

export default App;
