import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  list: string[];
  actions: ReactNode[];
}

function FeatureCard({ title, list, actions }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <ul className="list-disc pl-6 mb-3">
        {list.map((item: string) => <li key={item}>{item}</li>)}
      </ul>
      <div className="flex gap-2 flex-wrap">{actions}</div>
    </div>
  );
}

export default function Features() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Features</h1>
      <FeatureCard
        title="Rider"
        list={["Book rides", "Track rides", "Edit profile"]}
        actions={[
          <Link to="/register" className="btn" key="register">Register as Rider</Link>,
          <Link to="/rider/dashboard" className="btn" key="dashboard">View Rider Dashboard</Link>
        ]}
      />
      <FeatureCard
        title="Driver"
        list={["Set availability", "Accept or reject requests", "View earnings"]}
        actions={[
          <Link to="/register" className="btn" key="register">Register as Driver</Link>,
          <Link to="/driver/dashboard" className="btn" key="dashboard">View Driver Dashboard</Link>
        ]}
      />
      <FeatureCard
        title="Admin"
        list={["User control", "Analytics dashboard", "Monitor rides"]}
        actions={[
          <Link to="/login" className="btn" key="login">Login as Admin</Link>,
          <Link to="/admin/dashboard" className="btn" key="dashboard">View Admin Dashboard</Link>
        ]}
      />
    </div>
  );
}
