# The Lantern Lineup

## Play online

[Play The Lantern Lineup](https://intrepion.github.io/kata-inspired-by-guess-who-codex-dot/) — free, playable in your browser.

A warm, original browser deduction game inspired by the classic secret-character format. Meet 24 illustrated neighbors, ask yes/no questions, flip away unlikely faces, and name the secret before the Archivist names yours.

## Play locally

Requires Python 3 only for the preview. No packages or build step.

```sh
python3 server.py
```

Open **http://127.0.0.1:55603/**. The server binds only to loopback. Choose another free port with `PORT=55604 python3 server.py`. The root `index.html` also works by opening it directly. No network assets are used.

1. Choose any neighbor as your secret and seal the card.
2. Ask one yes/no trait question. Flip cards manually or use **Apply known clues**.
3. Let the Archivist take its turn. Its questions about your secret are answered truthfully for you.
4. Instead of a question, choose **Make a final guess**, select a face, and confirm. Correct wins; incorrect loses. One face left still requires a guess.

Click/tap a card to flip it or restore it. **Restore all** clears manual marks; **Apply known clues** reconstructs the board from your earned answers. Guesses may name any face. Tab moves between controls, Enter/Space activates, arrow keys move between cards, and Escape cancels guessing or closes a dialog. New game and end-of-match replay are always available. Switching tabs preserves a match; reloading starts fresh.

## A fair opponent

The Archivist's decision function receives only its candidate IDs and previously asked question IDs. Its best-split strategy never reads your secret or your elimination marks. The referee answers its question truthfully, and only then updates its candidates. See [design and rules sources](docs/DESIGN.md).

All names, SVG illustrations and styling are original. Inspired by the deduction mechanics of Guess Who?; not affiliated with Hasbro. The primary rules reference is [Hasbro's instruction sheet](https://www.hasbro.com/common/instruct/guesswho.pdf).

## Verification

Requires Node.js 24 for automated engine checks:

```sh
npm test
npm run check
python3 tests/static_check.py
```

Open `http://127.0.0.1:55603/tests/browser.html` and click **Run browser checks** for the real UI suite. CI runs the same suite in headless Chrome. Native Chrome acceptance and actual verification limits are recorded in [docs/VERIFICATION.md](docs/VERIFICATION.md).

The runtime has zero external dependencies. `engine.js` owns rules and AI; `portraits.js` draws vector faces; `game.js` connects controls to rules. `CONTEXT.md` defines domain language.

MIT licensed. `.gitignore` includes complete official GitHub `main` Global/Linux, Global/Windows and Global/macOS templates, also preserved byte-for-byte in `docs/gitignore/`. They were retrieved on 2026-10-22 from [github/gitignore](https://github.com/github/gitignore/tree/main/Global).
