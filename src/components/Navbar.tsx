import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-blue-600 text-white flex justify-between items-center h-16 px-6 shadow-md z-10">
      <Link to="/">Ride Management</Link>
      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <Link to="/dashboard" className="btn">Dashboard</Link>
    </nav>
  );
}
