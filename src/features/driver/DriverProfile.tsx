/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; // type-only import
import { useUpdateDriverMutation } from './driverApi';
import { useState, useEffect } from 'react';

// Driver type define koro
interface Driver {
  id?: string;
  name?: string;
  phone?: string;
  licenseNumber?: string;
  [key: string]: any;
}

export default function DriverProfile() {
  // fallback if null
  const driver = useSelector((state: RootState) => (state.auth.user as Driver | null)) || {};

  const [updateDriver, { isLoading, error }] = useUpdateDriverMutation();
  const [form, setForm] = useState({
    name: driver.name || '',
    phone: driver.phone || '',
    licenseNumber: driver.licenseNumber || '',
    password: ''
  });

  // Form update on driver change (useEffect is correct here)
  useEffect(() => {
    setForm({
      name: driver.name || '',
      phone: driver.phone || '',
      licenseNumber: driver.licenseNumber || '',
      password: ''
    });
  }, [driver]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (driver.id !== undefined) {
      await updateDriver({ id: driver.id, ...form });
    }
  };

  // RTK Query error safe block
  function getErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'data' in error) {
      
      return (error as any).data?.message ?? "Update failed";
    }
    return "Update failed";
  }

  return (
    <form onSubmit={handleUpdate} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-2xl font-bold">Edit Driver Profile</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" required />
      <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" required />
      <input type="text" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="License Number" className="input" required />
      <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Change Password" className="input" />
      <button type="submit" className="btn" disabled={isLoading}>Update</button>
      {error && <p className="text-red-600 mt-2">{getErrorMessage(error)}</p>}
    </form>
  );
}
