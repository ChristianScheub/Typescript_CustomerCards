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
import ScannerSelector from "./views/NewCustomerCard/ScannerSelectorView";
import NewCardContainer from "./container/NewCardContainer";
import ContainerInfo from "./container/InfoContainer";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const theme = useDarkMode();
  console.log(searchQuery);

  return (
    <div className={theme}>
      <div
        className="App backgroundColor"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
          <BrowserRouter>
            <NavBarContainer setSearchQuery={setSearchQuery} />

            <Routes>
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="newCard" element={<NewCardContainer />} />
              <Route path="/settings" element={<ContainerInfo />} />

              <Route path="/" element={<CustomerCardContainer />} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
