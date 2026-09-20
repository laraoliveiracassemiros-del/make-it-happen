# Sēn — Core Data Model V1

## Identity
### users
- id
- email
- phone
- status
- created_at

### member_profiles
- user_id
- display_name
- birth_year
- city
- neighborhood
- preferences_json

### memberships
- id
- user_id
- plan_id
- status
- started_at
- renews_at
- cancel_at

### plans
- id
- code
- name
- monthly_price
- entitlements_json

## Supply
### partners
- id
- name
- category
- tier
- status
- city
- neighborhood
- reliability_score

### partner_locations
- id
- partner_id
- address
- geo
- timezone

### services
- id
- partner_id
- category
- name
- duration_minutes
- benefit_state
- member_price

### inventory_slots
- id
- service_id
- starts_at
- capacity
- available
- source
- status

## Booking
### bookings
- id
- user_id
- service_id
- inventory_slot_id
- state
- member_charge
- sen_subsidy
- partner_payable
- cancellation_policy_snapshot
- created_at

### booking_events
- id
- booking_id
- event_type
- payload
- created_at

### checkins
- id
- booking_id
- method
- status
- verified_at

## Finance
### ledger_entries
- id
- user_id
- partner_id
- booking_id
- source
- direction
- amount
- currency
- reason
- created_at

### partner_payouts
- id
- partner_id
- period_start
- period_end
- amount
- state
- paid_at

## Value layer
### privileges
- id
- code
- title
- rules_json
- expires_at

### member_privileges
- id
- user_id
- privilege_id
- state
- claimed_at
- used_at

### drops
- id
- title
- starts_at
- ends_at
- eligibility_json
- rules_json

## Social
### circles
- id
- name
- type
- city
- visibility
- status

### circle_members
- circle_id
- user_id
- role
- joined_at

### squads
- id
- circle_id
- creator_id
- title
- starts_at
- capacity
- visibility
- status

### squad_members
- squad_id
- user_id
- state

### social_reports
- id
- reporter_id
- target_type
- target_id
- reason
- severity
- status

## AI
### ai_threads
- id
- user_id
- created_at

### ai_messages
- id
- thread_id
- role
- content
- created_at

### ai_memories
- id
- user_id
- key
- value
- sensitivity
- user_visible
- created_at

### ai_actions
- id
- user_id
- tool
- state
- input_json
- result_json
- confirmed_at
- created_at

## Ops
### incidents
- id
- severity
- category
- member_id
- partner_id
- booking_id
- state
- owner
- created_at
- resolved_at

### audit_log
- id
- actor_type
- actor_id
- action
- target_type
- target_id
- payload
- created_at
