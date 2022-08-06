import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupComplete from "./pages/SignupComplete";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signup-complete" element={<SignupComplete />} />
      <Route path="dashboard">
        <Route index element={<Dashboard />} />
      </Route>
    </BaseRoutes>
  );
}
