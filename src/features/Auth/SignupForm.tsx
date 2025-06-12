import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { useAuthContext } from "../../store/Auth-context";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const { signup, isPending } = useSignup();
  const { signup } = useAuthContext();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    signup({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded shadow-md border border-slate-200">
        <h1 className="text-lg font-bold text-center mb-4">
          Sign up for an account
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
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-slate-100 border border-slate-300 p-2 rounded"
            type="text"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="primary">Signup</Button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            className="text-sky-600 underline hover:text-sky-800"
            to="/login"
          >
            Login here!
          </Link>
        </p>
      </div>
    </div>
  );
}
