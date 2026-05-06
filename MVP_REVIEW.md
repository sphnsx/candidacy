# MVP Review — Current Scope vs. 4P Plans

The shipped product is the **free Candidacy Scan** only. The paid Preview-and-Unlock product described in the 4P docs (Product, Price, Promotion, External Pricing Page) is not built.

This file tracks what's left to harden the free Scan, then what's needed to ship the paid MVP.

---

## A. Free Scan — gaps before promotion goes live

- [ ] Privacy policy page (collecting email triggers UK/EU obligations)
- [ ] Terms of service (informational-only, OISC boundary)
- [ ] Funnel analytics (Promotion §6 KPI: Scan completions per channel — UTM-based attribution at minimum)
- [ ] Cookie consent (only if analytics tool requires it — Plausible doesn't, PostHog does)
- [ ] Confirm all 5 ACE sub-routes covered in onboarding picker; design gated to 2026-07-01 ✅ done
- [ ] Fetch timeout on `/api/send-result` ✅ done
- [ ] Persistent storage for leads (currently fire-and-forget via Resend; no record of who completed the Scan)

## B. Paid MVP — Preview-and-Unlock

### Payment & intake
- [ ] Stripe one-time charge, GBP, £349 launch SKU + £499 regular SKU behind a flag
- [ ] Post-purchase structured intake (~30 min, per Pricing Page step 1)
- [ ] Order persistence (order, intake, preview state, unlock state, refund state)
- [ ] Receipt email

### Preview generation (24–48h SLA)
- [ ] Queued generation pipeline
- [ ] Preview output strictly limited to: strengths / weaknesses / gaps / risk flags / one-line strategic direction (Price Memo §4 boundary)
- [ ] Preview delivery email + in-product preview view
- [ ] Unlock CTA (second charge or pre-authorised capture)

### Full Candidacy generation
- [ ] Strategy & Targeting: opportunity shortlist with worth-pursuing / optional / not-recommended labels and reasons
- [ ] Pipeline Planning: 30/60/90-day action plan
- [ ] Evidence strategy
- [ ] Effort/impact ranking
- [ ] Letter strategy and referee guidance
- [ ] One free update within 14 days post-unlock

### Refund handling (4-stage, Price Memo §5)
- [ ] Phase 1 (pre-preview): auto-refund button
- [ ] Phase 2 (pre-unlock, 7d): auto-refund + optional reason
- [ ] Phase 3 (post-unlock, 14d): scoped-refund flow (component-missing only)
- [ ] Phase 4: closed except statutory
- [ ] Refund policy page (solicitor review — Price Memo §9)

## C. Maintenance layer (Product §6)

- [ ] In-product monthly changelog page (the maintenance claim is empty without it)
- [ ] First changelog entry published before launch
- [ ] Source-monitoring + human-triage workflow (operational; not user-facing, but feeds the changelog)

## D. Pricing page

- [ ] Build from `4P_External_Pricing_Page_Candidacy.md` — currently has no destination
- [ ] EN + ZH versions
- [ ] Working `[Get started — £349]` and `[Try the free Candidacy Scan]` CTAs

---

## Suggested order

A → C (legal pages) → B.payment → B.preview → B.full → B.refund → D → C (in-product changelog).

Free-tier hardening and legal first; then payments; then the preview/unlock mechanic; then refund UX; then the page that sells it; then the changelog that justifies the maintenance claim.
