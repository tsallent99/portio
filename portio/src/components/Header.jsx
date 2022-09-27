import IconButton from "./IconButton";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

function Header({
  view,
  name,
  onProfileClick,
  onProfileCloseClick,
  properties,
}) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <header className="header">
      <IconButton text={"reply"} onClick={goBack} />
      <h1>{name}</h1>
      <IconButton text={"notifications"} />
      {view === "account_circle" && (
        <IconButton text={view} onClick={onProfileClick} />
      )}
      {view === "close" && (
        <IconButton text="close" onClick={onProfileCloseClick} />
      )}
    </header>
  );
}
export default Header;
