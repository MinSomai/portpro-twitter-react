import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import SignupComplete from "../pages/SignupComplete";

const mainRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    // route to complete signup after redirection from twitter
    path: "/signup-complete",
    element: <SignupComplete />,
  },
  {
    path: "dashboard",
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
];

export default mainRoutes;
