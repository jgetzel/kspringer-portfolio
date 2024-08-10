import React from 'react';
import { motion } from 'framer-motion';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';

const About: React.FC = () => {
  return (
    <motion.div
        key="about"
        initial="beforeEnter"
        animate="visible"
        exit="exit"
        variants={{
            exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
            visible: { opacity: 1, y: 0 },
            beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
        }}
        transition={{ duration: PAGE_TRANSITION_DURATION }}
    >
      <h1>About</h1>
      <p>This is the about page.</p>
      <div className="flex justify-center items-center space-x-2">
          <img src="/path-to-instagram-icon.png" alt="Instagram" className="w-5 h-5" />
          <span>kristina s.</span>
          <img src="/path-to-link-icon.png" alt="Link" className="w-5 h-5" />
          <a href="https://linktr.ee/eowmie" className="text-blue-500 hover:underline">linktr.ee/eowmie</a>
        </div>
    </motion.div>
  );
};

export default About;