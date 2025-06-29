import React from "react";
import { Clipboard, FolderHeart, Lock, Heart, LockOpen } from "lucide-react";
import Tooltip from "./Tooltip";
import { Sparkles } from "lucide-react";
import { Volume2, VolumeX } from "lucide-react";

function Toolbar({ onRefresh, onCopy, onSaveQuote, copyIconColor, saveIconColor, locked, toggleLock, handleSavedQuotes, ttsEnabled, toggleTTS }) {
    return (
        <footer className="flex justify-around text-[#90806F] w-full py-6">
            <Tooltip text="Get Inspired" position="right">
                <button onClick={onRefresh} className="cursor-pointer hover:text-[#cfd785]">
                    <Sparkles />
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
            {/* <Tooltip text={ttsEnabled ? "Disable Voice" : "Enable Voice"} position="left">
                <button onClick={toggleTTS} className="cursor-pointer hover:text-[#a68bff]">
                    {ttsEnabled ? <Volume2 /> : <VolumeX />}
                </button>
            </Tooltip> */}
            <Tooltip text={locked ? "Unlock Widget" : "Lock Widget"} position="left">
                <button onClick={toggleLock} className="cursor-pointer hover:text-[#ff6868]">
                    {locked ? <Lock color="#ff6868" /> : <LockOpen />}
                </button>
            </Tooltip>
        </footer>
    );
}

export default Toolbar;
