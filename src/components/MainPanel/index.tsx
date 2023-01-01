import React from 'react';

interface Props {
    children: React.ReactNode;
}

export default function MainPanel({ children }: Props) {
    return (
        <div className="main-panel">
            <h2>Main Panel</h2>
            { children }
        </div>
    )
}