# TWWW MediaPal Proposal

Interactive MediaPal × Coca-Cola **The World Will Wait** media proposal deck.

## Live

- **Deck:** https://twww-proposal.vercel.app
- **PDF:** https://twww-proposal.vercel.app/TWWW_MediaPal_Proposal.pdf
- **GitHub:** https://github.com/Kimathi-Design/TWWW-Proposal

## Run locally

```bash
cd TWWW-Proposal
npm install
npm run dev -- -p 3060
```

Open http://localhost:3060/deck

## Notes

- **15 slides** in the live deck (Prepare/Eat/Share and Next steps removed).
- Favicon is the official MediaPal mark from mediapal.net.
- Download PDF is enabled in the deck chrome (same file as the public PDF link above).
- Regenerate the PDF after slide changes: `npm run generate-crisp-pdf` (requires Playwright Chromium: `npx playwright install chromium`).
