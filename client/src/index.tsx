import ReactDOM from "react-dom/client";
import { App } from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const root: HTMLElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
