import { Heart, Users, Book, HandHeart, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Fe",
    description: "Creemos que el Señor vino, que Él es real y que pronto volverá.",
    gradient: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/20",
  },
  {
    icon: Users,
    title: "Congregación",
    description: "Pertenecemos a un ministerio que tiene como proposito expandir la palabra de Dios",
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: Book,
    title: "Palabra",
    description: "Fundamentados en la Escritura y guianza del Espíritu Santo",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
  },
  {
    icon: HandHeart,
    title: "Servicio",
    description: "Quien elija servirme, que siga mis pasos; y donde yo habite, allí estará también mi servidor. Al que me sirve con fidelidad, mi Padre lo cubrirá de honra.",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
  },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0b1120] dark:via-[#0f172a] dark:to-[#0b1120] transition-colors duration-300">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#F4C95D]/10 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full blur-[120px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Mzk3OWYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMzRoNHY0aC00ek0zNiAxOGg0djRoLTR6TTIwIDE4aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50 dark:opacity-30" />

        {/* Floating particles */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/6 w-3 h-3 bg-[#F4C95D]/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-teal-500/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-rose-500/30 rounded-full blur-sm"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F4C95D]/20 to-[#F4C95D]/5 border border-[#F4C95D]/30 px-5 py-2 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-[#F4C95D]" />
              <span className="text-[#d4a33d] dark:text-[#F4C95D] font-bold text-xs uppercase tracking-[0.2em]">
                Nuestra Identidad
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-slate-800 dark:text-white mb-8 tracking-tight leading-[1.1]">
              Sobre{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#F4C95D] to-[#E8B84A] bg-clip-text text-transparent">
                  Nosotros
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute bottom-2 left-0 h-3 bg-[#F4C95D]/20 -z-10 rounded-full"
                />
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
              Iglesia de Cristo Ebenezer Cobán es una comunidad de fe dedicada a compartir
              el amor de Cristo y servir a nuestra ciudad.
            </p>
          </motion.div>
        </div>

        {/* Values Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Hover glow effect */}
              <div className={`absolute -inset-1 ${value.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />

              <div className="relative h-full bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50 transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} p-[1px] shadow-lg shadow-slate-300/30 dark:shadow-none`}>
                    <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                      <value.icon className={`w-7 h-7 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-300`} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  <span className="text-xs font-medium uppercase tracking-wider">Conoce más</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Welcome Card - Full Width Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Animated border gradient */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#F4C95D] via-teal-500 to-[#F4C95D] rounded-[2.5rem] opacity-30 group-hover:opacity-50 blur-sm transition-opacity duration-500 bg-[length:200%_100%] animate-gradient" />

            <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
              {/* Inner gradient decorations */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F4C95D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-10 md:p-16 lg:p-20">
                <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
                  {/* Left - Icon & Title */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-[#F4C95D] to-[#E8B84A] p-[2px] shadow-2xl shadow-[#F4C95D]/30"
                      >
                        <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                          <img
                            src="/logo_gold.jpg"
                            alt="Logo Ebenezer"
                            className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
                          />
                        </div>
                      </motion.div>
                      {/* Floating badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                      >
                        ✨ Bienvenidos
                      </motion.div>
                    </div>
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1">
                    <h3 className="text-4xl lg:text-5xl font-heading font-bold text-slate-800 dark:text-white mb-6 leading-tight">
                      ¡Bienvenidos!
                    </h3>

                    <div className="h-1.5 w-20 bg-gradient-to-r from-[#F4C95D] to-[#E8B84A] rounded-full mb-8" />

                    <p className="text-lg lg:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
                      Somos una congregación llamada a crecer en el conocimiento de Dios y a expandir Su Palabra para que el mensaje de salvación alcance cada corazón. Creemos que el Señor vino, que vive y que pronto volverá. En Iglesia de Cristo Ebenezer Cobán hay un lugar para ti y para toda tu familia.
                    </p>

                    {/* Decorative quote marks */}
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                            className="w-2 h-2 rounded-full bg-[#F4C95D]"
                          />
                        ))}
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                        Iglesia de Cristo Ebenezer Cobán
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add gradient animation keyframes */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
