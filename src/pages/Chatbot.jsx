import "./Chatbot.css";

export default function Chatbot() {
  return (
    <main className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Dashboard da AliceBOT</h1>
        <p>Métricas BI - Padaria PãoFresquim</p>
      </div>

      <div className="iframe-wrapper">
        <iframe
          title="Dashboard PãoFresquim"
          src="https://app.powerbi.com/reportEmbed?reportId=5e08f0eb-d30f-4fe5-b904-8ae389cc2dd9&autoAuth=true"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </main>
  );
}