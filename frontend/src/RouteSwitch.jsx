import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Stories from "./views/Stories";
import Story from "./views/Story";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<Story />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
