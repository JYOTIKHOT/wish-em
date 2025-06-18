import { Route, Routes } from "react-router";

import Layout from "./components/Layout";
import Homepage from "./views/Homepage";
import GiftCard from "./views/GiftCard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/giftcard" element={<GiftCard />} />
      </Route>
    </Routes>
  );
}

export default App;
