# Sēn — Production Build Plan V1

## Rule
Do not build the complete production app before validation and pilot evidence justify it.

Phase 8 begins in two layers:
1. Build readiness now.
2. Production implementation after proof gates.

## Product surfaces
### Member app
- Onboarding
- Home
- Explore
- Partner/service detail
- Booking / waitlist / check-in
- Sēn AI
- Calendar layer
- Circles / Squads / Events
- Wallet / Membership / Privileges / Drops
- Profile / Settings / Privacy
- Support

### Partner web
- Overview
- Inventory
- Bookings
- Check-in
- Payouts
- Performance
- Support
- Settings

### Internal ops console
- Member lookup
- Booking controls
- Refund/credit
- Partner controls
- Incident management
- Payout reconciliation
- Fraud flags
- Audit log

## Recommended stack
- Next.js / React
- TypeScript
- Supabase Postgres
- Supabase Auth
- Row Level Security
- Server-side policy checks for consequential actions
- Payment processor abstraction
- Foundation-model abstraction for AI
- Event/audit logging
- Vercel deployment

## Build order
1. Identity + memberships
2. Partner + inventory model
3. Booking state machine
4. Payments / ledger
5. Check-in
6. Operator console
7. Sēn AI tool layer
8. Wallet / value
9. Privileges / Drops
10. Circles / Squads
11. Partner portal
12. Analytics / experiments

## Non-negotiables
- immutable ledger
- no false-success AI
- audit consequential actions
- least-privilege partner access
- member-first recovery on partner/system failure
- privacy controls for memory/location/calendar
- feature flags for unfinished systems
