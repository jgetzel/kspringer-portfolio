import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { illustrationsData } from '../data/illustrationsData';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';
import { loadImageDimensions } from '../helpers/IllustrationHelper';

interface NormalizedIllustration {
    id: string;
    title: string;
    imageUrl: string;
    normalizedWidth: number;
    normalizedHeight: number;
}

const Home: React.FC = () => {
    const [normalizedIllustrations, setNormalizedIllustrations] = useState<NormalizedIllustration[][]>([]);

    const pageAnimVariants = {
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
    };

    useEffect(() => {
        const normalizeIllustrations = async () => {
            const containerWidth = window.outerWidth * 1;
            const targetHeight = 200; // Reduced height for two rows
            const rows: NormalizedIllustration[][] = [[], []];
            let currentRowWidth = [0, 0];

            for (const illustration of illustrationsData) {
                const { width, height } = await loadImageDimensions(illustration.imageUrl);
                const normalizedWidth = (width / height) * targetHeight;

                const rowIndex = currentRowWidth[0] <= currentRowWidth[1] ? 0 : 1;

                if (currentRowWidth[rowIndex] + normalizedWidth <= containerWidth) {
                    rows[rowIndex].push({
                        ...illustration,
                        normalizedWidth,
                        normalizedHeight: targetHeight
                    });
                    currentRowWidth[rowIndex] += normalizedWidth;
                    
                    // Update state immediately after each image is processed
                    setNormalizedIllustrations([...rows]);
                }

                // Stop if both rows are filled
                if (rows[0].length > 0 && rows[1].length > 0 && 
                    currentRowWidth[0] + normalizedWidth > containerWidth && 
                    currentRowWidth[1] + normalizedWidth > containerWidth) {
                    break;
                }
            }
        };

        normalizeIllustrations();
    }, []);

    return (
        <motion.div
            key="home"
            initial="beforeEnter"
            animate="visible"
            exit="exit"
            variants={pageAnimVariants}
            transition={{ duration: PAGE_TRANSITION_DURATION }}
            className="flex flex-col justify-center items-center mt-2 mx-4 sm:mx-6 md:mx-12 lg:mx-24 font-karla"
        >
            <header className="text-center">
                <img src='/images/logo.png' alt="Kristina Springer" className="w-80 h-auto" />
                <h2 className="text-lg text-gray-600">Illustrator & Game Designer</h2>
            </header>

            <Divider />

            <section className="mb-4 w-full max-w-full">
                {normalizedIllustrations.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center mb-3">
                        {row.map((illustration, index) => (
                            <motion.div
                                key={illustration.id}
                                className="relative group overflow-hidden rounded-lg shadow-lg mr-3 flex-shrink-0"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                <img
                                    src={illustration.imageUrl}
                                    alt={illustration.title}
                                    style={{
                                        width: `${illustration.normalizedWidth}px`,
                                        height: `${illustration.normalizedHeight}px`,
                                        objectFit: 'cover'
                                    }}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-center p-2 text-sm">{illustration.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
                <div className="mt-4 text-center">
                    <Link to="/illustrations" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base">
                        View All Illustrations
                        <ArrowRight className="ml-1" size={18} />
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

const Divider: React.FC = () => (
    <div className="w-full max-w-3xl mx-auto my-12 border-t border-white"></div>
);

export default Home;