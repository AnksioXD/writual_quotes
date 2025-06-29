<p align="center">
  <img src="src-tauri/icons/icon.png" alt="Writual Quotes Logo" width="120" />
</p>

<h1 align="center">📝 Writual Quotes</h1>

<p align="center">
  <em>A beautiful desktop widget for inspirational quotes</em>
</p>

<p align="center">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AnksioXD/writual_quotes">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/AnksioXD/writual_quotes">
  <img alt="GitHub License" src="https://img.shields.io/github/license/AnksioXD/writual_quotes">
  <a href="https://v2.tauri.app/"><img src="https://img.shields.io/badge/Built%20with-Tauri-FFC131?logo=tauri&logoColor=black" alt="Built with Tauri"></a>
</p>

---
<p align="center">
  <img src="src/assets/writual_window.png" alt="Writual Quotes Window" width="350" />
</p>


Writual Quotes is a beautiful desktop widget that displays inspirational quotes. Built with React, Tailwind CSS, and Tauri, it runs natively on your desktop with a minimal, elegant interface.

## 🌟 Features
- Fetches and displays a new quote and author
- Copy quotes to clipboard
- Save/unsave quotes (UI only, persistence in development)
- Lock/unlock widget
- Modern, minimal UI
- Acrylic window support [Soon]

## 📋 TODOs
- [x] Refresh feature
- [x] Clipboard feature
- [x] Lock feature
- [x] Remove taskbar icon & move to system tray
- [ ] Save quotes / View quotes
- [ ] Run on startup
- [ ] Create settings tab
- [ ] Custom theme support

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or use npm/yarn)
- [Rust](https://www.rust-lang.org/tools/install) (for Tauri backend)
- [Tauri](https://v2.tauri.app/start/)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd "Writual Quotes"
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Run the app in development mode:
   ```sh
   pnpm tauri dev
   ```
   This will launch the desktop app with hot reload.

## 🏗️ Building for Production
To build a release version:
```sh
pnpm tauri build
```
The output will be in the `src-tauri/target/release` directory.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add new feature' && git push`)
5. Open a Pull Request

Please follow the existing code style and add comments where necessary. For major changes, open an issue first to discuss what you would like to change.

## 🗂️ Project Structure
- `src/` — React frontend
- `src/components/` — UI components
- `src-tauri/` — Tauri backend (Rust)
- `src/assets/` — Images and assets

## 📄 License
MIT

---

*Made with ❤️ using React, Tailwind, and Tauri.*
