import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const education = [
  {
    degree: 'Bachelor of Engineering (B.E.) in Information Science and Engineering',
    institution: 'Visvesvaraya Technological University (VTU)',
    college: 'Sai vidya institute of technology',
    year: '2022 – 2026(presently studying)',
  },
];

const skills = [
  {
    category: 'Languages & Technologies',
    items: [
      'Java',
      'Python',
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'React.js',
      'Tailwind CSS'
    ],
  },
  {
    category: 'Tools & Libraries',
    items: [
      'Git & GitHub',
      'VS Code',
      'Xcode',
      'Framer Motion',
    ],
  },
  {
    category: 'Other',
    items: [
      'Responsive Web Design',
      'API Integration',
      'Debugging & Code Optimization',
    ],
  },
];

export default function Resume() {
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
      id="resume"
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={controls}
      className="py-12 sm:py-20 px-2 sm:px-4 flex flex-col items-center bg-black"
    >
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center tracking-tight">Resume</h2>
      <a
        href="/Abhishek_Resume.pdf"
        download
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Download Resume
      </a>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-2xl w-full flex flex-col md:flex-row gap-8 border border-gray-800 mt-8">
        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
          <ul>
            {education.map((edu) => (
              <li key={edu.degree} className="mb-2">
                <span className="font-medium text-blue-300 text-base">{edu.degree}</span>
                <div className="text-gray-300 text-base">{edu.institution}</div>
                <div className="text-gray-300 text-base">{edu.college}</div>
                <div className="text-gray-400 text-sm">{edu.year}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
          <div className="flex flex-col gap-6">
            {skills.map((group) => (
              <div key={group.category}>
                <div className="text-blue-400 font-semibold mb-2 text-base">{group.category}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.08, backgroundColor: 'rgba(59,130,246,0.15)' }}
                      className="bg-gray-800 text-blue-100 px-3 py-1 rounded text-xs font-medium shadow-sm transition-colors duration-200 cursor-pointer"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}