export default function Status() {
  return (
    <div className="py-12 px-4 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Account Status</h1>
      <p>Your account is either blocked, suspended, or access is restricted. Contact support to resolve the issue.</p>
      <a href="/contact" className="btn mt-6 inline-block">Contact Support</a>
    </div>
  );
}
