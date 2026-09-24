# Skif — product specification

This is the founding specification for Skif, kept verbatim below. It was written
with ChatGPT on 2026-09-08 as a one-shot build prompt for Codex, which never ran
(its GitHub connector failed), so nothing was built from it before this repository.

The name was open when it was written ("the FINAL BRAND NAME IS NOT YET DECIDED").
It is now **Skif**. Keep it in one central brand constant, as §25 asks, so a rename
stays a one-line change.

## Where the fleet overrides this document

Where the spec and the bitbaum fleet's standing rules disagree, **the fleet wins**.
Those rules are enforced in CI, and this spec predates them being applied here:

| The spec says | Build this instead | Why |
|---|---|---|
| §5, §20: customers "create an account", Supabase for auth | **Sign in with OrangeCat (OIDC) only.** No users table, no passwords, no reset flow. `id_token.sub` is the identity; Skif stores only its own domain data keyed by it. | fleet `STACK.md` "Identity"; CI-enforced since fleet#139. Copy Heidi's `lib/auth/` (it handles OrangeCat's two quirks: `client_secret_post` only, PKCE required). |
| §20: "Supabase where useful" | **Drizzle ORM + `pg`** on the self-hosted Postgres on the bitbaum box. | fleet `STACK.md`: Supabase is a documented exception for two legacy apps only. |
| §34: tests | **Vitest** for the app. | fleet `STACK.md` blessed test runner. |
| §23: "Stripe-ready payments" | Payment **abstraction** with a manual `PAYMENT_PENDING` state; no provider wired yet. Never fake a successful payment. | Consistent with §23 itself; the rail is an open decision. |

Everything else in the spec stands as written, including its priority order (§31):
**P0, the real commercial loop, before anything else.**

---

You are the principal engineer, product architect, product designer, security engineer, and technical founder responsible for taking this repository from its CURRENT STATE to the strongest production-ready version of the product described below.

Do not treat this as a prototype, design exercise, landing-page task, or request for scaffolding.

Your job is to INSPECT THE EXISTING REPOSITORY FIRST, understand what already exists, preserve good work, remove stale/duplicated/broken concepts, then IMPLEMENT as much of the complete product as can responsibly be implemented in one sustained engineering pass.

Do not ask me to make ordinary implementation decisions. Use first principles and your engineering/product judgment. Only leave something unresolved when it genuinely requires an external credential, legal decision, physical-world dependency, or information unavailable in the repository.

Do not merely write a plan. Build.

# 1. PRODUCT VISION

We are building a technology-first safety company, initially launching in Zürich, Switzerland.

This began as an Uber-like application for booking highly qualified personal Protectors, but the larger product is now clear:

We research what makes PEOPLE AND ENVIRONMENTS safe and provide the people, knowledge, training, products, services and technology required to improve safety.

The unit of the system is not merely a "guard."

The system should eventually reason across:

PERSON
→ HOME
→ JOURNEY
→ VEHICLE
→ VENUE
→ WORKPLACE
→ BUILDING
→ NEIGHBORHOOD
→ VILLAGE
→ TOWN
→ CITY

The central product loop is:

ASSESS
→ IMPROVE
→ PROTECT
→ MEASURE
→ LEARN

The long-term platform is a:

SAFETY OS

The important principle is:

SAFETY MUST NOT REQUIRE UNNECESSARY SACRIFICES OF PRIVACY OR FREEDOM.

We reject the simplistic security-industry assumption:

more surveillance = more safety.

CCTV, cloud cameras, facial recognition, patrol robots, drones and other surveillance/security technology can absolutely be useful solutions.

But they are OPTIONS, not ideological defaults.

For some users and environments they may be excellent.

For others they may be unacceptable.

The system must understand the customer's preferences and optimize interventions accordingly.

The company should help customers understand trade-offs rather than decide those trade-offs for them.

A useful conceptual optimization objective is:

maximize expected safety improvement

subject to:

- privacy preferences
- autonomy/freedom preferences
- cost
- inconvenience
- legal constraints
- environmental constraints
- evidence quality
- customer preferences

