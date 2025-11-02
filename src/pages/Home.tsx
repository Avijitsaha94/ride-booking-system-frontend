import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="py-12 px-4 max-w-3xl mx-auto">
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Ride Booking!</h1>
        <p>Book rides, manage trips, and enjoy a safe experience for Riders, Drivers, and Admins.</p>
      </section>
      <section className="mb-8">
        <h2 className="font-semibold mb-1">How It Works</h2>
        <p>Choose your role, register, and start booking or driving!</p>
      </section>
      <section className="mb-8">
        <h2 className="font-semibold mb-1">Service Highlights</h2>
        <ul className="list-disc pl-6">
          <li>Live Tracking</li>
          <li>Secure Payments</li>
          <li>Emergency SOS</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="font-semibold mb-1">Testimonials</h2>
        <blockquote className="italic text-gray-700">“Best ride booking platform I've used!”</blockquote>
      </section>
      <section className="flex gap-4">
        <button className="btn" onClick={() => navigate('/register')}>Get Started</button>
        <button className="btn" onClick={() => navigate('/login')}>Login</button>
      </section>
    </div>
  );
}
