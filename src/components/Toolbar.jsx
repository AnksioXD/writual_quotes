import React from "react";
import { Clipboard, FolderHeart, Lock, Heart, RotateCcw, LockOpen } from "lucide-react";
import Tooltip from "./Tooltip";

function Toolbar({ onRefresh, onCopy, onSaveQuote, copyIconColor, saveIconColor, locked, toggleLock, handleSavedQuotes }) {
    return (
        <footer className="flex justify-around text-[#90806F] w-full py-6">
            <Tooltip text="Refresh Quote" position="right">
                <button onClick={onRefresh} className="cursor-pointer hover:text-[#cfd785]">
                    <RotateCcw />
                </button>
            </Tooltip>
            <Tooltip text="Copy Quote">
                <button onClick={onCopy} className="cursor-pointer hover:text-[#94d798]">
                    <Clipboard fill={copyIconColor || "transparent"} />
                </button>
            </Tooltip>
            <Tooltip text="Save Quote">
                <button onClick={onSaveQuote} className="cursor-pointer hover:text-[#ff83e8]">
                    <Heart stroke="currentColor" fill={saveIconColor || "transparent"} />
                </button>
            </Tooltip>
            <Tooltip text="View Saved Quotes">
                <button className="cursor-pointer hover:text-[#acd2f9]" onClick={handleSavedQuotes}>
                    <FolderHeart />
                </button>
            </Tooltip>
            <Tooltip text={locked ? "Unlock Widget" : "Lock Widget"} position="left">
                <button onClick={toggleLock} className="cursor-pointer hover:text-[#ff6868]">
                    {locked ? <Lock color="#ff6868" /> : <LockOpen />}
                </button>
            </Tooltip>
        </footer>
    );
}

export default Toolbar;
