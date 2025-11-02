/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; // type-only import
import { useGetUserQuery, useUpdateUserMutation } from './userApi';
import { useState, useEffect } from 'react';

// User type
interface User {
  id?: string;
  name?: string;
  phone?: string;
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Failed to update profile";
  }
  return "Failed to update profile";
}

export default function UserProfile() {
  // fallback to {} if user is null
  const user = useSelector((state: RootState) => (state.auth.user as User | null)) || {};

  const { data, isLoading } = useGetUserQuery(user.id ?? '');
  const [updateUser, { isLoading: updating, error }] = useUpdateUserMutation();
  const [form, setForm] = useState({ name: '', phone: '', password: '' });

  // Correct: useEffect to update form state on data fetch
  useEffect(() => {
    if (data) setForm({ name: data.name ?? '', phone: data.phone ?? '', password: '' });
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.id !== undefined) {
      await updateUser({ id: user.id, ...form });
    }
  };

  if (isLoading) return <div>Loading profile...</div>;

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
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
        type="text"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="input"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Change Password"
        className="input"
      />
      <button type="submit" className="btn" disabled={updating}>Update</button>
      {error && <p className="text-red-600 mt-2">{getErrorMessage(error)}</p>}
    </form>
  );
}
