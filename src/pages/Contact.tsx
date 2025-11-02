import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate form submit
  };

  return (
    <div className="py-12 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" className="input" required onChange={handleChange} value={form.name} />
        <input name="email" type="email" placeholder="Your Email" className="input" required onChange={handleChange} value={form.email} />
        <textarea name="message" placeholder="Your Message" className="input" required rows={4} onChange={handleChange} value={form.message}></textarea>
        <button type="submit" className="btn">Send</button>
      </form>
      {submitted && <p className="text-green-700 mt-2">Message sent successfully!</p>}
    </div>
  );
}
