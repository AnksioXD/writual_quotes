import React, { useState, useEffect } from 'react'
import QuoteCard from './components/QuoteCard';
import TitleBar from './components/TitleBar';
import Toolbar from './components/Toolbar';
import { invoke } from '@tauri-apps/api/core';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import toast, { Toaster } from 'react-hot-toast';

function App() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);
    const [ttsEnabled, setTTSEnabled] = useState(false);
    const toggleTTS = () => setTTSEnabled(prev => !prev);

    const [copyIconColor, setCopyIconColor] = useState("");
    const [saveIconColor, setSaveIconColor] = useState("");

    const [locked, setLocked] = useState(false);

    function toggleLock() {
        const nextLocked = !locked;
        setLocked(nextLocked);

        const notify = () =>
            toast(`Widget has been ${nextLocked ? 'locked' : 'unlocked'}.`);

        notify();
    }

    const fetchQuote = async () => {
        setLoading(true);

        try {
            const result = await invoke('fetch_quote');
            const fullQuote = `"${result.text}" — ${result.author.name}`;

            setQuote(result.text);
            setAuthor(result.author.name);

            if (ttsEnabled) {
                await playTTS(fullQuote);
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
            setQuote('Failed to load quote.');
            setAuthor('');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    async function copyQuote() {
        const notify = () => toast('Quote has been copied.');

        if (quote) {
            const formatted = `"${quote}"\n— ${author}`;
            try {
                await writeText(formatted);
                if (copyIconColor != "#90806F") {
                    setCopyIconColor("#90806F");
                } else {
                    setCopyIconColor("transparent")
                }
                setTimeout(() => setCopyIconColor(""), 2000);
                notify();
            } catch (e) {
                console.error("Failed to copy quote:", e);
            }
        }
    }

    function saveQuote() {
        if (saveIconColor != "#90806F") {
            const notify = () => toast('Quote has been saved.');

            setSaveIconColor("#90806F");
            notify();
        } else {
            const notify = () => toast('Quote has been unsaved.');

            setSaveIconColor("transparent")
            notify();

        }
    }

    function handleSavedQuotes() {
        const notify = () => toast('In Development.');
        notify();
    }

    async function playTTS(text, voice = "en-US-BrianNeural") {
        try {
            const socket = new WebSocket("ws://localhost:4000");

            socket.binaryType = "arraybuffer";
            let audioChunks = [];

            socket.onopen = () => {
                socket.send(JSON.stringify({ text, voice }));
            };

            socket.onmessage = (event) => {
                if (event.data === "<<END>>") {
                    const blob = new Blob(audioChunks, { type: "audio/wav" });
                    const url = URL.createObjectURL(blob);
                    const audio = new Audio(url);
                    audio.play();
                    audio.onended = () => URL.revokeObjectURL(url);
                    socket.close();
                    return;
                }
                audioChunks.push(event.data);
            };

            socket.onerror = (err) => console.error("WebSocket error", err);
        } catch (e) {
            console.error("Failed to play TTS:", e);
        }
    }

    return (
        <div className="text-xl overflow-hidden font-eb-garamond flex flex-col justify-center items-center px-6 select-none border border-[#655A4E] border-b-2 rounded-[0.5rem] h-screen background-image">
            <TitleBar locked={locked} />
            <QuoteCard quote={quote} author={author} loading={loading} />
            <Toolbar
                onRefresh={fetchQuote}
                onCopy={copyQuote}
                onSaveQuote={saveQuote}
                copyIconColor={copyIconColor}
                saveIconColor={saveIconColor}
                locked={locked}
                toggleLock={toggleLock}
                handleSavedQuotes={handleSavedQuotes}
                ttsEnabled={ttsEnabled}
                toggleTTS={toggleTTS}
            />

            <Toaster position='top-center' toastOptions={{
                duration: 1000,
                className: '',
                style: {
                    border: '1px solid #90806F',
                    padding: '6px',
                    color: '#90806F',
                    backgroundColor: '#080807'
                },
            }} />
        </div>
    )
}

export default App