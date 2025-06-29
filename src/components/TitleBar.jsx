import React from 'react'
import { Minus, X } from 'lucide-react'
import { getCurrentWindow } from "@tauri-apps/api/window";
import Tooltip from "./Tooltip";
import { Pickaxe } from 'lucide-react';


function TitleBar({ locked }) {
    const appWindow = getCurrentWindow();

    const handleHide = () => {
        appWindow.hide();
    };

    const handleClose = () => {
        appWindow.close();
    };


    return (
        <nav {...(!locked && { 'data-tauri-drag-region': true })} className="flex flex-row justify-between py-4 pb-5 w-full">
            <h1 className="text-[#9e978ade] hover:text-[#b0a38b]  font-cormorant-sc flex gap-1  transition">
                Writual <p className="text-sm items-start hover:text-amber-300">alpha</p>
            </h1>
            <div className="flex flex-row gap-3">
                <Tooltip text="Minimize to tray" position="bottom">
                    <button onClick={handleHide} className="cursor-pointer text-[#736e65] hover:text-[#84b991]">
                        <Minus />
                    </button>
                </Tooltip>
                <Tooltip text="Close widget" position="left">

                    <button className="cursor-pointer text-[#736e65] hover:text-[#d37d7d]" onClick={handleClose}><X /></button>
                </Tooltip>
            </div>
        </nav>
    )
}

export default TitleBar