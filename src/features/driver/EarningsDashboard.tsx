/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store'; // type-only import
import { useGetEarningsQuery } from './driverApi';
import { useState } from 'react';

// Driver interface define
interface Driver {
  id?: string;
  [key: string]: any;
}

// Safe RTK error handler
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    
    return (error as any).data?.message ?? "Error loading earnings";
  }
  return "Error loading earnings";
}

export default function EarningsDashboard() {
  const driver = useSelector((state: RootState) => (state.auth.user as Driver | null)) || {};
  const [period, setPeriod] = useState('daily');
  // Provide a safe argument for id
  const { data, isLoading, error } = useGetEarningsQuery({ id: driver.id ?? '', period });

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Earnings Overview</h2>
      <select value={period} onChange={e => setPeriod(e.target.value)} className="input mb-4">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      {isLoading && <div>Loading earnings...</div>}
      {error && <div className="text-red-600">{getErrorMessage(error)}</div>}
      {data && (
        <div>
          <div>Total Rides: {data.totalRides ?? 0}</div>
          <div>Total Earned: {data.totalEarned ?? 0}</div>
          <div>Best Day: {data.bestDay ?? '-'}</div>
          {/* Chart integration (recharts, etc) possible here */}
        </div>
      )}
    </div>
  );
}
