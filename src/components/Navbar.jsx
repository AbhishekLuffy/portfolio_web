import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

function AnimatedMenuIcon({ open }) {
  return (
    <motion.button
      className="relative w-9 h-9 flex flex-col justify-center items-center group focus:outline-none"
      aria-label={open ? 'Close menu' : 'Open menu'}
      tabIndex={0}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      {/* Top line */}
      <motion.span
        className="absolute w-7 h-1 bg-white rounded-full transition-all duration-300 group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      {/* Middle line */}
      <motion.span
        className="absolute w-7 h-1 bg-white rounded-full transition-all duration-300"
        animate={open ? { opacity: 0, scaleX: 0.5 } : { opacity: 1, scaleX: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      />
      {/* Bottom line */}
      <motion.span
        className="absolute w-7 h-1 bg-white rounded-full transition-all duration-300 group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </motion.button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on nav click (mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur border-b border-gray-800 shadow-lg"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
        <span className="text-2xl font-extrabold tracking-wide text-blue-400">Abhishek P</span>
        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-2 py-1 text-white hover:text-blue-400 transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-blue-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Hamburger icon for mobile */}
        <span className="md:hidden ml-auto" onClick={() => setMenuOpen((v) => !v)}>
          <AnimatedMenuIcon open={menuOpen} />
        </span>
      </div>
      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 border-b border-gray-800 shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-2 py-4 px-6">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2 text-lg text-white hover:text-blue-400 transition-colors duration-200"
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}