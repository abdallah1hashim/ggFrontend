import Logo from "./Logo";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="text-primary-50 container absolute inset-0 z-10 flex justify-between">
      <Navbar />
      <Logo />
      <div>
        <button>💀</button>
        <button>🚀</button>
      </div>
    </header>
  );
}

export default Header;