The system should sometimes conclude:

"Nothing needs to be purchased."

If changing a routine, moving a light, improving an entrance, removing exposed personal information, or training household members solves the problem better than CHF 5,000 of equipment, recommend that.

Trust is more important than maximizing marketplace GMV.

# 2. CORE DOMAIN MODEL: THE SAFETY GRAPH

Design the domain around a generalized Safety Graph.

Conceptually:

ENVIRONMENT
→ ASSET / PERSON
→ THREAT
→ VULNERABILITY
→ INTERVENTION
→ REQUIRED CAPABILITY
→ PROVIDER / PRODUCT / SERVICE
→ DEPLOYMENT
→ OUTCOME
→ EVIDENCE

An intervention has multiple effects, not merely a single "security score."

Model dimensions such as:

- expected safety benefit
- evidence confidence
- privacy impact
- autonomy/freedom impact
- financial cost
- convenience/inconvenience
- implementation complexity
- reversibility
- visibility/deterrence
- data exposure
- ongoing operating cost

Do NOT collapse all of this prematurely into one opaque "Safety Score."

Preserve dimensions.

Users/organizations should eventually be able to determine their own priorities.

# 3. SAFETY PREFERENCE PROFILE

Create a first-class Safety Preference Profile.

Examples:

Privacy ↔ Observability
Autonomy ↔ Automation
Discretion ↔ Visible deterrence
Human protection ↔ Technological protection
Local processing ↔ Cloud processing
Individual ↔ Community solutions
Convenience ↔ Maximum hardening

Also support hard constraints such as:

- no facial recognition
- no interior cameras
- no cloud video storage
- no automatic police sharing
- local-only processing required
- exterior cameras acceptable
- human Protector acceptable
- autonomous outdoor robot acceptable
- no persistent recording
- etc.

These preferences must not merely exist in a settings screen.

They should affect recommendations and matching.

# 4. INITIAL COMMERCIAL PRODUCT

Do NOT attempt to build the entire future civilization before the MVP works.

The initial commercial loop must be genuinely usable:

CUSTOMER
→ requests safety/protection service
→ system captures context and requirements
→ suitable approved Protectors are identified
→ Operations assigns one
→ Protector accepts
→ service occurs
→ assignment starts/ends
→ customer gives structured feedback
→ Protector can file structured observations/incidents
→ Operations reviews outcomes

We are launching initially in Zürich.

Scheduled bookings and human-assisted dispatch are acceptable.

Do NOT fake instant availability.

# 5. CUSTOMER APPLICATION

Mobile-first.

The customer should be able to:

- create an account
- authenticate securely
- create/edit profile
- create Safety Preference Profile
- create/manage relevant environments
- request a Safety Assessment
- request/book a Protector
- see booking status
- communicate with Operations / assigned Protector where appropriate
- see upcoming and previous assignments
- view invoices/payment state
- submit structured feedback
- submit confidential complaint
- eventually receive recommendations and Safety Plans

Initial services:

- Night Out
- Personal Protection
- Protector + Driver
- Specialist Support

Architecture should allow future:

- Safe Ride
- Event accompaniment
- family safety
- travel protection
- digital-asset/high-exposure protection
- residential safety
- workplace safety
- venue safety
- neighborhood safety

Do not hard-code the system so everything assumes "bodyguard."

# 6. PROTECTOR APPLICATION

Mobile-first.

A Protector should be able to:

- apply
- create professional profile
- provide qualifications/certifications
- declare languages
- declare capabilities
- provide experience
- provide driving capabilities
- set availability
- see suitable assignments
- understand WHY an assignment matches
- accept/pass
- see relevant assignment details
- check in
- start assignment
- end assignment
- provide structured post-assignment observations
- create incident report
- see training/certification status
- eventually see Academy requirements
- see their multidimensional professional quality profile

Never expose sensitive customer information before operationally necessary.

# 7. PROTECTOR CAPABILITY GRAPH

This is one of the core moats.

Do not model Protectors as:

