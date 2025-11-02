/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLoginMutation } from "./authApi";
import { useNavigate } from "react-router-dom";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    
    return (error as any).data?.message ?? "Login failed";
  }
  return "Login failed";
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      // Successful login — redirect or global state update if needed
      navigate("/dashboard");
    } catch (err) {
      setLocalError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow mx-auto mt-16">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="input"
        required
      />
      <button type="submit" className="btn w-full mt-2" disabled={isLoading}>
        {isLoading ? "Logging In..." : "Login"}
      </button>
      {localError && <p className="text-red-600 mt-2">{localError}</p>}
      {error && <p className="text-red-600 mt-2">{getErrorMessage(error)}</p>}
    </form>
  );
}
