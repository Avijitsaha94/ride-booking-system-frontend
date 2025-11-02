/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAcceptRideMutation } from './driverApi';

// Define RideRequest type
interface RideRequest {
  id: string;
  date?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  user?: { name?: string };
  [key: string]: any;
}

// Component props type
interface IncomingRequestsProps {
  requests: RideRequest[];
}

// RTK error message getter
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Action failed";
  }
  return "Action failed";
}

export default function IncomingRequests({ requests }: IncomingRequestsProps) {
  const [acceptRide, { isLoading, error }] = useAcceptRideMutation();

  const handleAccept = async (id: string) => {
    await acceptRide({ rideId: id });
  };

  return (
    <table className="table-auto w-full border">
      <thead>
        <tr>
          <th>Date</th>
          <th>Pickup</th>
          <th>Drop-off</th>
          <th>User</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req: RideRequest) => (
          <tr key={req.id}>
            <td>{req.date ?? '-'}</td>
            <td>{req.pickupLocation ?? '-'}</td>
            <td>{req.dropoffLocation ?? '-'}</td>
            <td>{req.user?.name ?? '-'}</td>
            <td>
              <button
                onClick={() => handleAccept(req.id)}
                disabled={isLoading}
                className="btn"
              >
                Accept
              </button>
              {error && (
                <span className="text-red-600 ml-2">
                  {getErrorMessage(error)}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
