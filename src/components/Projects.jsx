import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Silent Sentinel',
    desc: 'An emergency alert system triggered by a secret voice command. It records audio evidence, fetches the user\'s location, and sends alerts via SMS (Twilio) and email (Gmail).',
    stack: ['Python', 'Twilio API', 'Gmail API', 'PyAudio'],
    github: 'https://github.com/AbhishekLuffy/Silent-Sentinel',
  },
  {
    name: 'Encryption & Decryption App',
    desc: 'Custom-built Blowfish and Twofish encryption system for large data files.',
    award: 'Awarded 2nd Prize at [Sai vidya institute of technology] for innovation and implementation.',
    stack: ['Python', 'Matplotlib', 'Crypto'],
    github: 'https://github.com/AbhishekLuffy/EncryptionDecryption',
  },
];

const cardVariants = {
  offscreen: (i) => ({ x: i % 2 === 0 ? -100 : 100, opacity: 0 }),
  onscreen: { x: 0, opacity: 1, transition: { type: 'spring', bounce: 0.2, duration: 0.8 } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-20 px-2 sm:px-4 bg-black">
      <h2 className="text-3xl font-bold text-blue-400 mb-10 text-center tracking-tight">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-800 min-w-0 cursor-pointer hover:shadow-2xl"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            custom={i}
            variants={cardVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-2 tracking-tight flex items-center gap-2">
              <span className="text-blue-400 text-2xl">{'</>'}</span>
              {proj.name}
            </h3>
            <p className="text-gray-300 flex-1 text-base">{proj.desc}</p>
            {proj.award && (
              <div className="my-2 px-3 py-2 rounded bg-yellow-300/20 border-l-4 border-yellow-400 font-semibold text-yellow-900 text-sm">
                {proj.award}
              </div>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {proj.stack.map((tech) => (
                <span key={tech} className="bg-blue-800 text-blue-200 px-2 py-1 rounded text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
            {proj.github ? (
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-400 hover:underline text-base font-medium"
              >
                View on GitHub
              </a>
            ) : (
              <span className="mt-4 inline-block text-gray-500 text-base">GitHub link coming soon</span>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}