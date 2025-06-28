<p align="center">
  <img src="src-tauri/icons/icon.png" alt="Writual Quotes Logo" width="120" />
</p>

<h1 align="center">📝 Writual Quotes</h1>

<p align="center">
  <em>A beautiful desktop widget for inspirational quotes</em>
</p>

<p align="center">
  <a href=https://github.com/AnksioXD/writual_quotes"><img src="https://img.shields.io/github/stars/your-username/writual-quotes?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/AnksioXD/writual_quotes"><img src="https://img.shields.io/github/forks/your-username/writual-quotes?style=social" alt="GitHub forks"></a>
  <a href="https://github.com/AnksioXD/writual_quotes/blob/main/LICENSE"><img src="https://img.shields.io/github/license/your-username/writual-quotes?color=blue" alt="License"></a>
  <a href="https://v2.tauri.app/"><img src="https://img.shields.io/badge/Built%20with-Tauri-FFC131?logo=tauri&logoColor=black" alt="Built with Tauri"></a>
</p>

---

![App Screenshot](src/assets/writual_window.png)

Writual Quotes is a beautiful desktop widget that displays inspirational quotes. Built with React, Tailwind CSS, and Tauri, it runs natively on your desktop with a minimal, elegant interface.

## 🌟 Features
- Fetches and displays a new quote and author
- Copy quotes to clipboard
- Save/unsave quotes (UI only, persistence in development)
- Lock/unlock widget
- Modern, minimal UI

## 📋 TODOs
- [x] Refresh feature
- [x] Clipboard feature
- [x] Lock feature
- [ ] Remove taskbar icon & move to system tray
- [ ] Create settings menu
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
