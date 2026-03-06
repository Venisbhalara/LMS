import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import LenisProvider from "./components/LenisProvider/LenisProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LenisProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LenisProvider>
  </React.StrictMode>,
);
