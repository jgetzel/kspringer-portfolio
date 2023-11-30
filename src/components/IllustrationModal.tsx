import { motion, AnimatePresence } from 'framer-motion';
import { Illustration } from '../types/Illustration';
import { useRef, useState } from 'react';

type IllustrationModalProps = {
    illustration: Illustration | null;
    isOpen: boolean;
    onClose: () => void;
};

const IllustrationModal: React.FC<IllustrationModalProps> = ({ illustration, isOpen, onClose }) => {
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);

    const modalFadeTransitionTime = 0.35;

    const handleClose = () => {
        setIsAnimating(true);
        async function wait() {
            onClose();
        }
        wait();
    }

    const handleCloseOnBgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target !== modalRef.current) {
            handleClose();
        }
    }

    const handleImageClick = () => {
        if (isAnimating) return;
        window.open(illustration!.imageUrl, '_blank');
    }

    // Modal fade in animation
    const modalVariants = {
        hidden: { opacity: 0 , y: -50},
        visible: { opacity: 1, y: 0 }
    };

    if (!illustration) return null;

    return (
        <AnimatePresence onExitComplete={() => setIsAnimating(false)} custom={isAnimating}>
        {isOpen && (
            <div onClick={handleClose}>
                <motion.div 
                    key="modal-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{duration: modalFadeTransitionTime}}
                    onAnimationStart={() => setIsAnimating(true)}
                    onAnimationComplete={() => setIsAnimating(false)}
                    className="bg-black bg-opacity-50 fixed inset-0 z-50">
                </motion.div>
                <motion.div
                    key="modal-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={isAnimating ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
                    variants={modalVariants}
                    transition={{ duration: modalFadeTransitionTime }}
                    className="overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 
                                justify-center items-center max-w-full md:inset-0 max-h-full grid place-items-center"
                >
                    {/* Modal Content */}
                    <div className="p-4 rounded-lg shadow bg-white grid grid-cols-1" ref={modalRef}>
                        <div className={`relative group ${isAnimating ? 'pointer-events-none' : ''}`}>
                            <img 
                                src={illustration.imageUrl} 
                                alt={illustration.title} 
                                className='max-w-[90vw] max-h-[80vh] object-contain shadow-lg rounded-lg bg-gray-500'
                            />
                            <motion.span
                                key={illustration.id}
                                custom={isAnimating}
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                onClick={handleImageClick}
                                className="absolute cursor-pointer inset-0 flex justify-center items-center opacity-0 
                                                group-hover:opacity-100 bg-black bg-opacity-50 text-white 
                                                font-bold text-lg rounded-lg">
                                Click to view in full size
                            </motion.span>
                        </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row p-4 justify-between items-center">
                                    <h1 className="text-2xl font-karla font-bold">{illustration.title}</h1>
                                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-gray-500 font-karla px-4 pb-4">
                                    {illustration.description}</p>
                            </div>
                    </div>
                </motion.div>
            </div>
        )}
        </AnimatePresence>

    );
};

export default IllustrationModal;