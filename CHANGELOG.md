# Changelog — GlobalTalent.ai MVP Rebuild

## v0.2.0 — 2026-04-08

### Backend Abstraction (P0)
- **Removed direct Anthropic API call** from frontend. Replaced with `generateAssessment()` calling `POST /api/generate-assessment`.
- **Removed `window.storage` usage**. Replaced with `saveLead()` → `POST /api/leads`, `fetchLeads()` → `GET /api/leads`, and `bookStrategy()` → `POST /api/book-strategy`.
- All backend functions include graceful fallbacks for local development (with console warnings).

### Compliance Framing (P0)
- Changed all user-facing language from "assessment" to "analysis" / "readiness analysis" to avoid implying professional advice.
- Added explicit qualifier: "Information analysis based on published criteria" on report header.
- Added disclaimer to landing page (not just report and footer).
- Report disclaimer now explicitly states "No lawyer-client or adviser-client relationship is created."
- Footer disclaimer references the Immigration and Asylum Act 1999 in both languages.
- Replaced "assessment" with "analysis" throughout both EN and ZH i18n strings.

### Pathway Restructuring (P1)
- Consolidated pathways from 5 flat options to 3 primary routes: Digital Technology, Academia & Research, Arts & Culture.
- Arts & Culture now has sub-path selection: Combined Arts, Architecture, Fashion, Film & Television.
- Dynamic step count — sub-path step only appears when Arts & Culture is selected (4 or 5 steps total).
- Each pathway now shows the endorsement body name (Tech Nation, UKRI, Arts Council England).

### Email Gate Improvements (P1)
- Added "Why do we ask for your email?" expandable explanation.
- Improved privacy copy: "No spam, unsubscribe anytime."
- Email is now passed through to the report view for booking integration.

### Paid CTA Improvements (P1)
- £499 package now lists 4 concrete deliverables (evidence audit, narrative coaching, referee strategy, timeline management).
- Changed CTA from "Book Your Strategy Session" to "Book a Free 15-min Consultation" (lower commitment).
- Added satisfaction guarantee line.
- Booking button calls `bookStrategy()` backend endpoint and opens Calendly link.

### Admin Access (P1)
- Removed 5-click logo easter egg.
- Admin panel now accessed via `?admin=1` query parameter (dev-only pattern).
- Admin panel uses `fetchLeads()` backend abstraction instead of `window.storage`.

### Form Improvements (P1)
- Added "Country of current residence" field to experience step.
- Expanded achievement options: added "Exhibitions / Screenings" and "Major Commissions / Contracts" for arts pathway users.
- Improved placeholder text to be more specific and helpful.

### Code Quality
- Renamed all abbreviated variables to readable names (e.g. `SC` → `SelectCard`, `sD` → `setData`, `C` → `colors`).
- Replaced context shorthand (`LC`, `uL`, `uT`) with descriptive names (`LangContext`, `useLang`, `useT`).
- Extracted step validation into `isStepValid()` function.
- Dynamic step resolution via `getSteps()` based on selected pathway.
- Preserved all visual design, animations, and dark theme.
- Preserved full bilingual EN/ZH support.
