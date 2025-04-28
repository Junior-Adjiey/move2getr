import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ParallaxBackground() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="fixed inset-0 -z-10"
      style={{ x, y }}
    >
      <div className="w-full h-full bg-[url('/images/LOGO1-removebg.png')] bg-cover bg-center opacity-20 blur-sm" />
    </motion.div>
  );
}
