/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./styles/tailwind.css";

// ReactDOM.render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
