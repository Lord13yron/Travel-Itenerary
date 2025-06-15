import { useState } from "react";
import Button from "../../ui/Button";
import { resetPassword } from "../../services/authApi";
import toast from "react-hot-toast";

type ForgotPasswordProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function ForgotPassword({ setIsOpen }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    resetPassword(email);
    console.log("Reset password for:", email);
    setEmail("");
    toast.success("Check your email for the reset link");
    setIsOpen(false);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-2 justify-center items-center"
    >
      <h1 className="font-bold">Enter your email to reset your password</h1>
      <input
        className="bg-sky-100 rounded p-2"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="primary">Submit</Button>
    </form>
  );
}
