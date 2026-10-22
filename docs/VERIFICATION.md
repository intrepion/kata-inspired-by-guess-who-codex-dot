# Verification record — 2026-10-22

## Local automated checks

- 34 Node engine tests pass, including a complete match for each of the 576 ordered secret pairings, all 24 AI-identification paths, truthful response examples, state/turn guards, result lock, defensive views, abandoned-match independence and correct/incorrect final guesses.
- JavaScript syntax checks pass for engine, portraits, UI and browser harness.
- Python static checks confirm root asset links, complete official OS templates embedded in the root .gitignore, and loopback binding.
- 7 browser groups / 39 assertions exercise actual UI controls: onboarding, unique illustrations, card keyboard navigation, no empty start, truthful questions, turn alternation, rapid repeated input, clue elimination, restore, guess cancellation, correct/wrong final guesses, terminal lock, replay, canceled/repeated restarts, complete deduction win, complete computer win, interruption between turns, 360px/768px no overflow, card target dimensions, and synthetic touch-shaped activation. A targeted accessible-label regression covers guessing a flipped card.

## Native acceptance

Native installed Google Chrome on Oliver's Mac was used through the browser extension, preserving existing tabs. Verified the desktop rendered layout, native arrow-key/Space secret selection, Enter to seal and ask, opponent response and turn handoff, keyboard elimination, help Escape closure, and restart. Browser harness ran successfully in native Chrome. Runtime log inspection showed no game errors; unrelated wallet-extension warnings were present.

Small widths were checked using the real rendered app in same-origin iframes. A native viewport screenshot was also reviewed at 360px. Physical phone/tablet hardware and physical touch input were not tested. Touch coverage is synthetic. Safari/Firefox, screen reader speech and color-vision simulation were not tested. Direct-file root launch is supported by the static architecture, but the native browser tool denied the file:// navigation because its URL policy permits only HTTP/HTTPS. That action did not execute and was not retried or worked around; direct-file launch is not counted as verified.

## Review

Separate read-only Spec and Standards reviews covered the entire new project against an empty-project baseline. Spec review found a flipped-card guess-mode accessible-label mismatch and an iframe autorun load race; both were corrected before publication. Standards review found no blocking correctness/security issue and noted the dense UI render function as a nonblocking maintainability opportunity. No copied game art, paid services or public hosting.

## Delivery checks

The preview binds only to 127.0.0.1:55603; Battleship on 55602 is preserved. Repository delivery requires a clean worktree and matching local/tracking/live-remote main SHA. CI runs syntax, engine, static and the same browser suite in headless Chrome. The exact final commit's successful run URL is returned separately so this document does not require a self-referential commit update.
