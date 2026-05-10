import RoutesApp from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RoutesApp />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff7ea",
            color: "#3b2a1a",
            border: "1px solid #f0d2a0",
          },
        }}
      />
    </>
  );
}

export default App;