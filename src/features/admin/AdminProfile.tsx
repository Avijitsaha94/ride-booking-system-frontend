import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; // type-only import
import { useState } from 'react';

// Define a User/Admin type (expand fields as required)
interface Admin {
  name?: string;
  email?: string;
  [key: string]: any;
}

export default function AdminProfile() {
  // fallback to {} if admin is null
  const admin = useSelector((state: RootState) => (state.auth.user as Admin | null)) || {};

  const [form, setForm] = useState({
    name: admin.name || '',
    email: admin.email || '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Call update mutation here if wired (see adminApi)
  };

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Admin Profile</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" required />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" required />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Change Password" className="input" />
      <button type="submit" className="btn">Update</button>
    </form>
  );
}
