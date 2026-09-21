# Sēn — Prototype V5 Validation-Readiness Audit

## Goal
Review the prototype as a first-time user before external testing.

## Fixed in this pass
1. Sēn AI now adapts pricing and recommendations to Free vs Member state.
2. Quick AI suggestions no longer claim Included for Free users.
3. Partner cancellation recovery now refunds Free bookings instead of pretending there was no charge.
4. Membership activation preserves the selected Core / Plus / Black plan.
5. Wallet shows the actual active plan and matching monthly price.
6. Free and Member economic states remain explicit.

## Product coherence

### Onboarding
PASS
- no forced membership selection
- 8-question personalization
- ends in usefulness, not purchase pressure

### Home
PASS
- clear Free / Member state
- contextual day plan
- visible Free economics
- contextual membership nudge

### Explore
PASS
- Sēn Price for Free
- Member Price / Included for members
- public-price comparison

### Booking
PASS
- Free booking has BRL price
- Member booking can show Included
- explicit confirmation before booking

### Recovery
PASS after fix
- Free: refund
- Member: visit restored

### Wallet
PASS
- Free credits in BRL
- Flex Packs
- spend-to-membership meter
- transparent offers
- actual selected membership plan

### Sēn AI
PASS for concept validation
- natural text input
- context-aware Free / Member responses
- editable memory
- nearby suggestion
- pricing awareness

NOT YET PRODUCTION AI
- simulated responses
- no live foundation-model backend
- no real partner inventory tools
- no real location/calendar connection
- no persistence

### Circles
PASS for concept validation
- action-oriented
- no unrestricted stranger DMs
- joining a Squad does not imply a booking

## Remaining risks to test
1. Do users understand Sēn Price vs Member Price vs Included?
2. Do Flex Packs simplify choice or create too much complexity?
3. Does the Free Wallet feel useful rather than salesy?
4. Does membership appear at the right moment?
5. Do users understand what Sēn AI remembers?
6. Do proactive nearby suggestions feel helpful rather than invasive?
7. Can a new user book without founder explanation?

## First user-test tasks
1. Enter Sēn as a new user.
2. Find a reformer class after 18h.
3. Book it as Free.
4. Find the Flex Packs.
5. Explain when Core becomes better.
6. Ask Sēn for something cheap and nearby.
7. Change a remembered preference.
8. Find a Circle / Squad.
9. Compare Free, Core, Plus and Black.

## Rule
Do not explain the interface during the task.
Observe first. Ask why second.
