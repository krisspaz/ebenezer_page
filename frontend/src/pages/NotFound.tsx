import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, HardHat, Hammer } from "lucide-react";
import { Button } from "../components/ui/button";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <SEO
        title="Página no encontrada | Ebenezer Cobán"
        description="La página que buscas no existe o ha sido movida."
      />
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}% `,
              top: `${Math.random() * 100}% `,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Animated Logo with Construction */}
        <div className="relative mb-8">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative mx-auto w-32 h-32"
          >
            <motion.img
              src="/logo_gold.jpg"
              alt="Logo Ebenezer"
              className="w-full h-full rounded-full object-cover border-4 border-amber-400 shadow-2xl shadow-amber-400/30"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                  "0 0 40px rgba(251, 191, 36, 0.5)",
                  "0 0 20px rgba(251, 191, 36, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Animated Hard Hat */}
            <motion.div
              className="absolute -top-4 -right-2"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <div className="bg-amber-500 p-2 rounded-full shadow-lg">
                <HardHat className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Animated Hammer */}
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{
                rotate: [0, -30, 0],
                y: [0, -5, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <div className="bg-slate-700 p-2 rounded-full shadow-lg border-2 border-amber-400">
                <Hammer className="w-5 h-5 text-amber-400" />
              </div>
            </motion.div>
          </motion.div>

          {/* Brick animation */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-3 bg-amber-600 rounded-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-8xl font-bold text-amber-400 mb-4"
          style={{ textShadow: "0 0 30px rgba(251, 191, 36, 0.5)" }}
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">
            ¡Estamos Construyendo!
          </h2>
          <p className="text-slate-400 text-lg">
            Esta página está en construcción o no existe.
            <br />
            <span className="text-amber-400">Pronto tendremos algo increíble aquí.</span>
          </p>
        </motion.div>

        {/* Loading bricks animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-2 my-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-amber-500 rounded-sm"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
        </motion.div>

        {/* Church name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-slate-500 text-sm"
        >
          Iglesia de Cristo Ebenezer Cobán
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
