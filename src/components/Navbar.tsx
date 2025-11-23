import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoEbenezer from "@/assets/logo_ebenezer.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "INICIO", href: "#inicio" },
    { label: "EVENTOS", href: "#eventos" },
    { label: "MINISTERIOS", href: "#ministerios" },
    { label: "NOSOTROS", href: "#nosotros" },
    { label: "CONTACTO", href: "#contacto" },
  ];

  const handleClick = (item) => {
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-primary/95 shadow-md backdrop-blur-md"
          : "bg-primary shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo + título */}
          <div className="flex items-center space-x-3">
            <img
              src={logoEbenezer}
              alt="Logo Ebenezer Cobán"
              className="w-12 h-12 object-contain rounded-full border-2 border-yellow-500 shadow-md"
            />
            <div className="hidden md:block leading-tight">
              <h1 className="text-white font-serif font-bold text-base tracking-wide">
                IGLESIA DE CRISTO
              </h1>
              <p className="text-yellow-500 text-sm font-semibold">
                EBENEZER COBÁN
              </p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className="text-gray-200 hover:text-yellow-500 transition-colors duration-200 font-medium text-sm uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-primary/95 backdrop-blur-md animate-fadeIn">
            <div className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleClick(item)}
                  className="text-gray-200 hover:text-yellow-500 transition-colors duration-200 font-medium text-left py-2 uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
