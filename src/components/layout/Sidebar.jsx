import React from "react";

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h2>PãoFresh</h2>
    </div>

    <ul className="sidebar-menu">
      <li className="menu-item">
        <a href="#">Painel de Clientes</a>
      </li>

      <li className="menu-item">
        <a href="#">Produtos</a>
      </li>

      <li className="menu-item">
        <a href="#">Relatórios</a>
      </li>
    </ul>
  </div>
);

export default Sidebar;