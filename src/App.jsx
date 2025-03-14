import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OwnerForm from "./components/OwnerForm";
import OwnerSearch from "./components/OwnerSearch";
import OwnersList from "./components/OwnersList";
import OwnerDetails from "./components/OwnerDetails";
import VetsList from "./components/VetsList";
import Home from "./components/Home";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owners/new" element={<OwnerForm />} />
        <Route path="/owners" element={<OwnerSearch />} />
        <Route path="/owners/list" element={<OwnersList />} />
        <Route path="/owners/:id" element={<OwnerDetails />} />
        <Route path="/vets" element={<VetsList/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;