John
4.8 stars
Bodyguard

Model multidimensional capabilities.

Examples:

HUMAN

- emotional regulation
- judgment
- situational awareness
- de-escalation
- communication
- discretion
- hospitality/customer service
- trauma-aware interaction
- conflict management

MEDICAL

- first aid
- emergency response
- advanced medical qualifications

PHYSICAL

- strength
- endurance
- sprinting
- mobility
- BJJ
- judo
- wrestling
- Muay Thai
- boxing
- restraint/control skills

PROFESSIONAL

- close protection
- nightlife
- event security
- executive protection
- residential
- family
- vulnerable-person support

MOBILITY

- professional driving
- defensive driving
- chauffeur
- vehicle types

TECHNICAL

- cybersecurity literacy
- digital-asset literacy
- privacy/security technology
- communications

LANGUAGES

Model languages properly.

Capabilities need:

- category
- level
- verification status
- evidence
- certification
- expiry where applicable
- assessor/source
- training history

Avoid fake precision.

# 8. SELECTION PHILOSOPHY

The company is NOT looking for stereotypical aggressive bouncers.

The best Protector is someone customers genuinely want around.

Initial conceptual selection weighting:

Emotional stability / self-control: 20%
Customer service / communication: 20%
Judgment / de-escalation: 20%
Physical capability: 15%
Reliability / integrity: 10%
Situational awareness: 10%
Technical aptitude: 5%

These numbers are doctrine/configuration, not immutable scientific truth.

Design them to be configurable.

A huge rude muscular candidate should NOT outrank a calm, highly competent grappler with excellent judgment and communication simply because of appearance or strength.

# 9. MATCHING ENGINE

Build deterministic/explainable matching first.

Do NOT use an LLM as the core dispatch algorithm.

Hard filters may include:

- approved/verified status
- availability
- required qualification
- required capability
- language
- driving requirement
- service compatibility
- certification validity
- geography when available

Ranking can consider:

- capability fit
- relevant experience
- reliability
- contextual feedback
- customer preferences
- situational suitability
- proximity when location infrastructure exists

The system should generate human-readable reasons:

96% MATCH

German + English
Advanced BJJ
Nightlife specialist
First aid verified
Excellent de-escalation
43 relevant deployments
High reliability

But do not claim mathematically meaningful percentages unless the implementation defines what they mean.

If necessary use:

EXCELLENT FIT
STRONG FIT
GOOD FIT

until the scoring system justifies percentages.

Operations must be able to see WHY candidates were ranked and override the recommendation.

# 10. FEEDBACK AND REPUTATION

Do NOT build a simplistic Uber 5-star system.

Capture dimensions such as:

- respect
- professionalism
- communication
- discretion
- feeling of safety
- judgment where observable
- punctuality/reliability

Protector feedback and operational observations should also exist.

Serious complaints must not automatically destroy someone's reputation.

Design for:

- context
- corroboration
- reviewer reliability
- incident context
- human review
- appeal/correction
- evidence

Do not build an automated social-credit system.

# 11. OPERATIONS APPLICATION

Desktop-first responsive Ops interface.

Operations should be able to:

- see bookings
- see booking state
- inspect requirements
- see matching candidates
- see why they match
- manually assign
- monitor assignment state
- see Protector availability
- see capability/certification status
- review incidents
- review complaints
- review customer feedback
- review Protector observations
- manage services
- manage Protectors
- approve/reject applications
- manage capability definitions
- eventually manage marketplace providers/products
- see useful operational metrics

Use role-based access.

Sensitive information must be restricted.

# 12. SAFETY ASSESSMENT

Build the domain foundation and a useful initial workflow.

Assessment should allow a customer to identify:

- who/what is being protected
- environment
- concerns
- known threats
- vulnerabilities
- routines/exposure
- existing measures
- privacy/freedom preferences
- budget/preferences
- upcoming events/travel

The output is a structured Safety Plan.

A Safety Plan contains prioritized interventions.

Each intervention should explain:

