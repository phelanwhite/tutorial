import "./App.css";
import { Toaster } from "react-hot-toast";
import MainRouter from "./router/index.router";
import Header from "./layouts/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="py-5">
        <MainRouter />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
