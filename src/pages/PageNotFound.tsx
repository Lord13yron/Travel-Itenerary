import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-2">
        The page you are looking for does not exist.
      </p>
      <Button onClick={() => navigate("/home")} type="primary">
        Return Home
      </Button>
    </div>
  );
}
