import edge_tts
import asyncio
import websockets
import json
import os
import tempfile
import soundfile as sf
from pedalboard import Pedalboard, Reverb
from pedalboard.io import AudioFile

async def handle(websocket):
    async for msg in websocket:
        data = json.loads(msg)
        text = data.get("text", "Hello world")
        voice = data.get("voice", "en-US-BrianNeural")

        # Create and close temporary MP3 file
        raw_mp3 = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        raw_mp3_path = raw_mp3.name
        raw_mp3.close()  # Close immediately to prevent locking on Windows

        # Generate file paths
        raw_wav = raw_mp3_path.replace(".mp3", "_orig.wav")
        reverb_wav = raw_mp3_path.replace(".mp3", "_reverb.wav")

        # Synthesize TTS and save to raw_mp3_path

        tts = edge_tts.Communicate(text, voice)
        await tts.save(raw_mp3_path)


        # Step 1: Generate TTS MP3
        tts = edge_tts.Communicate(text, voice)
        await tts.save(raw_mp3.name)

        # Step 2: Convert to WAV using ffmpeg
        os.system(f"ffmpeg -y -i {raw_mp3.name} -ar 44100 -ac 1 {raw_wav}")

        # Step 3: Apply reverb using Pedalboard
        board = Pedalboard([Reverb(
            room_size=0.7,    # Much larger space for more echo
            damping=0.3,      # Less absorption, more reflections
            wet_level=0.5,   # More reverb in the mix
            dry_level=0.8,    # Still keep dry voice, but less dominant
            width=1.0,        # Full stereo
            freeze_mode=0.0
        )])
        with AudioFile(raw_wav) as f:
            audio = f.read(f.frames)
            processed = board(audio, f.samplerate)
            with AudioFile(reverb_wav, 'w', f.samplerate, f.num_channels) as out_f:
                out_f.write(processed)

        # Step 4: Stream reverb.wav as binary chunks
        with open(reverb_wav, "rb") as f:
            while chunk := f.read(2048):
                await websocket.send(chunk)

        await websocket.send("<<END>>")

        # Cleanup
        os.remove(raw_mp3.name)
        os.remove(raw_wav)
        os.remove(reverb_wav)

async def main():
    async with websockets.serve(handle, "localhost", 4000):
        print("TTS + Pedalboard Reverb server running at ws://localhost:4000")
        await asyncio.Future()

asyncio.run(main())
