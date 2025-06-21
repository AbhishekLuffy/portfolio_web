import { motion } from 'framer-motion';

// Example tech/code/gradient mesh Unsplash image
const bgUrl =
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-2 sm:px-4"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="absolute inset-0 bg-black/80" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center text-center gap-6 sm:gap-8 w-full max-w-2xl"
      >
        {/* Animated developer emoji beside name */}
        <div className="flex items-center justify-center gap-3 mb-2 sm:mb-4">
          <motion.span
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            className="text-4xl sm:text-5xl md:text-6xl"
            aria-label="Developer"
            role="img"
          >
            {'👨‍💻'}
          </motion.span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">Hi, I'm Abhishek P</h1>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-blue-300 mb-2 sm:mb-4">Aspiring Full Stack Developer</h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full">
          <a
            href="/Abhishek_Resume.pdf"
            download
            className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-colors duration-200 text-center"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-6 py-2 rounded bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow transition-colors duration-200 text-center"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}