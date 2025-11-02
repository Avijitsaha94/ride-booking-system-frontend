/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRideHistoryQuery } from './rideApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Ride type define
interface Ride {
  id: string;
  date?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  fare?: number;
  status?: string;
  [key: string]: any;
}

// RTK error safe getter
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Could not load ride history";
  }
  return "Could not load ride history";
}

export default function RideHistory() {
  const [params] = useState({}); // If params never used, can remove this line
  const { data, isLoading, error } = useGetRideHistoryQuery(params);

  if (isLoading) return <div>Loading ride history...</div>;
  if (error) return <div className="text-red-600">{getErrorMessage(error)}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ride History</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Date</th>
            <th>Pickup</th>
            <th>Drop-off</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {(data?.data as Ride[] ?? []).map((ride: Ride) => (
            <tr key={ride.id}>
              <td>{ride.date ?? '-'}</td>
              <td>{ride.pickupLocation ?? '-'}</td>
              <td>{ride.dropoffLocation ?? '-'}</td>
              <td>{ride.fare ?? '-'}</td>
              <td>{ride.status ?? '-'}</td>
              <td>
                <Link to={`/ride/${ride.id}`} className="underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
