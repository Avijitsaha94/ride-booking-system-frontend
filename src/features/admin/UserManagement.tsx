/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery, useUpdateUserMutation } from './adminApi';
import { useState } from 'react';

// User type define (fields customize koro as needed)
interface User {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  blocked?: boolean;
  [key: string]: any;
}

export default function UserManagement() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [filter, setFilter] = useState('');

  const users: User[] = filter
    ? (data?.data as User[] || []).filter(user =>
        (user.name ?? '').toLowerCase().includes(filter.toLowerCase())
      )
    : (data?.data as User[] || []);

  const handleBlock = async (id: string, blocked: boolean) => {
    await updateUser({ id, blocked });
  };

  if (isLoading) return <div>Loading users...</div>;

  // Type guard for error object
  if (error && 'data' in error) {
   
    return <div className="text-red-600">{(error as any).data?.message ?? "Server error"}</div>;
  }
  if (error) return <div className="text-red-600">Error loading users</div>;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">User Management</h3>
      <input
        type="text"
        placeholder="Search users by name..."
        className="input mb-2"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Block/Unblock</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.name ?? '-'}</td>
              <td>{user.email ?? '-'}</td>
              <td>{user.role ?? '-'}</td>
              <td>{user.blocked ? 'Blocked' : 'Active'}</td>
              <td>
                <button
                  onClick={() => handleBlock(user.id, !user.blocked)}
                  className="btn"
                  disabled={updating}
                >
                  {user.blocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
