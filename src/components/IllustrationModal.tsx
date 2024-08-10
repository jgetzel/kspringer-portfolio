import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Define the structure of an individual illustration
interface Illustration {
  imageUrl: string;
  title: string;
  description: string;
}

// Define the props for the IllustrationModal component
interface IllustrationModalProps {
  illustrations: Illustration[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

/**
 * Main IllustrationModal component
 * Displays a modal with navigation controls for browsing through illustrations
 */
const IllustrationModal: React.FC<IllustrationModalProps> = ({
  illustrations,
  currentIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const { direction, handlePrevious, handleNext } = useImageNavigation(
    illustrations.length,
    currentIndex,
    onNavigate
  );
  useKeyboardNavigation({ onPrevious: handlePrevious, onNext: handleNext, onClose });

  if (!isOpen) return null;

  const currentIllustration = illustrations[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.35 }}
        className="bg-white shadow-xl w-full mx-4 flex flex-col h-[80vh] w-[90vw] rounded-lg p-4"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="relative flex-grow overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
            <X size={24} />
          </button>

          <NavigationButtons onPrevious={handlePrevious} onNext={handleNext} />

          <AnimatedImage
            src={currentIllustration.imageUrl}
            alt={currentIllustration.title}
            direction={direction}
          />
        </div>

        <div className="p-4 bg-white">
          <h2 className="text-2xl font-bold mb-2">{currentIllustration.title}</h2>
          <p className="text-gray-600">{currentIllustration.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Custom hook to handle image navigation
 * @param totalImages Total number of images
 * @param currentIndex Current image index
 * @param onNavigate Function to call when navigating to a new index
 * @returns Object containing direction and navigation functions
 */
const useImageNavigation = (
    totalImages: number,
    currentIndex: number,
    onNavigate: (newIndex: number) => void
  ) => {
    const [direction, setDirection] = React.useState<number>(0);
  
    const handlePrevious = () => {
      setDirection(-1);
      onNavigate((currentIndex - 1 + totalImages) % totalImages);
    };
  
    const handleNext = () => {
      setDirection(1);
      onNavigate((currentIndex + 1) % totalImages);
    };
  
    return { direction, handlePrevious, handleNext };
  };

  /**
 * Custom hook to handle keyboard navigation
 * @param onPrevious Function to call when navigating to the previous item
 * @param onNext Function to call when navigating to the next item
 * @param onClose Function to call when closing the modal
 */
const useKeyboardNavigation = ({
    onPrevious,
    onNext,
    onClose
  }: {
    onPrevious: () => void;
    onNext: () => void;
    onClose: () => void;
  }) => {
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowLeft':
            onPrevious();
            break;
          case 'ArrowRight':
            onNext();
            break;
          case 'Escape':
            onClose();
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onPrevious, onNext, onClose]);
  };

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * NavigationButtons component
 * Renders previous and next navigation buttons
 */
const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext }) => (
  <div className="flex justify-between items-center absolute inset-y-0 w-full z-10">
    <button onClick={onPrevious} className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 ml-4">
      <ChevronLeft size={24} />
    </button>
    <button onClick={onNext} className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mr-4">
      <ChevronRight size={24} />
    </button>
  </div>
);

interface AnimatedImageProps {
  src: string;
  alt: string;
  direction: number;
}

/**
 * AnimatedImage component
 * Renders an image with enter/exit animations
 */
const AnimatedImage: React.FC<AnimatedImageProps> = ({ src, alt, direction }) => (
  <AnimatePresence initial={false} custom={direction}>
    <motion.div
      key={src}
      custom={direction}
      variants={{
        enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
      className="absolute w-full h-full flex items-center justify-center"
    >
      <img
        src={src}
        className="max-w-full max-h-full object-contain cursor-pointer"
        onClick={() => window.open(src, '_blank')}
        alt={alt}
      />
    </motion.div>
  </AnimatePresence>
);

export default IllustrationModal;