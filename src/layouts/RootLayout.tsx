import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
