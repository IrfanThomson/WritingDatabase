import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Stories from "./views/Stories";
import Story from "./views/Story";
import Search from "./views/Search";
import Notes from "./views/Notes";
import Note from "./views/Note";
import Reference from "./views/Reference";
import References from "./views/References";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Stories />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<Story />} />
      </Routes>
    </BrowserRouter>
  );
};

/* Work in progress
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<Story />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<Note />} />
        <Route path="/references" element={<References />} />
        <Route path="/references/:id" element={<Reference />} />
        <Route path="/search/:query" element={<Search />} /> 
*/

export default RouteSwitch;
