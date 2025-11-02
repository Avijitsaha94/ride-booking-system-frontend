export default function About() {
  return (
    <div className="py-12 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">Our mission is to deliver safe, efficient, and accessible ride booking experience for everyone in Bangladesh.</p>
      <div>
        <h2 className="font-semibold mb-2">Meet the Team</h2>
        <ul className="list-disc pl-6">
          <li>Avijit Saha - Project Lead</li>
          <li>Rahim Driver - Senior Developer</li>
          {/* More profiles */}
        </ul>
      </div>
    </div>
  );
}
