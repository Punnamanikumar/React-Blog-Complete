import React from "react";
import Header from "./others/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tollywood from "./tollywood/Tollywood.js";
import Home from "./home/Home";
import Technology from "./technology/Technology";
import Jobs from "./jobs/Jobs";
import Nature from "./nature/Nature";
import Food from "./food/Food";
import PageNotFound from "./others/PageNotFound";
import ViewData from "./others/ViewData";

const AllComponents = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tollywood" element={<Tollywood />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/nature" element={<Nature />} />
          <Route path="/about" element={<Food />} />
          <Route path="/tollywood/:id" element={<ViewData />} />
          <Route path="/technology/:id" element={<ViewData />} />
          <Route path="/jobs/:id" element={<ViewData />} />
          <Route path="/nature/:id" element={<ViewData />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AllComponents;
