import { Heart, Users, Book, HandHeart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Fe",
    description: "Fundamentados en las enseñanzas de Cristo",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Unidos como una familia en el amor de Dios",
  },
  {
    icon: Book,
    title: "Palabra",
    description: "Guiados por las Sagradas Escrituras",
  },
  {
    icon: HandHeart,
    title: "Servicio",
    description: "Sirviendo a nuestra comunidad con amor",
  },
];

const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#0b1120] transition-colors duration-300">
      {/* Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4C95D]/20 to-transparent" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F4C95D]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#F4C95D]/10 border border-[#F4C95D]/20 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#d4a33d] dark:text-[#F4C95D]" />
              <span className="text-[#d4a33d] dark:text-[#F4C95D] font-bold text-xs uppercase tracking-widest">
                Nuestra Identidad
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 dark:text-white mb-6 tracking-tight">
              Sobre Nosotros
            </h2>

            <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed font-light">
              La Iglesia de Cristo Ebenezer Cobán es una comunidad de fe dedicada a compartir
              el amor de Cristo y servir a nuestra ciudad.
            </p>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-7xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#F4C95D]/20 to-teal-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative h-full bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md rounded-2xl p-8 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <value.icon className="w-6 h-6 text-[#d4a33d] dark:text-[#F4C95D]" strokeWidth={2} />
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Misión Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F4C95D]/30 to-transparent rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500" />

            <div className="relative bg-white dark:bg-[#1e293b] p-10 md:p-12 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C95D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-[#F4C95D]/10 rounded-2xl">
                    <Book className="w-8 h-8 text-[#d4a33d] dark:text-[#F4C95D]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">
                      Misión
                    </h3>
                    <div className="h-1 w-12 bg-[#F4C95D] rounded-full mt-2" />
                  </div>
                </div>

                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  Glorificar a Dios a través de la adoración sincera, el estudio profundo
                  de su Palabra, y el servicio comprometido a nuestra comunidad. Buscamos
                  ser instrumentos del amor de Cristo, transformando vidas.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Visión Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-l from-teal-500/30 to-transparent rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-500" />

            <div className="relative bg-white dark:bg-[#1e293b] p-10 md:p-12 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-teal-500/10 rounded-2xl">
                    <Heart className="w-8 h-8 text-teal-600 dark:text-[#14b8a6]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-800 dark:text-white">
                      Visión
                    </h3>
                    <div className="h-1 w-12 bg-teal-500 rounded-full mt-2" />
                  </div>
                </div>

                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  Ser una iglesia que impacte positivamente a Cobán y sus alrededores,
                  siendo conocidos por nuestro amor genuino, servicio desinteresado y
                  compromiso inquebrantable con la verdad del Evangelio.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
