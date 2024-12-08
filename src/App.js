import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1 min-h-screen">
          <Header /> 
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/permissions" element={<Permissions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
