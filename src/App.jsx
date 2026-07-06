import "./App.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <div className="wrapper ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
