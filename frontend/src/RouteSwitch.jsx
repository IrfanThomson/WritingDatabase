import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Stories from "./views/Stories";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
