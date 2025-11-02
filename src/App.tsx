<<<<<<< HEAD
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}
=======
import { Outlet } from "react-router"
import CommonLayout from "./components/layout/CommonLayout"
 
function App() {
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
   
   
  )
}
 
export default App;
>>>>>>> 90b75c59ba23bca2290801a47adf3e5e3d258506