- what issue it addresses
- why it is recommended
- expected benefit
- evidence/confidence
- privacy impact
- freedom/autonomy impact
- cost estimate if available
- whether it requires a product
- whether it requires a professional service
- whether it requires a Protector
- whether it is simply behavioral/environmental
- alternatives

Do not pretend AI can accurately calculate personal danger probabilities from inadequate data.

# 13. MARKETPLACE

Architect and, where sensible, implement an initial marketplace.

The marketplace is NOT just ecommerce.

It contains:

PRODUCTS

- locks
- lighting
- cameras
- local-only cameras
- alarms
- sensors
- access control
- safes
- privacy equipment
- emergency equipment
- radios
- wearables
- vehicle security
- first-aid equipment

SERVICES

- security assessments
- installation
- privacy assessments
- cybersecurity
- locksmiths
- training
- drivers
- Protectors
- venue security
- specialist consultants

FUTURE TECHNOLOGY

- autonomous security robots
- patrol robots
- quadruped inspection robots
- drones where legal/appropriate
- privacy-preserving sensors
- edge AI detection systems

TRAINING

- first aid
- de-escalation
- personal safety
- household preparedness
- professional Protector training
- workplace/venue training

A marketplace item should eventually be evaluated on more than reviews:

- problem addressed
- environments suited for
- effectiveness evidence
- evidence confidence
- privacy impact
- autonomy impact
- data architecture
- local/cloud requirements
- total cost
- maintenance
- interoperability

Design schema accordingly even if the first UI only exposes a subset.

# 14. PRIVACY BY DESIGN

This is foundational.

Do not bolt privacy onto the application later.

Principles:

DATA MINIMIZATION

Only collect information necessary for the purpose.

PURPOSE LIMITATION

Sensitive assessment/protection information should not casually bleed into analytics or unrelated modules.

LEAST PRIVILEGE

Protectors see only what they need.

Marketplace sellers should NEVER automatically receive the customer's full Safety Assessment.

SEPARATION

Separate highly sensitive operational/safety information where sensible.

RETENTION

Model deletion/retention policies.

AUDITABILITY

Sensitive administrative access should be auditable.

LOCATION

Treat live/current location as highly sensitive.

INCIDENTS

Incident reports may contain extremely sensitive information.

SECRETS

Never put credentials in repository or client bundle.

No fake encryption claims.

# 15. FREEDOM BY DESIGN

Also treat freedom/autonomy as a product principle.

The system should NOT assume:

- constant tracking
- facial recognition
- identity verification beyond necessity
- police integration
- centralized surveillance
- cloud storage
- persistent cameras
- automated behavioral scoring

are automatically desirable.

Where multiple interventions are plausible, expose trade-offs.

A privacy-preserving alternative should be representable.

# 16. SAFETY RESEARCH / EVIDENCE LAYER

Build foundations for an evidence system.

An intervention should eventually be connected to evidence:

- research
- internal deployment observations
- incident analysis
- expert assessment
- standards
- manufacturer claims
- uncertainty/confidence

Clearly distinguish:

RESEARCH EVIDENCE
INTERNAL OBSERVATION
EXPERT OPINION
VENDOR CLAIM

Do not present vendor marketing as scientific evidence.

This becomes part of the long-term moat:

deployment
→ outcome
→ anonymized learning
→ research
→ better standards
→ better training
→ better recommendations
→ better deployments

# 17. ACADEMY

Architect the Academy even if the full LMS is post-MVP.

Progression concept:

Trainee
→ Security Professional
→ Senior
→ Protector
→ Team Lead

Academy should eventually manage:

- training modules
- assessments
- practical evaluations
- certifications
- expiration
- recertification
- capability improvement
- scenario training
- instructor assessment

The connection matters:

real-world deployment identifies weakness
→ training addresses weakness
→ reassessment
→ capability profile updates
→ future matching improves

# 18. BUSINESS / ENVIRONMENT ACCOUNTS

Do not assume every account is an individual.

Architecture should support organizations and environments.

Examples:

- nightclub
- festival
- hotel
- retail store
- company
- residential building
- neighborhood association
- municipality

