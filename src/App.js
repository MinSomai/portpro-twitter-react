import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import useGlobalState from "./store/store";
import Routes from "./Routes";
import { getMe, logout } from "./services/authService";
import "./App.css";

function App() {
  const state = useGlobalState();
  // const getState = state.getUser;
  const isLoggedIn = state.getLoggedIn;
  const navigate = useNavigate();

  const handleGoToCompleteSignup = () => {
    navigate("/signup-complete");
  };

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await getMe();
        if (data) {
          state.updateUser(data);
          state.updateLoggedIn(true);
        }
        if (!data) {
          const isLoggedIn = localStorage.getItem("isLoggedIn");
          const user = localStorage.getItem("user");

          if (isLoggedIn && user) {
            if (isLoggedIn === "true") {
              state.updateLoggedIn(true);
            }
            state.updateUser(JSON.parse(user));
          }
        }

        if (data && !data?.isSignupComplete) {
          handleGoToCompleteSignup();
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    getData();
  }, []);

  const onLogout = async () => {
    const { data } = await logout();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    state.clearUser();
    state.updateLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="App">
      <div className="container mx-auto">
        <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
          <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
            <div
              className="collapse navbar-collapse flex flex-grow items-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav flex pl-0 list-style-none mr-auto">
                <li className="nav-item p-2">
                  <Link
                    className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                    to="/"
                  >
                    {isLoggedIn}
                    Home
                  </Link>
                </li>
                <li className="nav-item p-2">
                  <Link
                    className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>

              {!isLoggedIn && (
                <ul className="navbar-nav flex pl-0 list-style-none ml-auto">
                  <li className="nav-item p-2">
                    <Link
                      className="nav-link inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              )}

              {isLoggedIn && (
                <ul className="navbar-nav flex pl-0 list-style-none ml-auto">
                  <li className="nav-item p-2 flex items-center">
                    <button
                      onClick={onLogout}
                      className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
        <main className="py-5">
          <Routes />
        </main>
      </div>
    </div>
  );
}

export default App;
