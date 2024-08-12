import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react';
import { illustrationsData } from '../data/illustrationsData';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';
import { loadImageDimensions } from '../helpers/IllustrationHelper';
import { GamesData } from '../data/GamesData';

interface NormalizedIllustration {
    id: string;
    title?: string;
    imageUrl: string;
    normalizedWidth: number;
    normalizedHeight: number;
    isLoaded: boolean;
}

interface NormalizedGame {
    title: string;
    imageUrl: string;
    normalizedWidth: number;
    normalizedHeight: number;
    isLoaded: boolean;
}

const Home: React.FC = () => {
    const [normalizedIllustrations, setNormalizedIllustrations] = useState<NormalizedIllustration[][]>([]);
    const [normalizedGames, setNormalizedGames] = useState<NormalizedGame[]>([]);

    const [containerWidth, setContainerWidth] = useState(0);

    const pageAnimVariants = {
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
    };

    useEffect(() => {
        const updateContainerWidth = () => {
            setContainerWidth(window.innerWidth * 0.8); // Adjust this multiplier as needed
        };

        updateContainerWidth();
        window.addEventListener('resize', updateContainerWidth);

        return () => window.removeEventListener('resize', updateContainerWidth);
    }, []);

    useEffect(() => {
        const normalizeIllustrations = async () => {
            const targetHeight = 200; // Reduced height for two rows
            const rows: NormalizedIllustration[][] = [[], []];
            let currentRowWidth = [0, 0];

            // First, create placeholder elements for all illustrations
            for (const illustration of illustrationsData) {
                const rowIndex = currentRowWidth[0] <= currentRowWidth[1] ? 0 : 1;
                const placeholderWidth = 200; // Default placeholder width

                if (currentRowWidth[rowIndex] + placeholderWidth <= containerWidth) {
                    rows[rowIndex].push({
                        ...illustration,
                        normalizedWidth: placeholderWidth,
                        normalizedHeight: targetHeight,
                        isLoaded: false
                    });
                    currentRowWidth[rowIndex] += placeholderWidth;
                    setNormalizedIllustrations([...rows]);
                }

                // Stop if both rows are filled
                if (rows[0].length > 0 && rows[1].length > 0 && 
                    currentRowWidth[0] + placeholderWidth > containerWidth && 
                    currentRowWidth[1] + placeholderWidth > containerWidth) {
                    break;
                }
            }

            // Then, load actual dimensions and update
            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
                    const illustration = rows[rowIndex][colIndex];
                    const { width, height } = await loadImageDimensions(illustration.imageUrl);
                    const normalizedWidth = (width / height) * targetHeight;

                    rows[rowIndex][colIndex] = {
                        ...illustration,
                        normalizedWidth,
                        normalizedHeight: targetHeight,
                        isLoaded: true
                    };

                    setNormalizedIllustrations([...rows]);
                }
            }
        };

        const normalizeGames = async () => {
            const targetHeight = 200;
            const row: NormalizedGame[] = [];
            let currentRowWidth = 0;

            // Create placeholder elements for games
            for (const game of GamesData) {
                const placeholderWidth = 200;

                if (currentRowWidth + placeholderWidth <= containerWidth) {
                    row.push({
                        ...game,
                        normalizedWidth: placeholderWidth,
                        normalizedHeight: targetHeight,
                        isLoaded: false
                    });
                    currentRowWidth += placeholderWidth;
                    setNormalizedGames([...row]);
                } else {
                    break;
                }
            }

            // Load actual dimensions and update
            for (let i = 0; i < row.length; i++) {
                const game = row[i];
                const { width, height } = await loadImageDimensions(game.imageUrl);
                const normalizedWidth = (width / height) * targetHeight;

                row[i] = {
                    ...game,
                    normalizedWidth,
                    normalizedHeight: targetHeight,
                    isLoaded: true
                };

                setNormalizedGames([...row]);
            }
        };

        if (containerWidth > 0) {
            normalizeIllustrations();
            normalizeGames();
        }
    }, [containerWidth]);

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
                                style={{
                                    width: `${illustration.normalizedWidth}px`,
                                    height: `${illustration.normalizedHeight}px`,
                                }}
                            >
                                {illustration.isLoaded ? (
                                    <img
                                        src={illustration.imageUrl}
                                        alt={illustration.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                        <Loader className="animate-spin text-gray-400" size={24} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-center p-2 text-sm">{illustration.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ))}
                <div className="mt-8 text-center">
                    <Link to="/illustrations" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base">
                        View All Illustrations
                        <ArrowRight className="ml-1" size={18} />
                    </Link>
                </div>
            </section>

            <Divider />

            <section className="mb-4 w-full max-w-full">
                <div className="flex justify-center mb-3">
                    {normalizedGames.map((game, index) => (
                        <motion.div
                            key={game.title}
                            className="relative group overflow-hidden rounded-lg shadow-lg mr-3 flex-shrink-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            style={{
                                width: `${game.normalizedWidth}px`,
                                height: `${game.normalizedHeight}px`,
                            }}
                        >
                            {game.isLoaded ? (
                                <img
                                    src={game.imageUrl}
                                    alt={game.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <Loader className="animate-spin text-gray-400" size={24} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white text-center p-2 text-sm">{game.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                    <Link to="/games" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 text-base">
                        View All Games
                        <ArrowRight className="ml-1" size={18} />
                    </Link>
                </div>
            </section>
        </motion.div>
    );
};

const Divider: React.FC = () => (
    <div className="w-full max-w-3xl mx-auto my-10 border-t border-white"></div>
);

export default Home;