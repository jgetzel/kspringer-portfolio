import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Illustrations from './pages/Illustrations';
import Games from './pages/Games';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Home from './pages/Home';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <main className="flex-1 m-4">
          <Outlet /> {/* This is where the routed components will be rendered */}
        </main>
        <Sidebar /> {/* Adjust the width of the sidebar as needed */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Assuming you have a Home component */}
          <Route path="illustrations" element={<Illustrations />} />
          <Route path="games" element={<Games />} />
          {/* other routes */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;