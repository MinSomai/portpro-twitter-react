import { useNavigate } from "react-router";

export default function Product() {
  const navigate = useNavigate();

  function handleGoToHome() {
    navigate("/");
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleGoForward() {
    navigate(1);
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Only logged in user can access</p>
      <div className="actions">
        <button onClick={handleGoBack}>GoBack</button>
        <button onClick={handleGoForward}>Go Forward</button>
        <button onClick={handleGoToHome}>Go Home</button>
      </div>
    </div>
  );
}