Business users should eventually be able to:

- define environments
- request assessment
- request staff
- manage recurring coverage
- view deployments
- view incidents
- see privacy-respecting analytics
- view recommendations
- procure interventions

Do not build the entire municipality product now.

Make the domain extensible enough that we do not need to rewrite everything later.

# 19. SECURITY OS

Think of the underlying platform as modules:

IDENTITY
ENVIRONMENTS
SAFETY GRAPH
ASSESSMENTS
INTERVENTIONS
PROTECTORS
CAPABILITIES
MATCHING
BOOKINGS
ASSIGNMENTS
OPERATIONS
INCIDENTS
FEEDBACK
ACADEMY
MARKETPLACE
EVIDENCE
ANALYTICS

Prefer a modular monolith.

DO NOT introduce microservices merely to look sophisticated.

# 20. TECHNOLOGY

First inspect the repository.

If the existing stack is healthy, preserve it rather than rewriting for fashion.

For a greenfield or clearly appropriate modernization, prefer:

- current stable Next.js App Router
- TypeScript
- pnpm
- PostgreSQL
- Drizzle ORM
- Supabase where useful for Postgres/Auth/Storage/Realtime
- Tailwind
- shadcn/ui
- Zod
- Stripe-ready payments
- Mapbox-ready location/maps
- PWA/mobile-first customer + Protector
- responsive desktop Ops

Use current stable versions compatible with each other.

Do not blindly upgrade into unstable prereleases.

Use strict TypeScript.

Avoid `any` unless genuinely unavoidable and documented.

No giant god components.

No duplicated business logic between client/server.

Server-authoritative permissions.

Use migrations.

Use validation at trust boundaries.

# 21. DATA MODEL

Inspect existing schema first.

At minimum the domain should be able to represent concepts equivalent to:

User
Organization
Membership
CustomerProfile
ProtectorProfile

Environment
EnvironmentType
SafetyPreferenceProfile

Threat
Vulnerability
Assessment
AssessmentFinding
SafetyPlan
Intervention
InterventionRecommendation

Capability
ProtectorCapability
CapabilityEvidence

Certification
TrainingModule
TrainingRecord

Availability

Service
Booking
BookingRequirement
Assignment

Incident
IncidentEvidence

Rating
RatingDimension
Complaint

MarketplaceProvider
MarketplaceItem
Product
ProfessionalService

EvidenceSource
InterventionEvidence

Vehicle

Payment

AuditEvent

Do not create unnecessary tables simply because they are listed here.

Normalize intelligently.

Use enums carefully: don't make future extension painful.

Protect sensitive columns/data.

# 22. BOOKING STATE MACHINE

Do not represent booking status as random strings manipulated throughout the UI.

Define valid states and transitions.

Conceptually:

DRAFT
REQUESTED
REVIEWING
MATCHED
ASSIGNED
ACCEPTED
CONFIRMED
IN_PROGRESS
COMPLETED

plus appropriate:

CANCELLED
DECLINED
EXPIRED
DISPUTED

Use domain functions/server actions/services enforcing valid transitions.

Similarly model Assignment and Incident lifecycle where useful.

# 23. PAYMENTS

Make payment architecture real.

If Stripe credentials exist and the repository already integrates Stripe correctly, complete the integration.

Otherwise:

- create proper payment abstraction
- support PAYMENT_PENDING/manual state
- provide Stripe-ready implementation/configuration
- do NOT fake successful payments

Never put secrets in code.

# 24. LOCATION AND EMERGENCY UX

Location is highly sensitive.

Design accordingly.

If maps/location credentials exist, integrate properly.

Otherwise provide functional abstractions and graceful UI.

Any SOS/assistance feature MUST NOT pretend we are a public emergency service.

Make clear that company assistance is not a substitute for Swiss emergency services.

Do not create fake emergency response behavior.

# 25. DESIGN

This must look like a premium Swiss technology company.

NOT:

