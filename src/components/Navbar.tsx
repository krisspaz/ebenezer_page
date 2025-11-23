import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoEbenezer from "@/assets/logo_ebenezer.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMinistriesOpen, setIsMinistriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "INICIO", href: "#inicio" },
    { label: "EVENTOS", href: "#eventos" },
    {
      label: "MINISTERIOS",
      href: "#ministerios",
      subItems: [
        { label: "Ebenekids", href: "#ebenekids" },
        { label: "Prejus", href: "#prejus" },
        { label: "Jóvenes", href: "#jovenes" },
      ]
    },
    { label: "NOSOTROS", href: "#nosotros" },
    { label: "CONTACTO", href: "#contacto" },
  ];

  const handleClick = (item: { href: string }) => {
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setIsMinistriesOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-primary shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-center justify-between">
          {/* Logo + título */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative">
              <img
                src={logoEbenezer}
                alt="Logo Ebenezer Cobán"
                className="relative w-10 h-10 object-contain rounded-full border-2 border-accent/50 shadow-sm group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-gray-100 font-heading font-bold text-base leading-none tracking-wide group-hover:text-accent transition-colors duration-300">
                IGLESIA DE CRISTO
              </h1>
              <p className="text-accent font-medium text-xs tracking-[0.2em] mt-0.5">
                EBENEZER COBÁN
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <button
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm tracking-widest py-2 group"
                  >
                    {item.label}
                    <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleClick(item)}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium text-sm tracking-widest py-2 group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )}

                {/* Dropdown for Ministries */}
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-primary rounded-xl shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => handleClick(subItem)}
                          className="block w-full text-left px-4 py-2 text-sm text-white/80 hover:text-accent hover:bg-white/5 transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-primary border-t border-white/10 animate-fade-in-up shadow-xl">
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => setIsMinistriesOpen(!isMinistriesOpen)}
                        className="flex items-center justify-between w-full text-white/90 hover:text-accent hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-left tracking-wide"
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMinistriesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMinistriesOpen && (
                        <div className="pl-8 mt-2 space-y-2 border-l-2 border-white/10 ml-4">
                          {item.subItems.map((subItem) => (
                            <button
                              key={subItem.label}
                              onClick={() => handleClick(subItem)}
                              className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-accent transition-colors"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleClick(item)}
                      className="block w-full text-white/90 hover:text-accent hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-left tracking-wide"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
