/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useRegisterMutation } from "./authApi";
import { useNavigate } from "react-router-dom";

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    
    return (error as any).data?.message ?? "Registration failed";
  }
  return "Registration failed";
}

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setSuccess(false);
    try {
      await register(form).unwrap();
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500); // Redirect to login after 1.5s
    } catch (err) {
      setLocalError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow mx-auto mt-16">
      <h2 className="mb-4 text-xl font-semibold">Register</h2>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="input"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="input"
        required
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        required
        className="input"
      >
        <option value="">Select Role</option>
        <option value="USER">Rider</option>
        <option value="DRIVER">Driver</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit" className="btn w-full mt-2" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {localError && <p className="text-red-600 mt-2">{localError}</p>}
      {error && <p className="text-red-600 mt-2">{getErrorMessage(error)}</p>}
      {success && <p className="text-green-600 mt-2">Registration successful! Redirecting...</p>}
    </form>
  );
}
