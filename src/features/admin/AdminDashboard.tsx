import AnalyticsDashboard from './AnalyticsDashboard';
import UserManagement from './UserManagement';
import RideOverview from './RideOverview';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <AnalyticsDashboard />
      <UserManagement />
      <RideOverview />
    </div>
  );
}
