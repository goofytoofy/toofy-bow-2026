# Toofy BOW 2026

A small, mobile-friendly bingo website designed for GitHub Pages.

## Files

- `index.html` — the page structure
- `style.css` — colors, layout, mobile styling, and animations
- `script.js` — phrase pool, random card generation, marking squares, saving, and bingo detection
- `assets/autumn-pub-background.png` — the autumn pub background artwork

## Customize the phrases

1. Open `script.js` in a text editor.
2. Find the section near the top that begins `const phrases = [`.
3. Replace or add phrases inside quotation marks, separated by commas.
4. Keep at least 24 phrases in the list. You can add as many as you like.
5. Save the file and upload the updated `script.js` to GitHub.

Example:

```javascript
const phrases = [
  "Mr. Brightside plays",
  "Connor makes a cameo",
  "Your new phrase goes here"
];
```

Do not remove the square brackets `[` and `]`. Each card uses 24 unique phrases from the pool, with FREE in the center.

## Publish with GitHub Pages

1. Sign in to GitHub (or create a free account at https://github.com).
2. Create a new repository. A name such as `toofy-bow-2026` is fine.
3. On the repository page, choose **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder. Make sure the `assets` folder and image remain together.
5. Commit the uploaded files.
6. Open the repository's **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Choose branch **main** and folder **/(root)**, then save.
9. Wait a minute or two. GitHub will show the public website address in the Pages section.

## How saved cards work

The first time someone opens the site in a browser, a random card is created and saved in that browser's local storage. Refreshing or returning in the same browser on the same device restores the card and its marked squares.

Cards are not linked to a person's identity and do not transfer between devices or browsers. Clearing browser data or using private browsing may remove the saved card. There is no new-card button.

## Notes

- The FREE center square is automatically marked and counts toward a winning line.
- Any newly completed horizontal, vertical, or diagonal line triggers the same celebration. Completing another line triggers it again.
- Unmarking a square is supported; completing a line again can trigger the celebration again.
- The site uses no account system, database, or paid hosting.
- The background image is included locally, so it does not need a separate image-hosting service.
