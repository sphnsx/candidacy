# Scoring Notes

Current scoring baseline for `app-inline.jsx`.

## Bands
- 0-44: low
- 45-74: mid
- 75+: high

## Intent
This scorer should feel closer to a screening or case-readiness lens, not a motivational quiz.

## Current calibration examples

### Low case
- early career
- no achievements selected
- no referees
- ASAP timeline
- Talent selected too early
- expected outcome: low, roughly low-20s

### Mid case
- mid-career
- some substantive achievements
- only 1-2 referees
- not rushed timeline
- expected outcome: mid, roughly 50s to low-60s

### High case
- senior profile
- multiple strong achievements
- 3+ referees
- not rushed timeline
- expected outcome: high, roughly 80+

## Calibration principles
- Evidence should matter most, but not dominate unrealistically.
- Weak referee position should pull scores down meaningfully.
- Aggressive timeline should penalize fragile cases.
- Talent/Promise mismatch should show up as a warning signal and soft score pressure.
- High band should be hard to reach.

## Next recommended step
Validate against 5-8 realistic user archetypes before touching weights again.
