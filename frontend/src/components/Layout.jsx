import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ isAuthenticated }) {
    return (
        <div className="min-h-screen flex flex-col">
            {isAuthenticated && <Navbar />}
            <main className={`flex-1 ${isAuthenticated ? 'bg-gray-100' : ''}`}>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout; 