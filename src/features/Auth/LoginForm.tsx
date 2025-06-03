import { useState } from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/Auth-context";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login, isPending } = useLogin();
  const { login } = useAuthContext();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-4 bg-sky-100 p-4 rounded shadow-md border border-sky-200">
        <h1 className="text-lg font-bold text-center mb-4">
          Log in to your account
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="bg-white border border-black p-2 rounded"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-white border border-black p-2 rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="primary">Log in</Button>
        </form>
        <p>
          Dont have an account?{" "}
          <Link
            className="text-sky-600 underline hover:text-sky-800"
            to="/signup"
          >
            Signup here!
          </Link>
        </p>
      </div>
    </div>
  );
}
