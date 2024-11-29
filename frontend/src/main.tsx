import { Provider } from "@/components/ui/provider";
import { render } from "preact";
// import "./index.css";
import App from "./app.tsx";
import Header from "./components/common/Header.tsx";

render(
  <Provider>
    <Header />
    <App />
  </Provider>,
  document.getElementById("app")!
);
