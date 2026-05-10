import "./Camera.css";

import video1 from "../assets/videos/paofresquimvideo1.mp4";
import video2 from "../assets/videos/paofresquimvideo2.mp4";
import video3 from "../assets/videos/paofresquimvideo3.mp4";
import video4 from "../assets/videos/paofresquimvideo4.mp4";

const cameras = [
  {
    id: 1,
    nome: "Área Principal",
    video: video1,
  },
  {
    id: 2,
    nome: "Área Externa",
    video: video2,
  },
  {
    id: 3,
    nome: "Cozinha",
    video: video3,
  },
  {
    id: 4,
    nome: "Estacionamento",
    video: video4,
  },
];

export default function Camera() {
  return (
    <main className="content-panel camera-container">
      <div className="camera-header">
        <h1>Monitoramento</h1>
        <p>Câmeras em tempo real da padaria</p>
      </div>

      <div className="camera-grid">
        {cameras.map((camera) => (
          <div className="camera-card" key={camera.id}>
            <div className="camera-title">
              <span className="camera-status"></span>
              <h3>{camera.nome}</h3>
            </div>

            <video
              src={camera.video}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ))}
      </div>
    </main>
  );
}