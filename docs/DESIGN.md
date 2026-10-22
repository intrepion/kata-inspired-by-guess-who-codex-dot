# The Lantern Lineup

## Scope and decisions

An original, quiet neighborhood mystery with 24 hand-authored SVG portraits. The faces, names, title and presentation are original, with no copied game artwork. Static HTML, CSS and classic JavaScript keep the game local, offline after loading, and directly openable from the root index.html. No install, build, account, analytics, external font, API or paid service.

A human selects a secret. The Archivist independently samples its own secret uniformly. The human starts; ask one yes/no visible-trait question or make a final guess. Opponent responses are automatic and truthful. After seeing an answer, review and flip cards, then explicitly advance the computer turn. This deliberate acknowledgment gives readers time and eliminates background-turn/restart races. No timed callback changes match state. Switching away preserves the in-memory game. Refresh or closing the tab discards it; no saved-game claim is made.

Manual marks are reversible and can be wrong. Apply known clues reconstructs only the human's logical candidates from earned responses. Final guesses may name any face, including a manually eliminated face, and require confirmation. The last standing card does not automatically win. Repeated actions are rejected by the phase guard. Restart requires confirmation during the game; replay after a result starts immediately.

Visible traits are four hair colors and five binary accessories/features. Each neighbor has a unique trait signature. These are illustrated and fully described in accessible card names. Hats do not completely conceal the hair. Trait questions avoid gender/ethnicity inference. Hat/glasses distribution correlates with hair color in this deliberately small roster; nine questions are not nine independent features.

## Rules reference

Primary source: [Hasbro's original Guess Who? instruction sheet](https://www.hasbro.com/common/instruct/guesswho.pdf), printed pages 2–3, read visually from the downloaded PDF on 2026-10-22. It describes 24 faces, a concealed mystery card, alternating turns, a yes/no question or identity guess in place of the question, eliminating inconsistent faces, and immediate loss on an incorrect identity guess. Those are the mechanical baseline here.

Adaptations: player chooses instead of drawing their secret; human always starts rather than youngest; computer questions about the human secret are automatically truthfully answered; curated trait questions replace unrestricted speech; optional automatic elimination supplements manual card flipping; single matches instead of championship scoring. No claim of affiliation or endorsement.

## Fair computer boundary

`chooseAction({candidates, asked})` knows only the shared roster and its evidence. It picks an unused trait that most evenly splits remaining candidates, breaking ties by the public question order; with one candidate it makes the final guess. It never receives the player's secret, rival secret, human board marks, human questions, or a match object.

The match controller is the referee: it alone compares a question against the relevant secret, records that legitimate response, and filters computer candidates. `view()` returns copies of public data and withholds the rival's identity until the match ends. Local browser memory is not a security boundary against developer tools; fairness is an algorithmic information-flow guarantee, not adversarial secrecy.

## Test seams

The user requested engine/fair AI, full matches, repeated inputs, interrupted/restarted flows and browser/native acceptance. Public engine actions and the rendered UI are the verification seams. Node tests cover all 576 ordered secret pairs; the browser harness exercises the real DOM through controls, using a seeded rival only in its iframe. No production-only cheat or state mutation interface is present. CI runs this same browser harness in headless Chrome.
