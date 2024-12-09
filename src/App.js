import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Users";
import Roles from "./pages/Roles";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <Router>
      <div className="flex">
        <div className="flex-1 min-h-screen">
          <Header />
          <ToastContainer />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
