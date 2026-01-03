import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyles = "text-sm font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider";
  const mobileLinkStyles = "text-lg font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 shadow-md ${scrolled ? "py-2" : "py-4"}
                     bg-slate-100 dark:bg-[#1e293b]`}>
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo_gold.jpg"
            alt="Logo Ebenezer"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight leading-none drop-shadow-md">EBENEZER</span>
            <span className="text-[10px] text-slate-600 dark:text-blue-100 font-medium tracking-widest uppercase">Cobán</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/#inicio" className={linkStyles}>Inicio</a>

          <Link to="/rhema-tv" className={linkStyles}>Rhema TV</Link>

          {/* Transmisiones Dropdown */}
          <div className="relative group">
            <button className={`${linkStyles} flex items-center gap-1`}>
              Transmisiones
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#0b1120] rounded-lg shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <div className="py-2 flex flex-col">
                <Link
                  to="/transmision/coban"
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Ebenezer Cobán
                </Link>
                <Link
                  to="/transmision/chile"
                  className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors"
                >
                  Ebenezer Chile
                </Link>
              </div>
            </div>
          </div>

          <Link to="/rhema" className={linkStyles}>Revista Rhema</Link>
          <Link to="/admin/miembros" className={linkStyles}>Congregación</Link>
          <a href="/#contacto" className={linkStyles}>Contacto</a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* ThemeToggle next to Live button as requested ("pegalo a live") */}
          <ThemeToggle />
          <Button
            onClick={() => document.querySelector("#transmision")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[#1e293b] dark:bg-white text-white dark:text-[#1e293b] hover:bg-[#F4C95D] hover:text-[#1e293b] rounded-lg px-6 font-bold uppercase text-xs tracking-wider shadow-md transition-colors"
          >
            En Vivo
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-800 dark:text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-100 dark:bg-[#1e293b] border-slate-200 dark:border-blue-800 text-slate-800 dark:text-white w-[300px]">
              <div className="flex flex-col gap-6 mt-10">
                <a href="/#inicio" className={mobileLinkStyles}>Inicio</a>
                <Link to="/rhema-tv" className={mobileLinkStyles}>Rhema TV</Link>

                <div className="flex flex-col gap-3 border-l-2 border-slate-300 dark:border-slate-700 pl-4 my-2">
                  <span className="text-lg font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-xs">Transmisiones</span>
                  <Link
                    to="/transmision/coban"
                    className="text-lg font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Ebenezer Cobán
                  </Link>
                  <Link
                    to="/transmision/chile"
                    className="text-lg font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Ebenezer Chile
                  </Link>
                </div>

                <Link to="/rhema" className={mobileLinkStyles}>Revista</Link>
                <Link to="/admin/miembros" className={mobileLinkStyles}>Congregación</Link>
                <a href="/#contacto" className={mobileLinkStyles}>Contacto</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
