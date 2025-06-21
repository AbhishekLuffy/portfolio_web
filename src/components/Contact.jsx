import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  const [responseMessage, setResponseMessage] = useState('');

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, type: 'spring' } });
    } else {
      controls.start({ x: 100, opacity: 0, transition: { duration: 0.5 } });
    }
  }, [inView, controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setResponseMessage('');

    const backendURL = import.meta.env.PROD
      ? 'https://portfolio-backend-oguu.onrender.com'
      : 'http://localhost:5000';

    try {
      const response = await fetch(`${backendURL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(data.message || 'Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        const errorMessage = data.details ? `${data.error}: ${data.details}` : data.error || 'An error occurred.';
        setResponseMessage(errorMessage);
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      initial={{ x: 100, opacity: 0 }}
      animate={controls}
      className="py-12 sm:py-20 px-2 sm:px-4 flex justify-center items-center bg-black"
    >
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 sm:p-10 max-w-md w-full mx-auto border border-gray-800">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center tracking-tight">Contact Me</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base border border-gray-700 focus:border-blue-400 transition-all duration-200"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base border border-gray-700 focus:border-blue-400 transition-all duration-200"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base border border-gray-700 focus:border-blue-400 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-200 text-lg disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {responseMessage && (
          <p className={`mt-4 text-center ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {responseMessage}
          </p>
        )}
      </div>
    </motion.section>
  );
}