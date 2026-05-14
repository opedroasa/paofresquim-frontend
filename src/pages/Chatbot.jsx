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
          src="https://app.powerbi.com/reportEmbed?reportId=153aa935-c47d-4e49-88fa-3bbbe9ecd7fd&autoAuth=true"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </main>
  );
}