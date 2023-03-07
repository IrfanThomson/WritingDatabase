import React from "react";
import GlobalNavbar from "./components/GlobalNavbar/GlobalNavbar";
import RouteSwitch from "./RouteSwitch";

const App = () => {
  return (
    <div>
      <GlobalNavbar />
      <RouteSwitch />
    </div>
  );
};

export default App;
