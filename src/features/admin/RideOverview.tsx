/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllRidesQuery } from './adminApi';
import { useState } from 'react';

// Ride object-er type interface (customize fields as needed)
interface Ride {
  id: string;
  date?: string;
  status?: string;
  fare?: number;
  user?: { name?: string };
  driver?: { name?: string };
}

export default function RideOverview() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useGetAllRidesQuery({ search });

  if (isLoading) return <div>Loading rides...</div>;
  // Type guard for error object (RTK Query best practice):
  if (error && 'data' in error) {
    // Only show error.data if exists (ignore TS warning):
    
    return <div className="text-red-600">{(error as any).data?.message ?? "Server error"}</div>;
  }
  // If error exists without data:
  if (error) return <div className="text-red-600">Error loading rides</div>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">All Rides</h3>
      <input
        type="text"
        placeholder="Search ride by user/driver..."
        className="input mb-2"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
          {(data?.data as Ride[] ?? []).map((ride: Ride) => (
            <tr key={ride.id}>
              <td>{ride.date ?? '-'}</td>
              <td>{ride.user?.name ?? '-'}</td>
              <td>{ride.driver?.name ?? '-'}</td>
              <td>{ride.status ?? '-'}</td>
              <td>{ride.fare ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
