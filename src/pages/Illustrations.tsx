import React, { useState, useEffect } from 'react';
import IllustrationCard from '../components/IllustrationCard';
import { illustrationsData } from '../data/illustrationsData';
import { Illustration } from '../types/Illustration';
import { motion } from 'framer-motion';
import IllustrationModal from '../components/IllustrationModal';
import { loadImageDimensions } from '../helpers/IllustrationHelper';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';



type ColumnsType = Illustration[][];

const loadAllImages = async (
  illustrations: Illustration[],
  columnsAmount: number,
  setColumns: (columns: ColumnsType) => void
) => {
  const standardColumnWidth = 200; // Define the standard width for calculation of normalized height
  const newColumns: ColumnsType = Array.from({ length: columnsAmount }, () => []); // Initialize columns array with empty arrays for each column
  let columnHeights = new Array(columnsAmount).fill(0); // Keep track of the current height of each column

  for (const illustration of illustrations) { // Process each illustration sequentially
    const { width, height } = await loadImageDimensions(illustration.imageUrl); // Load the image dimensions    
    const normalizedHeight = (height / width) * standardColumnWidth; // Calculate the normalized height based on standard width
    const updatedIllustration = { ...illustration, height, normalizedHeight }; // Create updated illustration object with height information
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights)); // Find the column with the shortest height
    newColumns[shortestColumnIndex].push(updatedIllustration); // Add the illustration to the shortest column
    columnHeights[shortestColumnIndex] += normalizedHeight; // Update the height of the column

    // Update the state with the new columns
    // This triggers a re-render, showing the new image
    setColumns([...newColumns]);
  }
};

const Illustrations: React.FC = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>(illustrationsData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [columns, setColumns] = useState<ColumnsType>([]);
  const [columnsAmount, setColumnsAmount] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      setColumnsAmount(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadAllImages(illustrations, columnsAmount, setColumns);
  }, [illustrations, columnsAmount]);

  const handleCardClick = (clickedIllustration: Illustration) => {
    const index = illustrations.findIndex(ill => ill.id === clickedIllustration.id);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleModalNavigate = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const gridClass = () => "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  
  const cardMotionvariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  };

  const pageMotionVariants = {
    exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <IllustrationModal 
        illustrations={illustrations}
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNavigate={handleModalNavigate}
      />
      <motion.div
        key="illustrations-grid"
        exit="exit"
        variants={pageMotionVariants}
        transition={{ duration: PAGE_TRANSITION_DURATION }}
      >
        <div className={`m-4 md:m-8 lg:m-16 xl:m-32 flex flex-row grid gap-10 ${gridClass}`}>
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col gap-4 md:gap-8">
              {column.map((illustration) => (
                <motion.div
                  key={illustration.id}
                  initial="hidden"
                  animate="visible"
                  variants={cardMotionvariants}
                  transition={{ duration: 0.5, delay: Number(illustration.id) * 0.1 }}
                >
                  <IllustrationCard illustration={illustration} onClick={handleCardClick} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Illustrations;
