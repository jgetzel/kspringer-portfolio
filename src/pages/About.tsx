import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';

const About: React.FC = () => {
  const pageAnimVariants = {
    exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
    visible: { opacity: 1, y: 0 },
    beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
  };

  return (
    <motion.div
      key="about"
      initial="beforeEnter"
      animate="visible"
      exit="exit"
      variants={pageAnimVariants}
      transition={{ duration: PAGE_TRANSITION_DURATION }}
      className="flex flex-col items-center justify-center min-h-screen p-4 font-karla"
    >
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="w-48 h-48 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8">
            <img 
              src="/api/placeholder/300/300" 
              alt="Kristina Springer" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Kristina Springer</h1>
            <h2 className="text-xl text-gray-600 mb-4">Illustrator & Game Designer</h2>
            <p className="text-gray-700">
              Welcome to my portfolio! Here you can find my work and get in touch with me.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <ContactLink 
            href="mailto:your.email@example.com" 
            icon={<Mail className="w-5 h-5" />}
            text="your.email@example.com"
          />
          <ContactLink 
            href="https://www.linkedin.com/in/yourprofile" 
            icon={<Linkedin className="w-5 h-5" />}
            text="LinkedIn Profile"
          />
          <ContactLink 
            href="https://github.com/yourusername" 
            icon={<Github className="w-5 h-5" />}
            text="GitHub Profile"
          />
        </div>
      </div>
    </motion.div>
  );
};

const ContactLink: React.FC<{ href: string; icon: React.ReactNode; text: string }> = ({ href, icon, text }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
  >
    {icon}
    <span className="ml-3">{text}</span>
  </a>
);

export default About;