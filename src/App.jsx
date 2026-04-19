import React from "react";
import Sidebar from "./components/layout/Sidebar";
import CustomerTable from "./components/customers/CustomerTable";
import "./index.css";

function App() {
  const customers = [];

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <h1>Clientes</h1>

        <CustomerTable customers={customers} />
      </div>
    </div>
  );
}

export default App;