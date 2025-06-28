import React from 'react'
import { Minus, X } from 'lucide-react'
import { getCurrentWindow } from "@tauri-apps/api/window";

function TitleBar({ locked }) {
    const appWindow = getCurrentWindow();

    const handleMinimize = () => {
        appWindow.minimize();
    };

    const handleClose = () => {
        appWindow.close();
    };

    return (
        <nav {...(!locked && { 'data-tauri-drag-region': true })} className="flex flex-row justify-between py-4 pb-5 w-full">
            <h1 className="text-[#9e978ade] hover:text-[#b0a38b]  font-cormorant-sc">Writual</h1>
            <div className="flex flex-row gap-2">
                <button className="cursor-pointer text-[#736e65] hover:text-[#84b991]" onClick={handleMinimize}><Minus /></button>
                <button className="cursor-pointer text-[#736e65] hover:text-[#d37d7d]" onClick={handleClose}><X /></button>
            </div>
        </nav>
    )
}

export default TitleBar