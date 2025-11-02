import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface User {
  role?: string; // add more user fields if needed
  [key: string]: any;
}
interface ProtectedRouteProps {
  children: ReactNode;
  allowed?: string[];
}

export default function ProtectedRoute({ children, allowed }: ProtectedRouteProps) {
  // 'user' either of type User or null
  const user = useSelector((state: RootState) => (state.auth.user as User | null));

  if (!user) return <Navigate to="/auth" replace />;
  if (allowed && (!user.role || !allowed.includes(user.role))) return <Navigate to="/status" replace />;

  return <>{children}</>;
}
