import { useState } from "react";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/Auth-context";
import Modal from "../../ui/Modal";
import ForgotPassword from "./ForgotPassWord";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const [isResetOpen, setIsResetOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded shadow-md border border-slate-200">
        <h1 className="text-lg font-bold text-center mb-4">
          Log in to your account
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="bg-slate-100 border border-slate-300 p-2 rounded"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-slate-100 border border-slate-300 p-2 rounded"
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
        <p className="text-center">
          Forgot password?{" "}
          <span
            onClick={() => setIsResetOpen(true)}
            className="text-sky-600 underline hover:text-sky-800 hover:cursor-pointer"
          >
            Click here!
          </span>
        </p>
        <Modal isOpen={isResetOpen} setIsOpen={setIsResetOpen}>
          <ForgotPassword setIsOpen={setIsResetOpen} />
        </Modal>
      </div>
    </div>
  );
}
