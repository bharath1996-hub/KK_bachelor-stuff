const QRCode = require('qrcode');
const path = require('path');

// CHANGE THIS to your actual deployed URL or local network IP
const APP_URL = process.argv[2] || 'http://YOUR_IP:3000';

const outputPath = path.join(__dirname, 'kk-party-qr.png');

QRCode.toFile(outputPath, APP_URL, {
  width: 600,
  margin: 2,
  color: {
    dark: '#1a1a2e',
    light: '#ffd700'
  }
}, (err) => {
  if (err) throw err;
  console.log(`QR code saved to: ${outputPath}`);
  console.log(`Points to: ${APP_URL}`);
});
