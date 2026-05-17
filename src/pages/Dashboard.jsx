import {
  useEffect,
  useState
} from "react";

import api
from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import "./Dashboard.css";

function formatCurrency(value) {

  return Number(value || 0)
    .toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );
}

export default function Dashboard() {

  const [
    dashboard,

    setDashboard

  ] = useState(null);

  const [
    loading,

    setLoading

  ] = useState(true);

  useEffect(() => {

    carregarDashboard();

  }, []);

  async function carregarDashboard() {

    try {

      const response =
        await api.get(
          "/dashboard"
        );

      setDashboard(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <div className="
content-panel
      ">

        <h2>
          Carregando dashboard...
        </h2>

      </div>
    );
  }

  return (

    <div className="
content-panel
    ">

      <div className="
dashboard-title
      ">

        <h1>
          Dashboard
        </h1>

        <p>
          Visão geral da padaria
        </p>

      </div>

      <div className="
metrics-grid
      ">

        <div className="
metric-card
        ">

          <span className="
metric-label
          ">
            VENDAS HOJE
          </span>

          <strong>
            {
              formatCurrency(
                dashboard
                  ?.valorVendasHoje
              )
            }
          </strong>

          <small>
            Total vendido hoje
          </small>

        </div>

        <div className="
metric-card
        ">

          <span className="
metric-label
          ">
            QUANTIDADE VENDAS
          </span>

          <strong>
            {
              dashboard
                ?.quantidadeVendasHoje
            }
          </strong>

          <small>
            vendas realizadas
          </small>

        </div>

        <div className="
metric-card
        ">

          <span className="
metric-label
          ">
            FIADOS QUITADOS
          </span>

          <strong>
            {
              dashboard
                ?.fiadosQuitadosHoje
            }
          </strong>

          <small>
            pagamentos realizados
          </small>

        </div>

        <div className="
metric-card
        ">

          <span className="
metric-label
          ">
            PRODUTOS VENDIDOS
          </span>

          <strong>
            {
              dashboard
                ?.produtosVendidosHoje
            }
          </strong>

          <small>
            itens vendidos hoje
          </small>

        </div>

        <div className="
metric-card
        ">

          <span className="
metric-label
          ">
            RECEITA MENSAL
          </span>

          <strong>
            {
              formatCurrency(
                dashboard
                  ?.receitaMensal
              )
            }
          </strong>

          <small>
            faturamento do mês
          </small>

        </div>

      </div>

      <div className="
dashboard-charts
      ">

        <div className="
chart-card
        ">

          <div className="
chart-title
          ">

            <h2>
              Vendas últimos 7 dias
            </h2>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={
                dashboard
                  ?.vendasUltimosDias || []
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="dia"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#ff9900"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="
chart-card
        ">

          <div className="
chart-title
          ">

            <h2>
              Produtos mais vendidos
            </h2>

          </div>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={
                dashboard
                  ?.produtosMaisVendidos || []
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="nome"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="quantidade"
                fill="#ff9900"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div
        className="
chart-card
        "
        style={{
          marginTop: 30
        }}
      >

        <div className="
chart-title
        ">

          <h2>
            Distribuição produtos vendidos
          </h2>

        </div>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie

              data={
                dashboard
                  ?.produtosMaisVendidos || []
              }

              dataKey="quantidade"

              nameKey="nome"

              cx="50%"

              cy="50%"

              outerRadius={120}

              label

            >

              {
                (
                  dashboard
                    ?.produtosMaisVendidos || []
                ).map(
                  (_, index) => (

                    <Cell
                      key={index}
                      fill={
                        [
                          "#ff9900",
                          "#4CAF50",
                          "#2196F3",
                          "#9C27B0",
                          "#F44336",
                          "#795548"
                        ][index % 6]
                      }
                    />
                  )
                )
              }

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}