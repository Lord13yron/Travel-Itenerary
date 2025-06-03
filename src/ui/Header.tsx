import { useNavigate } from "react-router-dom";
import { usePlanningContext } from "../store/planning-context";
import Button from "./Button";

import { useAuthContext } from "../store/Auth-context";

export default function Header() {
  const { setIsPlanning } = usePlanningContext();
  // const { user, isAuthenticated } = useUser();
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  // const { logout } = useLogout();

  return (
    <header className="flex items-center justify-between p-3 ">
      <img
        onClick={() => navigate("/")}
        className="w-26 h-16 hover:cursor-pointer "
        src="/Logo2.jpeg"
        alt="L13 travel logo"
      />
      <div className="flex gap-4">
        <Button
          onClick={
            isAuthenticated
              ? () => setIsPlanning(true)
              : () => navigate("/login")
          }
          type="transparent"
        >
          Plan a Trip
        </Button>
        {!user ? (
          <Button onClick={() => navigate("/login")} type="primary">
            Log in
          </Button>
        ) : (
          <Button onClick={logout} type="primary">
            Log out
          </Button>
        )}
      </div>
    </header>
  );
}
