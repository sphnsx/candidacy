# GlobalTalent.ai MVP Rebuild Brief

## Goal
Rebuild the current frontend demo into a more production-ready MVP spec implementation, based on the existing JSX prototype.

## Existing file
- `global-talent-assessment.jsx`

## What must change

### P0
1. Remove direct frontend Anthropic API call pattern. Replace with a clear backend abstraction layer such as `generateAssessment()` that calls `/api/generate-assessment`.
2. Replace `window.storage` demo persistence with a backend abstraction layer such as `saveLead()` and `fetchLeads()` calling `/api/leads`.
3. Tighten compliance positioning:
   - avoid wording that sounds like immigration advice
   - use terms like information analysis, evidence organisation, public-information-based assessment, narrative review
   - keep explicit disclaimer in landing, report, and footer
4. Improve report generation contract so outputs are more structured and specific.
5. Remove fake / prototype-only patterns where possible, or mark them clearly as placeholders.

### P1
6. Restructure pathway selection to reflect policy reality:
   - primary pathways: Digital Technology, Academia & Research, Arts & Culture
   - if Arts & Culture selected, allow sub-path selection: Combined Arts, Architecture, Fashion, Film & Television
7. Improve email gate conversion design.
8. Improve paid CTA section so the £499 package is more concrete.
9. Replace secret admin easter egg with a clearer dev-only admin entry pattern.
10. Improve form depth slightly to make report quality better.

## Deliverables
1. A rebuilt React component file, cleaner and more production-oriented.
2. A short `CHANGELOG.md` summarizing what changed.
3. A short `MVP_REVIEW.md` listing remaining gaps before real production launch.

## Constraints
- Keep visual quality high.
- Preserve bilingual support.
- Do not introduce a massive framework migration.
- Keep this as a polished MVP frontend file with backend integration points.
- Do not claim legal advice anywhere.

## Important
This is a product rebuild task, not just a code cleanup. Improve product logic, compliance framing, and conversion structure.
