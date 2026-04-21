import "./Dashboard.css";

const metricCards = [
  {
    label: "VENDAS HOJE",
    value: "R$ 265.00",
    note: "8 Vendas",
    icon: "$"
  },
  {
    label: "TRANSAÇÕES",
    value: "7",
    icon: "cart"
  },
  {
    label: "PRODUTOS",
    value: "30",
    icon: "box"
  },
  {
    label: "CLIENTES",
    value: "5",
    icon: "users"
  },
  {
    label: "RECEITA MENSAL",
    value: "R$ 16550.00"
  }
];

function MiniIcon({ type }) {
  if (type === "$") {
    return <span className="metric-icon metric-icon--money">$</span>;
  }

  if (!type) return null;

  return (
    <span className="metric-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {type === "cart" && (
          <>
            <path d="M4 5h2l2 10h9.5l2-7H7" />
            <circle cx="10" cy="19" r="1.4" />
            <circle cx="17" cy="19" r="1.4" />
          </>
        )}
        {type === "box" && (
          <>
            <path d="m5 8 7-4 7 4-7 4-7-4Z" />
            <path d="m5 8 7 4v8l-7-4V8Z" />
            <path d="m19 8-7 4v8l7-4V8Z" />
          </>
        )}
        {type === "users" && (
          <>
            <circle cx="8" cy="9" r="2.5" />
            <circle cx="16.5" cy="8.5" r="2" />
            <path d="M3 19c1-2.7 3.2-4 5.8-4s4.8 1.3 5.8 4" />
            <path d="M14 17.5c.7-1.4 1.8-2.2 3.8-2.4 1-.1 1.9 0 2.7.3" />
          </>
        )}
      </svg>
    </span>
  );
}

export default function Dashboard() {
  return (
    <main className="content-panel dashboard-panel">
      <header className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Visualize as metricas e desenvolvimento da padaria</p>
      </header>

      <section className="metrics-grid" aria-label="Indicadores principais">
        {metricCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <div>
              <span className="metric-label">{card.label}</span>
              <strong>{card.value}</strong>
              {card.note && <small>{card.note}</small>}
            </div>
            <MiniIcon type={card.icon} />
          </article>
        ))}
      </section>

      <section className="weekly-sales chart-card chart-card--wide">
        <div className="chart-title">
          <span className="chart-globe" aria-hidden="true" />
          <h2>Vendas por dia da semana</h2>
        </div>

        <svg className="line-chart" viewBox="0 0 840 190" role="img" aria-label="Linha de vendas por semana">
          <g className="chart-grid">
            <line x1="56" y1="30" x2="812" y2="30" />
            <line x1="56" y1="68" x2="812" y2="68" />
            <line x1="56" y1="106" x2="812" y2="106" />
            <line x1="56" y1="144" x2="812" y2="144" />
            <line x1="180" y1="18" x2="180" y2="155" />
            <line x1="304" y1="18" x2="304" y2="155" />
            <line x1="428" y1="18" x2="428" y2="155" />
            <line x1="552" y1="18" x2="552" y2="155" />
            <line x1="676" y1="18" x2="676" y2="155" />
          </g>
          <path className="axis" d="M56 155H830M56 155V18" />
          <polyline
            className="sales-line"
            points="56,118 180,76 304,55 428,118 552,84 676,36 812,20"
          />
          <g className="chart-labels chart-labels--y">
            <text x="18" y="33">R$500</text>
            <text x="18" y="71">R$320</text>
            <text x="18" y="109">R$250</text>
            <text x="18" y="147">R$150</text>
          </g>
          <g className="chart-labels chart-labels--x">
            <text x="46" y="182">Segunda</text>
            <text x="166" y="182">Terça</text>
            <text x="292" y="182">Quarta</text>
            <text x="420" y="182">Quinta</text>
            <text x="544" y="182">Sexta</text>
            <text x="666" y="182">Sabado</text>
            <text x="800" y="182">Domingo</text>
          </g>
        </svg>
      </section>

      <section className="dashboard-charts">
        <article className="monthly-card">
          <h2>Vendas Mensais</h2>
          <svg
            className="monthly-bar-chart"
            viewBox="0 0 700 390"
            role="img"
            aria-label="Vendas mensais em barras"
          >
            <g className="monthly-grid">
              <line x1="118" y1="70" x2="646" y2="70" />
              <line x1="118" y1="140" x2="646" y2="140" />
              <line x1="118" y1="210" x2="646" y2="210" />
              <line x1="118" y1="280" x2="646" y2="280" />
              <line x1="170" y1="45" x2="170" y2="306" />
              <line x1="290" y1="45" x2="290" y2="306" />
              <line x1="410" y1="45" x2="410" y2="306" />
              <line x1="530" y1="45" x2="530" y2="306" />
            </g>

            <g className="monthly-axis">
              <line x1="118" y1="45" x2="118" y2="318" />
              <line x1="72" y1="306" x2="646" y2="306" />
            </g>

            <g className="monthly-y-labels">
              <text x="78" y="70">10000</text>
              <text x="78" y="140">8000</text>
              <text x="78" y="210">5000</text>
              <text x="78" y="280">3000</text>
              <text x="78" y="306">0</text>
            </g>

            <g className="monthly-bars">
              <rect x="154" y="118" width="42" height="188" />
              <rect x="274" y="70" width="42" height="236" />
              <rect x="394" y="176" width="42" height="130" />
              <rect x="514" y="92" width="42" height="214" />
            </g>

            <g className="monthly-x-labels">
              <text x="175" y="356">JAN</text>
              <text x="295" y="356">FEV</text>
              <text x="415" y="356">MAR</text>
              <text x="535" y="356">ABR</text>
            </g>
          </svg>
        </article>

        <article className="category-card">
          <h2>Vendas por Categoria</h2>
          <svg
            className="category-pie-chart"
            viewBox="0 0 560 390"
            role="img"
            aria-label="Vendas por categoria"
          >
            <circle className="pie-fill" cx="282" cy="202" r="128" />
            <line className="pie-slice-line" x1="282" y1="74" x2="282" y2="202" />
            <line className="pie-slice-line" x1="154" y1="202" x2="410" y2="202" />
            <line className="pie-slice-line" x1="282" y1="202" x2="226" y2="318" />

            <g className="pie-leaders">
              <line x1="210" y1="145" x2="94" y2="62" />
              <line x1="344" y1="145" x2="442" y2="48" />
              <line x1="210" y1="250" x2="88" y2="340" />
              <line x1="330" y1="250" x2="454" y2="354" />
            </g>

            <g className="pie-values">
              <text x="72" y="54">25</text>
              <text x="460" y="44">20</text>
              <text x="44" y="360">15</text>
              <text x="468" y="376">40</text>
            </g>

            <g className="pie-labels">
              <text x="226" y="166">Bebidas</text>
              <text x="332" y="166">Bolos</text>
              <text x="214" y="248">Salgados</text>
              <text x="338" y="252">Paes</text>
            </g>
          </svg>
        </article>
      </section>
    </main>
  );
}
