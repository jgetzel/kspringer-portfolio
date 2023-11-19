import React from 'react';
import { Illustration } from '../types/Illustration';
import { motion } from 'framer-motion';

type IllustrationCardProps = {
  illustration: Illustration;
  onClick: (illustration: Illustration) => void;
};

const IllustrationCard: React.FC<IllustrationCardProps> = ({ illustration, onClick = (_) => {} }) => {

  return (
    <motion.div
      className="w-full z-0"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img className="w-full h-auto shadow-lg" src={illustration.imageUrl} alt={illustration.title} onClick={() => onClick(illustration)} />
    </motion.div>
  );
};

export default IllustrationCard;
