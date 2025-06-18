import { useState, createContext } from "react";
import { Outlet } from "react-router";

import Loader from "../../components/Loader";
import Overlay from "../../components/Overlay";
import Header from "../Header";
import Footer from "../Footer";

export const LoaderContext = createContext();

const Layout = () => {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      <Header />
      {showLoader && (
        <Overlay>
          <Loader />
        </Overlay>
      )}
      <main className="h-screen relative">
        <Outlet />
      </main>
      <Footer />
    </LoaderContext.Provider>
  );
};

export default Layout;
