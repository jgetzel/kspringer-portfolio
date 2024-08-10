import React from 'react';
import { HashRouter as Router, Route, Routes, Outlet, useLocation } from 'react-router-dom';
import Illustrations from './pages/Illustrations';
import Games from './pages/Games';
import About from './pages/About';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import { AnimatePresence } from 'framer-motion';



const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="illustrations" element={<Illustrations />} />
            <Route path="games" element={<Games />} />
            <Route path="about" element={<About />} />
            {/* other routes */}
          </Route>
        </Routes>
    </Router>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <main className="flex-1 m-4">
          <AnimatedContent /> {/* This is where the routed components will be rendered */}
        </main>
        <Sidebar /> {/* Adjust the width of the sidebar as needed */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const AnimatedContent: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="illustrations" element={<Illustrations />} />
        <Route path="games" element={<Games />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </AnimatePresence>
  );
};


export default App;