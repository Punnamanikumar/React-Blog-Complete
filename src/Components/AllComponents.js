import React from "react";
import Header from "./others/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import PageNotFound from "./others/PageNotFound";
import ViewData from "./viewdata/ViewData";
import AboutUs from "./about/AboutUs";
import ViewCategory from "./viewdata/ViewCategory";

const AllComponents = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:category" element={<ViewCategory />} />
          <Route path="/:category/:id" element={<ViewData />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AllComponents;
