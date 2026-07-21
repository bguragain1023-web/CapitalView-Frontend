import "./App.css";

import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import { Auth } from "./components/auth/Auth";
import { useEffect } from "react";
import { autoLoggedIn } from "./utils/users";
import { useUser } from "./contex/UserContex";

function App() {
  const { user, setUser } = useUser();
  const updateUser = async () => {
    const users = await autoLoggedIn();
    setUser(users);
  };

  useEffect(() => {
    !user?._id && updateUser();
  }, [user?._id]);

  return (
    <div className="wrapper ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="dashboard"
            element={
              <Auth>
                <Dashboard />
              </Auth>
            }
          />
          <Route
            path="transaction"
            element={
              <Auth>
                <Transaction />
              </Auth>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
