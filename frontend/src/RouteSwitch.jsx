import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Stories from "./views/Stories";
import Story from "./views/Story";
import Search from "./views/Search"

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<Story />} />
        <Route path="/search/:query" element={<Search />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
