import { motion, AnimatePresence } from 'framer-motion';
import { Illustration } from '../types/Illustration';

type IllustrationModalProps = {
    illustration: Illustration | null;
    isOpen: boolean;
    onClose: () => void;
};

const IllustrationModal: React.FC<IllustrationModalProps> = ({ illustration, isOpen, onClose }) => {

  // Modal fade in animation
  const modalVariants = {
    hidden: { opacity: 0 , y: -50},
    visible: { opacity: 1, y: 0 }
  };

  const bgVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  if (!illustration) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        <motion.div 
            initial="hidden" 
            animate="visible" 
            exit="hidden" 
            variants={bgVariants} 
            transition={{duration: 0.5}}
         className="bg-black bg-opacity-50 fixed inset-0 z-50">
            </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.5 }}
            className="overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center max-w-full md:inset-0 max-h-full grid place-items-center"
        >
          {/* Modal Content */}
          <div className="p-4 rounded-lg shadow bg-white grid grid-cols-1">
            <img 
                src={illustration.imageUrl} 
                alt={illustration.title} 
                className='max-w-[90vw] max-h-[80vh] object-contain'
                />
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-karla font-bold">{illustration.title}</h1>
              <p className="text-gray-500 font-karla">{illustration.description}</p>
            </div>
            <button onClick={onClose}>Close</button>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>

  );
};

export default IllustrationModal;