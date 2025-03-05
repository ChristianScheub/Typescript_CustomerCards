import React, { useState } from "react";
import NavBarContainer from "./container/NavBarContainer/container-navBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Datenschutz from "./legal/datenschutz";
import Impressum from "./legal/impressum";
import useDarkMode from "./services/helper/darkModeDetector";
import "./i18n";
import "./darkModeLightMode.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCardContainer from "./container/CustomerCardContainer";
import ContainerInfo from "./container/InfoContainer";

const App: React.FC = () => {
  const theme = useDarkMode();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className={theme}>
      <div
        className="backgroundColor"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
          <BrowserRouter>
            <NavBarContainer setSearchQuery={setSearchQuery} />

            <Routes>
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/settings" element={<ContainerInfo />} />

              <Route path="/" element={<CustomerCardContainer  searchQuery={searchQuery}/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