- tactical cosplay
- camouflage
- shields everywhere
- guns
- eagles
- lions
- macho bodyguard stock photography
- black/red "operator" cliché
- cheap security-company aesthetic

Desired feeling:

CALM
PRECISE
SAFE
DISCREET
HUMAN
PREMIUM
TECHNOLOGICALLY ADVANCED
TRUSTWORTHY

Mobile UX should be extremely simple.

A frightened or stressed customer must be able to use it.

Use excellent typography, spacing, hierarchy and interaction states.

Accessibility matters.

Dark mode may exist, but don't confuse dark with premium.

Do not let placeholder branding block implementation.

The FINAL BRAND NAME IS NOT YET DECIDED.

Use a clearly centralized temporary product name/token so renaming later is trivial.

Do not spread a placeholder brand string across 100 files.

# 26. CUSTOMER HOME UX

The product should eventually make three primary intentions obvious:

"I need someone with me."
→ Protector booking

"I'm concerned about my safety."
→ Safety Assessment

"I manage a place or event."
→ Business Safety

Marketplace can be accessible separately and surfaced contextually through recommendations.

Do not dump twenty modules onto the first screen.

# 27. ETHICS / PRODUCT INTEGRITY

Do not build fear-based dark patterns.

Do not exaggerate danger to sell products.

Do not manipulate users into buying Protectors.

Do not create opaque surveillance scoring.

Do not infer criminality from protected characteristics.

Do not use race, ethnicity, religion, nationality, gender, sexual orientation or similar protected characteristics as "risk" proxies.

Do not turn neighborhoods into simplistic red/green danger maps without defensible data and context.

Do not make claims of guaranteed safety.

# 28. AI

AI should assist where useful, not exist for marketing.

Appropriate future/initial uses include:

- structuring free-form assessment input
- explaining recommendations
- summarizing incident reports
- identifying missing information
- surfacing relevant evidence
- suggesting candidate interventions for human/system validation
- operations assistance
- identifying training gaps

AI MUST NOT autonomously decide:

- who is dangerous
- who should be physically removed
- whether force should be used
- whether someone is guilty
- irreversible serious personnel decisions

Keep deterministic logic for critical matching/permissions/state transitions.

# 29. ANALYTICS

Build privacy-conscious analytics foundations.

Useful operational measures eventually include:

- bookings
- fulfillment
- response time
- cancellations
- assignment acceptance
- punctuality
- incidents
- verbally resolved incidents
- physical interventions
- medical escalation
- complaints
- customer feeling-of-safety ratings
- professionalism
- de-escalation
- training completion
- capability gaps
- recommendation adoption
- intervention outcomes

Do not optimize for vanity metrics.

# 30. IMPLEMENTATION STRATEGY

FIRST:

1. Inspect the entire repository.
2. Read README/docs.
3. Inspect package manifests.
4. Inspect app structure.
5. Inspect database/schema/migrations.
6. Inspect auth.
7. Inspect current UI/routes.
8. Inspect tests.
9. Inspect CI.
10. Inspect environment configuration.
11. Inspect existing product terminology.
12. Search for stale prototype concepts and TODOs.
13. Understand what is already working.
14. Identify technical debt and broken flows.

THEN form an internal implementation plan.

DO NOT stop and send me the plan.

Execute it.

Preserve good existing architecture.

Refactor bad architecture when doing so materially improves the product.

Avoid pointless rewrites.

# 31. PRIORITY ORDER

If scope becomes large, prioritize in this exact order:

P0 — REAL COMMERCIAL LOOP

auth
customer booking
Protector profiles
capabilities
availability
matching
Ops assignment
Protector acceptance
start/end assignment
feedback/incidents
permissions
database persistence

P1 — SAFETY FOUNDATION

environments
Safety Preference Profile
assessment
findings
Safety Plan
interventions
privacy/freedom trade-offs

P2 — MARKETPLACE FOUNDATION

providers
items
product/service taxonomy
intervention linkage
privacy/evidence metadata

P3 — ACADEMY FOUNDATION

training
certification
capability updates

P4 — ADVANCED PLATFORM

