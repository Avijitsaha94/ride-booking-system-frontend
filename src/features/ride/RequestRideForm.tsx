/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useRequestRideMutation } from './rideApi';

// RTK Query error safe parser
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Ride request failed";
  }
  return "Ride request failed";
}

export default function RequestRideForm() {
  const [form, setForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
  });
  const [requestRide, { isLoading, error }] = useRequestRideMutation();

  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    setSuccess(false);
    try {
      await requestRide(form).unwrap();
      setSuccess(true);
    } catch (err) {
      setLocalError(getErrorMessage(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-xl font-semibold">Request a Ride</h2>
      <input
        type="text"
        name="pickupLocation"
        value={form.pickupLocation}
        onChange={handleChange}
        placeholder="Pickup Location"
        className="input"
        required
      />
      <input
        type="text"
        name="dropoffLocation"
        value={form.dropoffLocation}
        onChange={handleChange}
        placeholder="Drop-off Location"
        className="input"
        required
      />
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Requesting..." : "Request Ride"}
      </button>
      {localError && <p className="text-red-600 mt-2">{localError}</p>}
      {error && <p className="text-red-600 mt-2">{getErrorMessage(error)}</p>}
      {success && <p className="text-green-600 mt-2">Ride requested successfully!</p>}
    </form>
  );
}
