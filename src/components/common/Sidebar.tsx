import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const linkIsActive = (pathname: string) => location.pathname === pathname ? 
        'text-black font-bold hover:text-gray-500' : 
        'text-gray-400 hover:text-gray-700';

    const linkStyle = 'block px-4 py-2 rounded-md';
    
    return (
        <div className="sidebar sticky top-0 right-0 z-10 bg-white p-4 w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 h-screen overflow-y-auto">
            <div className="flex flex-col items-center">
                {/* Logo or header section */}
                <div className="mb-6">
                    <Link to="/">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                </div>

                {/* Navigation links section */}
                <nav className="flex flex-col w-full">
                    <ul className="space-y-2 text-center font-karla"> {/* Added text-center class */}
                        <li>
                            <Link to="/" className={`${linkStyle} ${linkIsActive('/')}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/illustrations" className={`${linkStyle} ${linkIsActive('/illustrations')}`}>Illustrations</Link>
                        </li>
                        <li>
                            <Link to="/games" className={`${linkStyle} ${linkIsActive('/games')}`}>Games</Link>
                        </li>
                        {/* <li>
                            <Link to="/about" className={`${linkStyle} ${linkIsActive('/about')}`}>About</Link>
                        </li> */}
                        {/* Add more links as needed */}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;