const QRCode = require("qrcode");
const fs = require("fs-extra");
const path = require("path");

const NUM_GUESTS = 50;          // total codes to print
const BASE = "https://your-host"; // ← replace with your actual domain
const OUT = path.join(__dirname, "qr");

async function main() {
  await fs.emptyDir(OUT);
  const winnerIdx = Math.floor(Math.random() * NUM_GUESTS);
  for (let i = 0; i < NUM_GUESTS; i++) {
    const isWinner = (i === winnerIdx);
    const url = isWinner
      ? `${BASE}/winner.html`
      : `${BASE}/prize.html`;
    const filename = path.join(OUT, `guest-${i+1}.png`);
    await QRCode.toFile(filename, url, { width: 300, margin: 1 });
    console.log(
      `→ QR #${i+1} → ${isWinner ? "WINNER" : "prize"}`
    );
  }
  console.log("All QR codes generated in ./qr");
}

main().catch(console.error);