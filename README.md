# Quick Sinhala Translator

A simple and fast browser extension that translates English words to Sinhala instantly. 

When you are reading an article or documentation, you don't need to open a new tab to translate words. Just hold a modifier key, select the text, and the Sinhala meaning will pop up right next to your mouse!

## Features
* **Instant Translation:** See the Sinhala meaning without leaving the page you are reading.
* **Smart Tooltip:** The translation box floats near your cursor and disappears automatically after a few seconds.
* **Custom Settings:** Choose your own shortcut key (Alt, Ctrl, or Shift) and set exactly how long the translation stays on the screen.
* **Lightweight & Fast:** Built with modern Manifest V3 standards so it doesn't slow down your browser.

## How to Install (Developer Mode)
If you want to download and use this code from GitHub:

1. Download or clone this repository to your computer.
2. Open Chrome or Edge.
3. Go to the extensions page (type `chrome://extensions/` or `edge://extensions/` in the address bar).
4. Turn on **Developer mode** in the top right corner.
5. Click the **Load unpacked** button.
6. Select the folder where you saved this code.

## How to Use
1. Pin the extension to your browser toolbar.
2. Right-click the extension icon and click **Options** to choose your preferred key (Default is `Alt`) and timer.
3. Go to any website with English text.
4. Hold down your chosen key (e.g., `Alt`).
5. Select (highlight) a word or short phrase with your mouse.
6. The Sinhala translation will immediately appear!

## 🛠️ Built With
* Standard HTML, CSS, and vanilla JavaScript
* Chrome Extension API (Manifest V3)
* Service Workers & Message Passing
* Google Translate API

## How the Code Works
* `manifest.json`: The core configuration file for the browser.
* `background.js`: A Service Worker that runs in the background and safely fetches data from the translation API to avoid CORS errors.
* `content.js`: The script injected into web pages. It listens for your mouse clicks, grabs the text, and calculates where to draw the temporary popup box on your screen.
* `options.html` & `options.js`: The user interface and logic for saving your personal settings to local browser storage.

---
**Created by Dasun Theekshana**