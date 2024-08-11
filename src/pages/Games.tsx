import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import { PAGE_TRANSITION_DISTANCE, PAGE_TRANSITION_DURATION } from '../constants/animConstants';
import { Game, GamesData, Platform } from '../data/GamesData';

const Games: React.FC = () => {
  return (
    <motion.div
      key="games"
      initial="beforeEnter"
      animate="visible"
      exit="exit"
      variants={{
        exit: { opacity: 0, y: PAGE_TRANSITION_DISTANCE },
        visible: { opacity: 1, y: 0 },
        beforeEnter: { opacity: 0, y: -PAGE_TRANSITION_DISTANCE },
      }}
      transition={{ duration: PAGE_TRANSITION_DURATION }}
      className="font-karla justify-center items-center mt-16 mx-4 sm:mx-8 md:mx-16 lg:mx-32"
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Games Portfolio</h1>
      </header>

      <p className="text-center mb-8 text-xl">I ♥ makin and playin games!! woop woop</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {GamesData.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>

      <footer className="mt-16 text-sm text-gray-500">
        <p>
          Platform icons by{' '}
          <a 
            href="https://icons8.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            Icons8
          </a>
        </p>
      </footer>
    </motion.div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const ImageContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden aspect-square relative group transition-all duration-300 ease-in-out transform hover:scale-105">
      {children}
      {!game.link && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Lock className="text-white" size={32} />
        </div>
      )}
      {game.link && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="text-gray-600" size={16} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      {game.link ? (
        <a href={game.link} target="_blank" rel="noopener noreferrer" className="block">
          <ImageContainer>
            <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
          </ImageContainer>
        </a>
      ) : (
        <ImageContainer>
          <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
        </ImageContainer>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">{game.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{game.description}</p>
        <div className="flex flex-wrap items-center mb-2">
          {game.platforms.map((platform, index) => (
            <PlatformTag key={index} platform={platform} />
          ))}
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
            {game.genre}
          </span>
        </div>
      </div>
    </div>
  );
};

const PlatformTag: React.FC<{ platform: Platform }> = ({ platform }) => {
  const getIconPath = (platform: Platform) => {
    switch (platform) {
      case Platform.Browser: return '/icons/icons8-html-5-48.png';
      case Platform.Windows: return '/icons/icons8-windows8-48.png';
      case Platform.Linux: return '/icons/icons8-linux-52.png';
      case Platform.MacOS: return '/icons/icons8-mac-logo-50.png';
      case Platform.Android: return '/icons/icons8-android-os-48.png';
      case Platform.iOS: return '/icons/icons8-ios-50.png';
      default: return '';
    }
  };

  return (
    <span className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold mr-2">
      <img src={getIconPath(platform)} alt={platform} className="w-4 h-4 mr-1" />
      <span>{platform}</span>
    </span>
  );
};

export default Games;