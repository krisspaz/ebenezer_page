import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "./LanguageSelector";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home', 'Inicio'), href: "/#hero" },
    { name: t('nav.ministries', 'Ministerios'), href: "/#ministerios" },
    { name: t('nav.events', 'Eventos'), href: "/#eventos" },
    { name: t('nav.contact', 'Contacto'), href: "/#contacto" },
    { name: "Asistencia", href: "/asistencia" },
  ];

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
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector />
          <Button className="bg-[#1e293b] dark:bg-white text-white dark:text-[#1e293b] hover:bg-[#F4C95D] hover:text-[#1e293b] rounded-lg px-6 font-bold uppercase text-xs tracking-wider shadow-md transition-colors">
            {t('nav.live', 'En Vivo')}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-800 dark:text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-100 dark:bg-[#1e293b] border-slate-200 dark:border-blue-800 text-slate-800 dark:text-white w-[300px]">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-lg font-bold text-slate-600 dark:text-blue-100 hover:text-slate-900 dark:hover:text-white transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
