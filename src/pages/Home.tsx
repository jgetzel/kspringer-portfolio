import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { illustrationsData } from '../data/illustrationsData';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';
import { loadImageDimensions } from '../helpers/IllustrationHelper';

const Home: React.FC = () => {
    const [normalizedIllustrations, setNormalizedIllustrations] = useState<any[]>([]);

    const pageAnimVariants = {
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE }
    };

    useEffect(() => {
        const normalizeIllustrations = async () => {
            const containerWidth = window.innerWidth * 0.8;
            const targetHeight = 200;
            let currentRowWidth = 0;
            const normalized = [];

            for (const illustration of illustrationsData) {
                const { width, height } = await loadImageDimensions(illustration.imageUrl);
                const normalizedWidth = (width / height) * targetHeight;

                if (currentRowWidth + normalizedWidth > containerWidth) {
                    break;
                }

                normalized.push({
                    ...illustration,
                    normalizedWidth,
                    normalizedHeight: targetHeight
                });

                currentRowWidth += normalizedWidth;
            }

            setNormalizedIllustrations(normalized);
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
            className="flex flex-col justify-center items-center mt-16 mx-4 sm:mx-8 md:mx-16 lg:mx-32 font-karla"
        >
            <header className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Kristina Springer</h1>
                <h2 className="text-2xl text-gray-600">Illustrator & Game Designer</h2>
            </header>

            <section className="mb-16 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                    <p className="text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, laborum. Harum, quae. Voluptatem, omnis necessitatibus ratione error labore architecto! Iusto sunt incidunt officiis dolorem quidem et eius. Placeat, repellendus iusto?
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="https://via.placeholder.com/800x400"
                        alt="Portfolio Header"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>
            </section>

            <Divider />

            <section className="mb-16 w-full">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Illustrations</h2>
                <div className="flex overflow-x-auto pb-4">
                    {normalizedIllustrations.map((illustration) => (
                        <div key={illustration.id} className="relative group overflow-hidden rounded-lg shadow-lg mr-4 flex-shrink-0">
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
                                <p className="text-white text-center p-4">{illustration.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Link to="/illustrations" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 text-lg">
                        View All Illustrations
                        <ArrowRight className="ml-2" size={24} />
                    </Link>
                </div>
            </section>

            <Divider />

            <section className="mb-16 w-full">
                <h2 className="text-3xl font-bold mb-8 text-center">Latest Updates</h2>
                <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">New Game Coming Soon!</h3>
                    <p className="text-lg leading-relaxed">
                        I'm excited to announce that I'm working on a new interactive game.
                        Stay tuned for more details and a sneak peek in the coming weeks!
                    </p>
                </div>
            </section>

            <Divider />

            <section className="text-center max-w-2xl mb-16">
                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                <p className="text-lg mb-8 leading-relaxed">
                    I love hearing from fellow artists, gamers, and creative minds.
                    Feel free to reach out if you have any questions or just want to chat about art and games!
                </p>
                <Link to="/about" className="inline-block bg-gray-600 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-colors duration-300 text-lg">
                    Learn More About Me
                </Link>
            </section>
        </motion.div>
    );
};

const Divider: React.FC = () => (
    <div className="w-full max-w-4xl mx-auto my-12 border-t border-gray-300"></div>
);

export default Home;