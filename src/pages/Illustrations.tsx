import React, { useState, useEffect } from 'react';
import IllustrationCard from '../components/IllustrationCard';
import { illustrationsData } from '../data/illustrationsData';
import { Illustration } from '../types/Illustration';
import { motion } from 'framer-motion';
import IllustrationModal from '../components/IllustrationModal';
import { loadImageDimensions } from '../helpers/IllustrationHelper';



type ColumnsType = Illustration[][];

const loadAllImages = async (illustrations: Illustration[], columnsAmount: number, setColumns: (columns: ColumnsType) => any) => {
  const standardColumnWidth = 200; // Adjust this value based on your column width

  const illustrationsWithDimensions = await Promise.all(
    illustrations.map(async (illustration) => {
      const { width, height } = await loadImageDimensions(illustration.imageUrl);
      const normalizedHeight = (height / width) * standardColumnWidth;
      return { ...illustration, height, normalizedHeight };
    })
  );

  // Initialize columns and column heights based on columnsAmount
  const newColumns: ColumnsType = Array.from({ length: columnsAmount }, () => []);
  let columnHeights = new Array(columnsAmount).fill(0);

  illustrationsWithDimensions.forEach(illustration => {
    const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    newColumns[shortestColumnIndex].push(illustration);
    columnHeights[shortestColumnIndex] += illustration.normalizedHeight || 0;
  });

  setColumns(newColumns);
};

const Illustrations: React.FC = () => {
  const [illustrations, setIllustrations] = useState<Illustration[]>(illustrationsData);
  const [selectedIllustration, setSelectedIllustration] = useState<Illustration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [columns, setColumns] = useState<ColumnsType>([]);
  const [columnsAmount, setColumnsAmount] = useState<number>(3);

  useEffect(() => {
    // Function to update the state based on screen width
    const handleResize = () => {
      setColumnsAmount(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    loadAllImages(illustrations, columnsAmount, setColumns);
  }, [illustrations, columnsAmount]);


  const handleCardClick = (illustration: Illustration) => {
    setSelectedIllustration(illustration);
    setIsModalOpen(true);
  };

  const gridClass = () => "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <IllustrationModal illustration={selectedIllustration} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className={`m-4 md:m-8 lg:m-16 xl:m-32 flex flex-row grid gap-10 ${gridClass}`}>
        {columns.map((column, index) => (
          <div key={index} className="flex flex-col gap-4 md:gap-8">
            {column.map((illustration, illustrationIndex) => (
              <motion.div
                key={illustration.id}
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{ duration: 0.5, delay: Number(illustration.id) * 0.1 }}
              >
                <IllustrationCard illustration={illustration} onClick={handleCardClick} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Illustrations;