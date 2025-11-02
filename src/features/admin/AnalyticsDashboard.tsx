import { useAnalyticsQuery } from './adminApi';

export default function AnalyticsDashboard() {
  const { data, isLoading, error } = useAnalyticsQuery();

  if (isLoading) return <div>Loading analytics...</div>;
  // Type guard for error object:
  if (error && 'data' in error) {
    // Only show error.data if exists
    // @ts-ignore to skip TS warning if needed (rarely needed here)
    return <div className="text-red-600">{(error as any).data?.message ?? "Server error"}</div>;
  }
  // Otherwise, generic error message
  if (error) return <div className="text-red-600">Error loading analytics</div>;

  const stats = data?.data;

  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h3 className="text-xl font-semibold mb-2">Analytics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="font-bold">Total Rides</div>
          <div>{stats?.totalRides ?? 0}</div>
        </div>
        <div>
          <div className="font-bold">Total Revenue</div>
          <div>{stats?.totalRevenue ?? 0}</div>
        </div>
        <div>
          <div className="font-bold">Active Drivers</div>
          <div>{stats?.activeDrivers ?? 0}</div>
        </div>
      </div>
      {/* Analytics charts can be integrated here with recharts */}
    </div>
  );
}
