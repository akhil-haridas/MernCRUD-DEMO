import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ListingPage from "../pages/ListingPage";

const userRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/customers" exact element={<ListingPage />} />
    </Routes>
  );
};

export default userRoutes;
