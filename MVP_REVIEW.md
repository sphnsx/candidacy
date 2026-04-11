# MVP Review — Remaining Gaps Before Production

## Must-Fix Before Launch

### Backend
- [ ] **Implement `/api/generate-assessment` endpoint.** Currently falls back to static responses. Needs server-side AI call with proper API key management, rate limiting, and prompt engineering.
- [ ] **Implement `/api/leads` endpoints.** Need persistent storage (database), not just in-memory. GDPR-compliant data handling required for EU/UK users.
- [ ] **Implement `/api/book-strategy` endpoint.** Needs integration with actual scheduling tool (Calendly, Cal.com, or custom).
- [ ] **Email delivery.** The "report emailed to you" promise requires a transactional email service (SendGrid, Postmark, etc.).

### Compliance
- [ ] **Legal review of all copy.** A qualified immigration solicitor should review all user-facing text to confirm it does not constitute immigration advice.
- [ ] **Cookie consent.** If any analytics or tracking is added, a cookie banner is required under UK/EU law.
- [ ] **Privacy policy page.** Required if collecting email addresses. Must explain data retention, rights, and processing basis.
- [ ] **Terms of service.** Should clarify the service is informational only.

### Security
- [ ] **Admin access.** `?admin=1` is a development convenience. Production needs proper authentication (e.g. Supabase Auth, Clerk, or simple password gate).
- [ ] **Rate limiting.** The assessment generation endpoint must be rate-limited to prevent abuse.
- [ ] **Input sanitisation.** All user text inputs should be sanitised server-side before storage or AI prompt injection.
- [ ] **HTTPS enforcement.** All API calls and page loads must use HTTPS in production.

## Should-Fix Before Launch

### UX / Conversion
- [ ] **Loading state duration.** Currently shows loading animation for the full API call duration. Consider minimum display time (3s) and maximum timeout with error state.
- [ ] **Error states.** No user-facing error handling if the assessment API fails. Need a "something went wrong, try again" flow.
- [ ] **Report sharing.** Users may want to share or download their report as PDF.
- [ ] **Mobile responsiveness.** Inline styles handle basic mobile layout, but needs testing on actual devices.
- [ ] **Save progress.** Long forms benefit from auto-save to localStorage so users don't lose input on accidental navigation.

### Product
- [ ] **A/B test email gate placement.** Current gate is after score preview. Test: gate before any scores vs. current approach.
- [ ] **Follow-up email sequence.** After lead capture, a 2-3 email nurture sequence would improve £499 conversion.
- [ ] **Report expiry / re-generation.** Should users be able to retake the analysis? How long are reports accessible?
- [ ] **Analytics.** Add funnel tracking: landing → start → step completion → gate → report → CTA click.

### Technical
- [ ] **CSS extraction.** All styles are inline. Consider CSS modules or Tailwind for maintainability.
- [ ] **Component library.** If the product grows, extract `SelectCard`, `Button`, `TextInput`, etc. into a shared component package.
- [ ] **Testing.** No tests exist. At minimum: step validation logic, backend abstraction functions, email validation.
- [ ] **SEO.** Single-page app needs meta tags, Open Graph tags, and possibly SSR for search visibility.
- [ ] **Accessibility.** Keyboard navigation, ARIA labels, focus management, and screen reader testing needed.
- [ ] **i18n framework.** Current hardcoded i18n object works but won't scale. Consider react-intl or similar if adding more languages.

## Nice-to-Have (Post-Launch)

- [ ] Pathway-specific achievement options (show different achievements for digital vs. arts)
- [ ] Upload CV/resume for auto-population of form fields
- [ ] Integration with LinkedIn profile import
- [ ] Comparison tool: "How do you compare to successful applicants in your pathway?"
- [ ] Referee matching / introduction service as premium upsell
- [ ] Multi-language expansion (Hindi, Arabic, Mandarin traditional, etc.)
