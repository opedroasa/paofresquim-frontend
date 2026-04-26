import "./Dashboard.css";

// Mocks dos indicadores
const metricCards = [
  { label: "VENDAS HOJE", value: "R$ 265.00", note: "↑ 8 Vendas", icon: "$" },
  { label: "TRANSAÇÕES", value: "7", icon: "cart" },
  { label: "PRODUTOS", value: "30", icon: "box" },
  { label: "CLIENTES", value: "5", icon: "users" },
  { label: "RECEITA MENSAL", value: "R$ 16550.00" }
];

// Componente para renderizar os ícones
function MiniIcon({ type }) {
  if (type === "$") return <span className="metric-icon metric-icon--money">$</span>;
  if (!type) return null;

  return (
    <span className={`metric-icon metric-icon--${type}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {type === "cart" && (
          <><path d="M4 5h2l2 10h9.5l2-7H7" /><circle cx="10" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></>
        )}
        {type === "box" && (
          <><path d="m5 8 7-4 7 4-7 4-7-4Z" /><path d="m5 8 7 4v8l-7-4V8Z" /><path d="m19 8-7 4v8l7-4V8Z" /></>
        )}
        {type === "users" && (
          <><circle cx="8" cy="9" r="2.5" /><circle cx="16.5" cy="8.5" r="2" /><path d="M3 19c1-2.7 3.2-4 5.8-4s4.8 1.3 5.8 4" /><path d="M14 17.5c.7-1.4 1.8-2.2 3.8-2.4 1-.1 1.9 0 2.7.3" /></>
        )}
      </svg>
    </span>
  );
}

export default function Dashboard() {
  return (
    <main className="content-panel">
      
      {/* Cabeçalho */}
      <header className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Visualize as métricas e desenvolvimento da padaria</p>
      </header>

      {/* Cards de Indicadores */}
      <section className="metrics-grid">
        {metricCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <span className="metric-label">{card.label}</span>
            <strong>{card.value}</strong>
            {card.note && <small>{card.note}</small>}
            <MiniIcon type={card.icon} />
          </article>
        ))}
      </section>

      {/* Gráfico Superior (Linha) */}
      <section className="chart-card chart-card--wide">
        <div className="chart-title">
          <h2>Vendas por dia da semana</h2>
        </div>
        {/* SVG Mockado mantido do original */}
        <svg className="line-chart" viewBox="0 0 840 190">
          <g className="chart-grid">
            <line x1="56" y1="30" x2="812" y2="30" stroke="#ccc" />
            <line x1="56" y1="68" x2="812" y2="68" stroke="#ccc" />
            <line x1="56" y1="106" x2="812" y2="106" stroke="#ccc" />
            <line x1="56" y1="144" x2="812" y2="144" stroke="#ccc" />
          </g>
          <path fill="none" stroke="#333" strokeWidth="2" d="M56 155H830M56 155V18" />
          <polyline fill="none" stroke="#333" strokeWidth="2" points="56,118 180,76 304,55 428,118 552,84 676,36 812,20" />
          <g fontSize="10" fill="#666">
            <text x="18" y="33">R$500</text><text x="18" y="71">R$320</text><text x="18" y="109">R$250</text><text x="18" y="147">R$150</text>
            <text x="46" y="182">Segunda</text><text x="166" y="182">Terça</text><text x="292" y="182">Quarta</text><text x="420" y="182">Quinta</text><text x="544" y="182">Sexta</text><text x="666" y="182">Sabado</text><text x="800" y="182">Domingo</text>
          </g>
        </svg>
      </section>

      {/* Gráficos Inferiores (Barras e Pizza) */}
      <section className="dashboard-charts">
        <article className="chart-card monthly-card">
          <h2>Vendas Mensais</h2>
          {/* SVG Mockado mantido do original */}
          <svg className="monthly-bar-chart" viewBox="0 0 700 390">
             <path fill="none" stroke="#333" strokeWidth="2" d="M118 306H646M118 45V306" />
             <g fill="#00FF00">
                <rect x="154" y="118" width="42" height="188" />
                <rect x="274" y="70" width="42" height="236" />
                <rect x="394" y="176" width="42" height="130" />
                <rect x="514" y="92" width="42" height="214" />
             </g>
             <g fontSize="18" fill="#333">
                <text x="175" y="356">JAN</text><text x="295" y="356">FEV</text><text x="415" y="356">MAR</text><text x="535" y="356">ABR</text>
             </g>
          </svg>
        </article>

        <article className="chart-card category-card">
          <h2>Vendas por Categoria</h2>
          {/* SVG Mockado mantido do original */}
          <svg className="category-pie-chart" viewBox="0 0 560 390">
             <circle fill="#ccc" stroke="#333" strokeWidth="2" cx="282" cy="202" r="128" />
             <line stroke="#333" strokeWidth="2" x1="282" y1="74" x2="282" y2="202" />
             <line stroke="#333" strokeWidth="2" x1="154" y1="202" x2="410" y2="202" />
             <line stroke="#333" strokeWidth="2" x1="282" y1="202" x2="226" y2="318" />
             <g fontSize="16" fill="#000" fontWeight="bold">
                <text x="226" y="166">Bebidas</text><text x="332" y="166">Bolos</text><text x="214" y="248">Salgados</text><text x="338" y="252">Paes</text>
             </g>
          </svg>
        </article>
      </section>

    </main>
  );
}