business environments
analytics
evidence graph
advanced recommendation engine
robotics integrations
community/municipal modules

A beautiful marketplace is worthless if the booking loop doesn't work.

# 32. MVP DEFINITION OF DONE

The MVP is not done until this can happen with persisted data:

1. Customer signs up.
2. Customer creates profile.
3. Customer sets relevant safety/privacy preferences.
4. Customer requests a service.
5. Booking persists.
6. Operations sees it.
7. System produces eligible/matched approved Protectors.
8. Ops understands why each matches.
9. Ops assigns one.
10. Protector sees assignment.
11. Protector accepts.
12. Customer sees confirmation.
13. Protector starts assignment.
14. Protector completes assignment.
15. Customer submits multidimensional feedback.
16. Protector submits post-assignment report/incident if necessary.
17. Ops sees the complete lifecycle.

Also provide a functional initial Safety Assessment flow that produces/persists a Safety Plan, even if recommendations initially use deterministic seeded rules rather than AI.

# 33. DEMO / SEED DATA

Provide realistic development seed data.

Include:

- multiple Protectors
- different capabilities
- languages
- certifications
- availability
- several customers
- example environments
- example bookings
- completed assignment
- example assessment
- Safety Plan
- marketplace products/services
- evidence metadata

Do not use ridiculous lorem ipsum.

Use realistic Zürich-oriented examples without pretending they are real people.

# 34. TESTING

Add meaningful tests.

Prioritize:

- authorization
- booking transitions
- assignment transitions
- matching eligibility
- matching explanations
- Safety Preference constraints
- recommendation filtering
- sensitive-data access boundaries
- validation
- critical API/server actions

Run:

format
lint
typecheck
tests
build

Fix failures.

Do not merely tell me what failed.

# 35. SECURITY REVIEW

Before considering the task complete, review for:

- IDOR
- broken authorization
- privilege escalation
- sensitive-data leakage
- exposed service keys
- unsafe client-side authorization
- insecure uploads
- injection
- missing validation
- excessive logging
- location leakage
- incident-report leakage
- marketplace-provider data leakage
- insecure admin routes

Fix what you can.

Document remaining risks.

# 36. DOCUMENTATION

Update/create:

README.md

It must contain:

- what the product is
- architecture
- prerequisites
- exact setup
- environment variables
- database setup
- migrations
- seed
- development
- tests
- production build
- deployment
- role model

Create/update:

.env.example

No real secrets.

Create:

docs/ARCHITECTURE.md
docs/DOMAIN.md
docs/PRIVACY.md
docs/SAFETY_PRINCIPLES.md
docs/MATCHING.md

Keep documentation synchronized with reality.

Remove or clearly mark stale docs.

# 37. TODO / ROADMAP

Create a concise TODO.md containing ONLY things genuinely not completed.

Separate:

LAUNCH BLOCKERS
POST-LAUNCH
LEGAL / REGULATORY
EXTERNAL CREDENTIALS
PHYSICAL OPERATIONS
LONG-TERM RESEARCH

Do not dump hundreds of vague ideas into TODO.

# 38. SWISS / ZÜRICH CONTEXT

Initial launch is Zürich, Switzerland.

Do not invent legal compliance.

Where licensing/regulatory questions affect the product:

- architect for compliance
- document the dependency
- do not falsely claim compliance
- do not hard-code unverified legal assumptions

Physical security services may require cantonal authorization and appropriately qualified personnel.

Software must not imply an unlicensed provider can legally perform regulated services.

Keep operational/legal configuration flexible.

# 39. ARCHITECTURAL RESTRAINT

Do NOT introduce:

- Kubernetes
- microservices
- Kafka
- event sourcing everywhere
- blockchain
- Redis without demonstrated need
- vector databases without demonstrated need
- elaborate AI agent frameworks
- unnecessary GraphQL
- premature native apps

A clean modular monolith with PostgreSQL is preferable.

Build for extraction later, not distributed complexity now.

# 40. FUTURE ROBOTICS

The domain should support robots as marketplace items/providers/capabilities eventually.

