/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; // type-only import
import { useSetAvailabilityMutation, useGetIncomingRequestsQuery } from './driverApi';
import IncomingRequests from './IncomingRequests';

// Driver type safely define koro
interface Driver {
  id?: string;
  online?: boolean;
  [key: string]: any;
}

export default function DriverDashboard() {
  const driver = useSelector((state: RootState) => (state.auth.user as Driver | null)) || {};

  const [setAvailability, { isLoading }] = useSetAvailabilityMutation();
  const { data: requests, isLoading: loadingRequests } = useGetIncomingRequestsQuery({ id: driver.id });

  const handleToggle = async () => {
    if (driver.id !== undefined && driver.online !== undefined) {
      await setAvailability({ id: driver.id, online: !driver.online });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>
      <button onClick={handleToggle} className="btn mb-4" disabled={isLoading}>
        {driver.online ? "Go Offline" : "Go Online"}
      </button>
      <div>
        <h3 className="text-lg font-semibold mb-2">Incoming Requests</h3>
        {loadingRequests ? (
          <div>Loading requests...</div>
        ) : (
          <IncomingRequests requests={requests?.data || []} />
        )}
      </div>
    </div>
  );
}
