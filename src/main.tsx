import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import "./main.css";
import { Provider } from "react-redux";
import { store } from "store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>

  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
