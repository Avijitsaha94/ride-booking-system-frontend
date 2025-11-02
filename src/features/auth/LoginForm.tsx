import { useState } from 'react';
import { useLoginMutation } from './authApi';
import { useDispatch } from 'react-redux';
import { setCredentials, setError } from './authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
      navigate('/dashboard');
    } catch (err: any) {
      dispatch(setError(err.data?.message || "Login failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="input"
        required
      />
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Logging In..." : "Login"}
      </button>
      {error && <p className="text-red-600 mt-2">{error.data.message}</p>}
    </form>
  );
}
