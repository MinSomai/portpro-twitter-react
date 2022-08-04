import { Link /*  useRoutes */ } from "react-router-dom";
import "./App.css";

// import routes from "./routes";
import Routes from "./Routes";

function App() {
  // const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <div className="container mx-auto">
        <header>
          <strong>PortPro Twitter OAuth</strong>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes />
        </main>
      </div>
    </div>
  );
}

export default App;
