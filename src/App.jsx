import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Driver from "./pages/driver/Driver";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center" sx={{border: '2px solid green'}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
