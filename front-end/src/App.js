import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/userRoutes";
import Spinner from "./components/Fallback/Spinner";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
