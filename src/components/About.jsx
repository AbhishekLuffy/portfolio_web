import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const bio = [
  { label: 'Date of Birth', value: '14-11-2004' },
  { label: 'Marital Status', value: 'Single' },
  { label: 'Nationality', value: 'Indian' },
  { label: 'Hobbies', value: 'Listening to music, Playing cricket' },
  { label: 'Languages Known', value: 'English, Kannada, Hindi' },
  { label: 'Strengths', value: 'Hard-working, Team Player, Eager to Learn' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, type: 'spring' } });
    } else {
      controls.start({ x: -100, opacity: 0, transition: { duration: 0.5 } });
    }
  }, [inView, controls]);

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={controls}
      className="py-12 sm:py-20 px-2 sm:px-4 flex justify-center items-center bg-black"
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-2xl w-full mx-auto border border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-blue-400 text-center tracking-tight">About Me</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {bio.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-2 items-center border-b border-gray-700 py-2 last:border-b-0"
            >
              <span className="font-medium text-gray-300 text-sm sm:text-base text-left">
                {item.label}:
              </span>
              <span className="text-gray-100 text-base font-semibold text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}