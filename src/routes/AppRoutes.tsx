import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import LoginForm from "@/features/auth/LoginForm";
import RegisterForm from "@/features/auth/RegisterForm";
// import { Dashboard } from "@/features/dashboard/Dashboard"; // Example

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* Uncomment these if you have implemented these dashboard/pages */}
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      {/* <Route path="/rider/dashboard" element={<RiderDashboard />} /> */}
      {/* <Route path="/driver/dashboard" element={<DriverDashboard />} /> */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
    </Routes>
  );
}
