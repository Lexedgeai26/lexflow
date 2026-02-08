import React from 'react';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex bg-neutral-50 min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 lg:p-12">
                <div className="max-w-7xl mx-auto animate-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
