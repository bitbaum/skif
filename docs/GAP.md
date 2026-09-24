# Gap: what docs/SPEC.md asks that v1 does not do yet

Measured against v1 (PR #2). Ordered by the spec's own priority (§31: P0 → P4),
then the items the spec asks for outside §31. One gap per line, with the spec
section it comes from. Fleet overrides in SPEC.md's header (OrangeCat OIDC, no
users table, Drizzle, Vitest, manual payments) are not gaps.

Status markers: `[ ]` open · `[x]` closed (with the PR that closed it).

## P0 — Real commercial loop

### Customer booking
- [x] Services are not the spec's: Personal Protection, Protector + Driver and Specialist Support are missing (§5). — PR #7
- [x] A booking cannot state requirements (e.g. first aid, a driver, a must-have language) — no BookingRequirement (§9, §21). — PR #7
- [ ] No EXPIRED state: a request never assigned before its start time stays "Requested" forever (§22, §4 "do not fake instant availability").
- [ ] Customer cannot keep a profile (the name a Protector should use) — step 2 of the definition of done (§5, §32.2).

### Protector profiles
- [x] No years of experience or driving capability on the profile (§6). — PR #5
- [x] Operations can approve and suspend but not reject an application (§11). — PR #5

### Capabilities
- [x] Capabilities are a flat self-declared tag list: no category, level, verification status, evidence, certification or expiry (§7). — PR #5
- [x] Operations cannot verify or reject a declared capability; nothing records who assessed it (§7 "assessor/source", §11). — PR #5

### Availability
- [x] Protectors cannot set availability, and Operations cannot see it (§6, §11). — PR #6

### Matching
- [x] Hard filters missing: required capability/qualification, driving requirement, certification validity (§9). (Availability filter: PR #6.) — PR #7
- [x] Unverified and verified capabilities count the same; expired certifications still count (§7, §9). — PR #5
- [ ] No relevant-experience signal (completed deployments of this service) (§9).
- [ ] Raw points shown with no fit band; spec asks for EXCELLENT / STRONG / GOOD FIT until scores justify more (§9).
- [ ] Operations cannot override the ranking to assign an ineligible Protector with a recorded reason (§9).

### Protector acceptance / start / end
- [ ] Protector cannot see why they were matched to a job (§6).
- [ ] No check-in (arrived) step separate from starting the assignment (§6).

### Feedback / incidents
- [ ] Rating lacks professionalism, communication and punctuality/reliability dimensions (§10).
- [ ] Reports are free text only: no structured observations (verbal de-escalation, physical intervention, medical escalation, emergency services) (§6, §10, §29).
- [ ] No incident lifecycle: Operations cannot mark an incident reviewed or resolved (§22, §11).
- [ ] No confidential complaint for customers, and no Ops complaint review (§5, §10, §11).
- [ ] Complaints cannot be corroborated, appealed or corrected, and nothing keeps an unreviewed complaint from affecting reputation (§10).

### Permissions
- [ ] Sensitive Operations access (booking detail, incidents, complaints) is not audited — no AuditEvent (§14, §21).

## P1 — Safety foundation

- [ ] No Environment entity: an assessment names a place in free text and cannot be reused or typed (home, venue, vehicle, journey …) (§12, §18, §21).
- [ ] Safety Preference Profile has no trade-off axes (privacy ↔ observability, autonomy ↔ automation, local ↔ cloud, …) (§3).
- [ ] Missing hard constraints: local-only processing, no persistent recording (§3).
- [ ] Preferences beyond hard constraints do not affect recommendations (§3 "must affect recommendations").
- [ ] Assessment does not capture who/what is protected, known threats, routines/exposure, budget, or upcoming events (§12).
- [ ] No AssessmentFinding: the plan is not built from explicit findings (§12, §21).
- [ ] Interventions lack expected benefit, evidence confidence and autonomy impact as separate dimensions (§2, §12).
- [ ] Interventions don't say whether they need a product, a professional service, a Protector, or are simply behavioural/environmental (§12).
- [ ] Safety Plan items don't say why they are recommended or which finding they address (§12).
- [ ] Budget is not taken into account (§12).

## P2 — Marketplace foundation
- [ ] No providers, items, product/service taxonomy, intervention linkage, or privacy/evidence metadata (§13, §31).

## P3 — Academy foundation
- [ ] No training modules, certifications lifecycle, training records or capability updates from training (§17, §31).

## P4 — Advanced platform
- [ ] No organisations/business environments or memberships (§18).
- [ ] No operational analytics (§29).
- [ ] No evidence graph (research / internal observation / expert opinion / vendor claim) (§16).
- [ ] No advanced recommendation engine, robotics or community/municipal modules (§31, §40).

## Outside §31
- [ ] Customer ↔ Operations / Protector messaging (§5).
- [ ] Emergency UX copy that states Skif is not an emergency service (117 / 144 / 112) (§24).
- [ ] Nothing states that physical security services may need cantonal authorisation (§38).
- [ ] Data retention/deletion policies not modelled (§14).
- [ ] No development seed data (§33).
- [ ] Missing docs: ARCHITECTURE, DOMAIN, PRIVACY, SAFETY_PRINCIPLES, MATCHING, TODO.md (§36, §37).
- [ ] No formatter step (§34).
