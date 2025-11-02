import { useState } from 'react';
import { useRegisterMutation } from './authApi';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow mt-8">
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
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-600 mt-2">{error.data.message}</p>}
    </form>
  );
}
