import useGlobalState from "../store/store";

export default function Dashboard() {
  const state = useGlobalState();
  const getState = state.getUser;
  const isLoggedIn = state.getLoggedIn;
  return (
    <div>
      {!isLoggedIn && <p>Please log in to view content of this page.</p>}
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
