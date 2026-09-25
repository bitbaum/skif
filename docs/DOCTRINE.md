# Skif doctrine — the layer above the spec

`docs/SPEC.md` is the one-shot build prompt. It was written **before** the
conversation reached its conclusion, so it describes a Protector marketplace
with a safety assessment beside it. This file is the conclusion, and where the
two disagree, **this file wins**.

Source: George's ChatGPT conversation "Приложения телохранителей в Цюрихе"
(started in Russian 2026-09, continued in English), turns 34–47, plus his own
words below. Read in full on 2026-09-25.

## What Skif is

> "Every human being needs life, love — including friends and family — health
> of themselves and the family, and finally safety: safety of themselves and
> family. Because less stress means better life. So we holistically look at
> safety, and we do everything, including cyber security and cyber everything —
> physical and reputational, in any shape or form, from any potential hostile
> actors or events." — George

Skif is not a security company and not "Uber for bodyguards". It protects a
person's **ability to live a good life with low involuntary risk and low
unnecessary stress**. The target is **secure flourishing, not maximum
security**: permanent surveillance, extreme restriction, isolation or constant
fear can make someone technically more protected and their life worse.

One sentence: **we research what makes people and places safe, then provide
the people, products, services and technology to make it happen.**

## Founding principles (non-negotiable; every product decision is tested against them)

1. **Safety exists to enable life, not constrain it.**
2. **We protect what people value from involuntary harm while minimising
   unnecessary costs to freedom, privacy, wellbeing and convenience.**
3. **We recommend the most proportionate effective intervention — even when
   that means recommending nothing we sell.** "Your current measures are
   adequate" is a first-class answer, and it is what makes every other answer
   credible.
4. **Safety is not maximised by minimising freedom.** Safety is the ability to
   live, move, associate and act freely with acceptably low risk of harm — from
   other people, accidents, institutions, technology, *or the security measures
   themselves*.
5. **We don't tell you how safe you must be or how much freedom to surrender.**
   We show the trade-offs and build the safety you choose. The person, family,
   venue or community sets the weights; there is no universal Safety Score™.
6. **We reduce harm; we never shift it.** Rejected on principle: "we make you a
   worse target than the person next to you." Displacing risk onto someone
   without a contract is not safety.
7. **Calm, not intimidating.** A Protector is someone you want beside you —
   judgment, de-escalation, first aid, hospitality — never "a bull at the door".
   The aggressive-bouncer profile must score badly in our own system.
8. **Doctrine inside, competence outside.** The political philosophy shapes
   hiring, architecture and data policy; it is not marketing. Being the most
   professional, most boringly legitimate operator in the canton is the moat.

## The root entity: the Protected Life

The data model starts from **the person and what matters to them**, not from a
catalogue of threats:

```
Person
 ├─ Loved ones / trusted people
 ├─ Health & wellbeing
 ├─ Identity & privacy
 ├─ Reputation
 ├─ Digital life (devices, accounts, keys)
 ├─ Assets
 ├─ Homes & environments
 ├─ Journeys
 ├─ Organisations
 └─ Safety preferences (axes + hard limits)
```

Then, for each: **what matters → what could harm it → how exposed is it →
what reduces that exposure → what that costs in money / privacy / freedom /
convenience / stress → what actually happened.**

The first question the product asks is **"What matters to you, and what are
you worried about?"** — never "which security service would you like to buy?"
It identifies threats and vulnerabilities **without manufacturing fear**, and
never asks a user to enumerate who might attack them.

## Families of harm (the Safety Graph must know all of them)

| Family | Examples |
|---|---|
| Physical | violence, stalking, kidnapping, burglary, fire, accidents, unsafe travel |
| Cyber / digital | account takeover, phishing, malware, device compromise, identity theft, crypto/key security |
| Privacy | doxxing, unwanted tracking, leaked addresses, data-broker exposure, location leakage |
| Reputational | impersonation, coordinated harassment, fabricated material, information attacks, crisis |
| Family / social | threats to partners or children, vulnerable relatives, household preparedness, emergency communication |
| Health / emergency | first aid, preparedness, environmental hazards — complements, never replaces, medical care |
| Financial / assets | theft, fraud, coercion, access to valuables, continuity |
| Environmental | home, workplace, venue, journey, neighbourhood, community |
| Institutional / legal | interactions with institutions that create safety, privacy or rights concerns — with professional boundaries, never pretending to be a lawyer |
| Resilience | what happens when prevention fails: communications, escape, backup access, trusted contacts, recovery, incident response |

A threat model with only the first row is the conventional security company
this doctrine rejects.

## The loop

**ASSESS → IMPROVE → PROTECT → LEARN** (extended: assess → recommend →
marketplace → deploy → measure → learn).

- **Assess** — a Safety Profile across the families above: exposure, routines,
  household, digital footprint, environment. An understandable risk map.
- **Improve** — actions ranked by effectiveness *and* cost to freedom/privacy.
  Don't sell a Protector when changing one practice solves it.
- **Protect** — a human Protector only where a human is the proportionate answer,
  matched on capabilities, with the match explained.
- **Learn** — every deployment and intervention feeds back: what worked, what
  the person felt, what the Protector observed.

## The Safety Graph and the marketplace

`Environment → Threat → Vulnerability → Intervention → Safety benefit + Privacy
cost + Freedom cost + Financial cost + Convenience cost → Outcome`

The marketplace holds **people, products, services and knowledge** in one
place: Protectors, cyber and privacy specialists, reputation/incident-response
experts, locksmiths, installers, trainers, first-aid and preparedness, sensors
(local-only as well as cloud), cameras for those who want them, robots and
drones, insurance. Each listing is scored on evidence and fit, not stars:

> Addresses 2 of your 5 identified vulnerabilities · Estimated impact: High ·
> Evidence confidence: Moderate · Privacy impact: Low · CHF 280 installed ·
> *Privacy alternative: local sensors + lighting — similar benefit, less surveillance.*

Scale: **Person → Home → Journey → Venue → Neighbourhood → Village → Town →
City.** Different buyers, same safety science.

## What is durable

The booking app is easy to copy. What is not:

- **Safety science** — research → standards → training → certification →
  capability profiles → matching → deployments → outcome data → research.
- **The Academy + Capability Graph** — every Protector a multidimensional
  capability vector (judgment, emotional regulation, de-escalation, first aid,
  driving, grappling, trauma-aware care, languages, technical literacy), not 4.8★.
- **Multidimensional reputation** — professionalism, discretion, de-escalation,
  reliability, feeling of safety measured separately, weighted with context, so
  one angry, legitimately-removed guest cannot end a career.

## Entry points and beachheads

Launch narrow, architect for the whole: three doors from day one —
**"I need someone with me"** (book a Protector), **"I'm concerned about my
safety"** (assessment across all harm families), **"I run a venue or event"**
(business). Digital-asset holders are a high-value **vertical**, not the brand.

## What this means for the build (the gap against SPEC.md)

- The assessment covers **every family above**, not only physical/home/venue.
  Cyber, privacy, reputational, family, resilience need intake questions,
  findings and interventions in `src/config/interventions/`.
- `Person` / Protected Life is the root of an assessment; environments hang
  off it.
- The intervention catalogue needs non-physical providers (cyber, privacy
  cleanup, reputation response, preparedness) and "nothing to buy" outcomes.
- Every recommendation shows its privacy and freedom cost next to its benefit.
