import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Features from '../pages/Features';
import Contact from '../pages/Contact';
import FAQ from '../pages/FAQ';
import AuthPage from '../features/auth/AuthPage';
import Status from '../pages/Status';
// Import other dashboard pages/components

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/status" element={<Status />} />
      {/* Dashboard and other routes */}
    </Routes>
  );
}
