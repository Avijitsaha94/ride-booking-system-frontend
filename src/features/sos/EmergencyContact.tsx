import { useState } from 'react';

// Props type specification
interface EmergencyContactProps {
  contacts: string[];
  setContacts: (contacts: string[]) => void;
}

export default function EmergencyContact({ contacts, setContacts }: EmergencyContactProps) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    setContacts([...contacts, value]);
    setValue('');
  };

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Emergency Contacts</h3>
      <ul>
        {contacts.map((c, idx) => <li key={idx}>{c}</li>)}
      </ul>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter contact/email"
        className="input"
      />
      <button className="btn" onClick={handleAdd} disabled={!value}>Add</button>
    </div>
  );
}