Examples:

patrol robot
quadruped inspection robot
drone
fixed autonomous sensor system

Do NOT build fake robot control screens.

Instead ensure marketplace/intervention architecture can later describe:

- capabilities
- operating environment
- autonomy level
- human supervision requirements
- sensors
- privacy impact
- recording behavior
- cloud/local processing
- legal restrictions
- maintenance
- provider
- deployment history
- evidence

# 41. WHAT MAKES THIS COMPANY SPECIAL

Every product decision should reinforce these differentiators:

1. SAFETY, NOT SECURITY THEATRE

We care whether interventions work.

2. FREEDOM + PRIVACY

Safety should not automatically mean surveillance or restriction.

3. HUMAN CAPABILITY

Protectors are selected and developed for judgment, emotional stability, communication and real capability, not intimidation.

4. EXPLAINABLE MATCHING

The system can explain why a person/intervention fits a situation.

5. SAFETY SCIENCE

Threats, vulnerabilities, interventions, evidence and outcomes become structured knowledge.

6. CONTINUOUS LEARNING

Deployments improve training and recommendations.

7. ENVIRONMENTAL SCOPE

Person → home → journey → venue → neighborhood → city.

8. MARKETPLACE

The correct solution may be our Protector, somebody else's service, a product, a robot, training, an environmental change—or nothing.

9. TRUST

Never create fear merely to increase sales.

# 42. FINAL PRODUCT TEST

Before finishing, mentally walk through these users:

PERSON A:
A woman wants a calm qualified person to accompany her home after receiving unwanted attention.

PERSON B:
A crypto founder wants to understand physical/digital exposure without disclosing unnecessary information.

PERSON C:
A couple wants to improve home safety but refuses cloud cameras and facial recognition.

PERSON D:
A nightclub wants professional security staff who de-escalate rather than antagonize guests.

PERSON E:
A warehouse accepts autonomous patrol robots and wants to compare them with cameras/human patrols.

PERSON F:
A neighborhood association wants to understand why residents feel unsafe and compare lighting/environmental interventions with surveillance.

The architecture should make all six plausible without pretending all six are fully implemented in the MVP.

# 43. EXECUTION BEHAVIOR

Do not ask me:

"Would you like me to implement X?"

Implement it if it follows from this specification.

Do not stop after:

- creating types
- making mock screens
- adding TODO comments
- writing documentation
- producing a plan

Continue through the working vertical slice.

When you discover existing code that conflicts with this prompt, use judgment:

- preserve good implementation
- migrate compatible concepts
- refactor obsolete concepts
- remove dead prototype code
- keep migrations safe

Never destroy working functionality casually.

Do not silently delete potentially important user data/migrations.

# 44. FINAL VERIFICATION

Before reporting completion:

- inspect git diff
- ensure no secrets were committed
- run formatting
- run lint
- run typecheck
- run tests
- run production build
- fix failures
- inspect critical flows
- inspect responsive UI
- inspect authorization
- inspect database migrations
- inspect docs for stale statements

If browser/UI tooling is available, actually exercise the primary flows.

Fix obvious visual/interaction problems you encounter.

# 45. FINAL RESPONSE

Do not give me a giant essay describing intentions.

After doing the work, report succinctly:

BUILT
What actually works.

ARCHITECTURE
Important decisions.

VERIFIED
Tests/typecheck/build and actual results.

LAUNCH BLOCKERS
Only genuine blockers requiring credentials, regulatory work, physical operations or external decisions.

NEXT
The highest-value next engineering actions.

Include the branch/commit/PR information if applicable.

Most importantly:

DO THE WORK.

The target is not "a promising security startup prototype."

The target is the foundation of a company whose long-term mission is:

UNDERSTAND WHAT MAKES PEOPLE AND PLACES SAFE, THEN PROVIDE THE PEOPLE, PRODUCTS, SERVICES, TRAINING AND TECHNOLOGY TO MAKE IT HAPPEN—WITHOUT UNNECESSARILY SACRIFICING PRIVACY OR FREEDOM.
