import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OwnerForm from "./components/OwnerForm";
import OwnerSearch from "./components/OwnerSearch";
import OwnersList from "./components/OwnersList";
import OwnerDetails from "./components/OwnerDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/owners/new" element={<OwnerForm />} />
        <Route path="/owners" element={<OwnerSearch />} />
        <Route path="/owners/list" element={<OwnersList />} />
        <Route path="/owners/:id" element={<OwnerDetails />} />
        {/* 필요에 따라 다른 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
