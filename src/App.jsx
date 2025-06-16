import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Homepage from "./views/Homepage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
