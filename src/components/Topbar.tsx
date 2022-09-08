import React from 'react';

interface TopbarProps {
    children: React.ReactNode;
}

function Topbar({ children }: TopbarProps) {

    return (
        <div className="flex flex-row bg-zinc-800 w-screen h-8 text-white text-sm">
            {children}
        </div>
    );
}

export default Topbar;