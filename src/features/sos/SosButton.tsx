/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

// Props type
interface SosButtonProps {
  active: boolean;
}

export default function SosButton({ active }: SosButtonProps) {
  const [open, setOpen] = useState(false);

  if (!active) return null;

  // Type parameter type explicitly declare
  const handleSOS = (type: 'call' | 'notify' | 'location') => {
    // Example: Use type value for different SOS actions
    // For live location: navigator.geolocation.getCurrentPosition
    // For notifications: emailjs/twilio/whatsapp-web.js code here
    setOpen(false);
    // Show toast/alert here for confirmation, e.g., based on type
    // if (type === 'call') { ... }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="bg-red-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="SOS"
      >
        SOS
      </button>
      {open && (
        <div className="bg-white border p-4 rounded shadow mt-2 space-y-2">
          <button className="btn bg-red-500" onClick={() => handleSOS('call')}>Call Police</button>
          <button className="btn bg-yellow-500" onClick={() => handleSOS('notify')}>Notify Emergency Contact</button>
          <button className="btn bg-blue-500" onClick={() => handleSOS('location')}>Share Live Location</button>
          <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
