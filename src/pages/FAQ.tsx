import { useState } from 'react';

const faqData = [
  { question: 'How do I register?', answer: 'Click Register on the home page and fill your details.' },
  { question: 'How can drivers go online?', answer: 'Drivers can toggle online/offline in their dashboard.' },
  { question: 'What if my account is blocked?', answer: 'Contact support through the contact page.' }
];

export default function FAQ() {
  const [search, setSearch] = useState('');

  const filtered = faqData.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 px-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">FAQ</h1>
      <input
        placeholder="Search FAQs..."
        className="input mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul>
        {filtered.map((faq, idx) => (
          <li key={idx} className="mb-3">
            <div className="font-semibold">{faq.question}</div>
            <div className="text-gray-700">{faq.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
