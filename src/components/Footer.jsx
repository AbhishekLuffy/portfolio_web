import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const socials = [
  { href: 'https://github.com/username', label: 'GitHub', icon: (
    <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .26.18.57.69.47A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>
  ) },
  { href: 'https://linkedin.com/in/username', label: 'LinkedIn', icon: (
    <svg width="24" height="24" fill="currentColor" className="inline-block"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
  ) },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1, transition: { duration: 0.8, type: 'spring' } });
    } else {
      controls.start({ y: 100, opacity: 0, transition: { duration: 0.5 } });
    }
  }, [inView, controls]);

  return (
    <motion.footer
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={controls}
      className="p-8 text-center bg-black border-t border-gray-800 mt-12"
    >
      <div className="flex justify-center gap-8 mb-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
      <div className="text-gray-500 font-medium text-base">© 2025 Abhishek P</div>
    </motion.footer>
  );
}