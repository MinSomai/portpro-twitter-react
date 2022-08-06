import { Link } from "react-router-dom";
import useGlobalState from "../store/store";

export default function Dashboard() {
  const state = useGlobalState();
  const getState = state.getUser;
  console.log(getState);
  const isLoggedIn = state.getLoggedIn;
  return (
    <div>
      {!isLoggedIn && <p>Please log in to view content of this page.</p>}
      {!getState?.user?.isSignupComplete && (
        <p className="pb-4">
          <small>Note: please complete your signup process. </small>
          <Link to="/signup-complete"> Click here</Link>
        </p>
      )}
      {isLoggedIn && (
        <div>
          <p>Only logged in user can access this page.</p>
          <p className="mt-4">
            <strong>Successfully logged in</strong>
          </p>
        </div>
      )}
    </div>
  );
}
