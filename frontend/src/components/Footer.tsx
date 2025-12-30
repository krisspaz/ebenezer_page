import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ChevronUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#0b1120] text-slate-800 dark:text-white border-t border-slate-200 dark:border-white/5 pt-16 pb-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 dark:bg-[#14b8a6]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1: Identity */}
          <div className="flex flex-col items-start space-y-6">
            <div className="flex items-center gap-4">
              {/* Gold Logo from user */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/logo_gold.jpg" alt="Logo Ministerios Ebenezer" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl leading-none tracking-wide text-slate-800 dark:text-white">IGLESIA DE CRISTO</h3>
                <p className="text-[#d4a33d] dark:text-[#F4C95D] font-bold text-sm tracking-widest uppercase mt-1">EBENEZER COBÁN</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-light mt-2 max-w-sm">
              Una comunidad de fe dedicada a compartir el amor de Cristo y servir a nuestra ciudad con excelencia, pasión y compromiso.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="flex items-center text-[#d4a33d] dark:text-[#F4C95D] font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-0.5 bg-[#d4a33d] dark:bg-[#F4C95D] mr-3"></span>
              Enlaces Rápidos
            </h3>
            <ul className="space-y-4">
              {['Sobre Nosotros', 'Eventos', 'Transmisión en Vivo', 'Contacto'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="flex items-center text-[#d4a33d] dark:text-[#F4C95D] font-bold tracking-widest uppercase mb-6">
              <span className="w-8 h-0.5 bg-[#d4a33d] dark:bg-[#F4C95D] mr-3"></span>
              Contacto
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#F4C95D] transition-all">
                  <MapPin className="w-5 h-5 text-[#d4a33d] dark:text-[#F4C95D] group-hover:text-[#1e293b]" />
                </div>
                <span className="text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mt-2">Cobán, Alta Verapaz, Guatemala</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#F4C95D] transition-all">
                  <Phone className="w-5 h-5 text-[#d4a33d] dark:text-[#F4C95D] group-hover:text-[#1e293b]" />
                </div>
                <span className="text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mt-2">+502 5040 4444</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#F4C95D] transition-all">
                  <Mail className="w-5 h-5 text-[#d4a33d] dark:text-[#F4C95D] group-hover:text-[#1e293b]" />
                </div>
                <span className="text-slate-600 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mt-2">contacto@ebenezercoban.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <a href="https://www.facebook.com/ebenezercoban?locale=es_LA" target="_blank" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-[#1877F2] hover:text-white transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/ebenezercoban_/" target="_blank" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-[#E4405F] hover:text-white transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@iglesiaebenezercoban" target="_blank" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-[#FF0000] hover:text-white transition-all">
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <p className="text-slate-500 dark:text-gray-500 text-sm">
            &copy; 2025 Iglesia de Cristo Ebenezer Cobán. Todos los derechos reservados.
          </p>

          {/* Back To Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-[#F4C95D] rounded-full flex items-center justify-center text-[#1e293b] shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronUp className="w-6 h-6 font-bold" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
