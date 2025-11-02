/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateRideStatusMutation } from './driverApi';

// Ride type customize as needed
interface Ride {
  id: string;
  status?: string;
}

interface ActiveRideManagementProps {
  ride: Ride;
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Status update failed";
  }
  return "Status update failed";
}

export default function ActiveRideManagement({ ride }: ActiveRideManagementProps) {
  const [updateRideStatus, { isLoading, error }] = useUpdateRideStatusMutation();

  const handleStatusChange = async (status: string) => {
    await updateRideStatus({ rideId: ride.id, status });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Active Ride</h2>
      <div>Status: {ride.status ?? '-'}</div>
      <div className="flex gap-2 mt-2">
        {["Picked Up", "In Transit", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className="btn"
            disabled={isLoading}
          >
            {status}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-red-600 mt-2">
          {getErrorMessage(error)}
        </p>
      )}
    </div>
  );
}
