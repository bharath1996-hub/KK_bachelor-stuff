# KK's Bachelor Party - Quality Voting App

## Quick Start

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Start the server:**
   ```
   node server.js
   ```
   App runs at http://localhost:3000

3. **Generate the QR code** (replace with your actual IP/URL):
   ```
   node generate-qr.js "http://192.168.1.XX:3000"
   ```
   This creates `kk-party-qr.png` — print it and put it up at the party!

## How to find your local IP
- **Mac:** `ipconfig getifaddr en0`
- **Windows:** `ipconfig` → look for IPv4 Address
- **Linux:** `hostname -I`

Everyone on the same Wi-Fi can access the app using that IP.

## Deploying online (optional)
For people not on the same network, deploy free on [Render](https://render.com) or [Railway](https://railway.app) — just push this folder to a GitHub repo and connect it.

## API Endpoints
- `POST /api/vote` — submit votes `{ selected: [...3], custom: "..." }`
- `GET /api/results` — get all vote data
- `POST /api/reset` — clear all votes
