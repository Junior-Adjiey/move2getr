import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashOverlay() {
  const [showSplash, setShowSplash] = useState(true);
  const letters = "MOVE2GETR".split("");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-50 backdrop-blur-lg bg-[#FDF7EC]/70 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Logo animé */}
            <motion.img
              src="/images/LOGO1.png"
              alt="Logo"
              className="w-40 h-40 object-contain drop-shadow-xl"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />

            {/* Titre animé */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 1.2,
                  },
                },
              }}
              className="flex space-x-1 md:space-x-2"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-900 via-green-800 to-green-900 bg-clip-text text-transparent animate-shine drop-shadow-lg"

                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
