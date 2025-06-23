import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  { href: 'https://github.com/AbhishekLuffy', label: 'GitHub', icon: <FaGithub /> },
  { href: 'https://www.linkedin.com/in/abhishek-p-1007062b8', label: 'LinkedIn', icon: <FaLinkedin /> },
];

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="bg-gray-950 text-gray-300 border-t border-gray-800 px-6 py-10 mt-16 relative"
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left: Name & tagline */}
        <div className="flex flex-col gap-2 md:items-start items-center">
          <span className="text-xl font-bold text-white">Abhishek P</span>
          <span className="text-sm text-gray-400">Building solutions one line at a time</span>
        </div>
        {/* Center: Navigation */}
        <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-blue-400 transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Right: Socials */}
        <div className="flex flex-col md:items-end items-center gap-2">
          <div className="flex gap-4 mb-1">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-gray-400 hover:text-blue-400 transition-colors text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 Abhishek P. All rights reserved.
      </div>
      {/* Scroll to top button */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        initial={{ opacity: 0, y: 20 }}
        animate={showScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        style={{ pointerEvents: showScroll ? 'auto' : 'none' }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" /></svg>
      </motion.button>
    </motion.footer>
  );
}