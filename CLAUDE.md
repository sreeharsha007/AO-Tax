# AOTax — Project Brief for Claude

## What This Is

AOTax is a **tax filing service web app** — a prototype/design exploration for a product where customers hire a tax advisor (like Priya Nair) to handle their annual filing. The customer logs in, submits their documents and details, the advisor works on the return in the background, and the customer reviews/approves the drafts before they are filed.

This is a **React 18 + Vite SPA** — it is a prototype, not a production backend. All data is hardcoded/mocked. The purpose is to explore UX flows and UI design for the customer-facing side of the product.

---

## Tech Stack

- **React 18 + Vite** (SPA)
- **React Router v6** (`useNavigate`, `useSearchParams`)
- **Tailwind CSS v3** — utility-first, no CSS modules
- **Lucide React** — icon library only (no other icon sets)
- No backend, no API calls, all state is local/mocked

---

## User & Persona

- **Customer:** Surajit Ray, customer ID `#155593`, Tax Year 2025
- **Advisor:** Priya Nair, Senior Tax Advisor
- The relationship is like a concierge service — Priya handles the heavy lifting, Surajit just needs to provide info, review, and approve
- The emotional tone of the product should feel **calm, trustworthy, minimal, human** — not bureaucratic or anxiety-inducing

---

## App Structure

### Routes (`src/App.jsx`)
```
/                     → Dashboard
/tickets/:id          → TicketDetailsPage (e.g. /tickets/467501)
```

### Pages

**`src/pages/Dashboard.jsx`**
The main landing page after login. Shows:
- Dark navbar (`bg-[#0f1923]`) with centered nav items — consistent with ticket details page
- Page header: "Welcome back, Surajit." + subtitle + "Message Priya" (secondary CTA) + "New filing" (primary CTA)
- Main content (2-column layout, max-w-[1280px]):
  - Left column (flex-1): MyTickets, ReferralSection
  - Right sidebar (w-72): AdvisorCard, UpcomingSection, ResourcesSection
- Background: `bg-[#f5f4f0]` warm off-white

**`src/pages/TicketDetailsPage.jsx`**
The main filing details page. It is a **layout shell** — it holds all state and passes it as props to the active layout component. The active layout is determined by `activeLayout` state which defaults to `'default'`.

The page also renders floating panels (chat, documents, filing form) on top of any layout.

---

## Layouts System

The ticket details page uses a swappable layout system. All layouts live in `src/layouts/`.

### Active Layout: Default
**`src/layouts/DefaultLayout.jsx`** is the current production layout. It shows:
- 4-step vertical filing flow (left main area):
  1. **Provide details** — form sections: Profile, Income & Investments, Expenses & Deductions, Global Asset Reporting. Each has a progress % and comment count.
  2. **Expert review** — Priya reviews and freezes details (upcoming until step 1 complete)
  3. **Review drafts** — customer reviews federal return, state return, Schedule D (upcoming until step 2 complete)
  4. **Pay invoice** — invoice payment (upcoming until drafts approved)
- Right sidebar (w-72):
  - Overall progress (% + current step label)
  - Advisor card (Priya Nair, Message + Call buttons — both secondary CTAs)
  - Key dates (Submit details by May 30 · Federal filing deadline Apr 15, 2026)
  - Need help / Visit help center

### Demo Modes (URL query params for DefaultLayout)
- `/tickets/467501` — fresh state, step 1 in progress, no sections started
- `/tickets/467501?demo=step3` — all sections complete, step 3 (Review drafts) is active
- `/tickets/467501?demo=complete` — all form sections completed, step 1 shows "Submit filing" button ready

### Concept Layouts (Hidden — for design exploration only)
The `FloatingConceptPanel` is **commented out** in TicketDetailsPage.jsx. To re-enable it, uncomment the panel in `src/pages/TicketDetailsPage.jsx` around line 221. All concept layouts are fully built and wired — just the switcher UI is hidden.

The concept layouts are accessible via `?layout=<key>` URL param. Keys:
- `checklist` — ChecklistLayout
- `interview` — InterviewLayout (3 scenarios)
- `standup` — StandupLayout (3 scenarios)
- `concierge` — ConciergeLayout (3 scenarios)
- `inbox` — InboxLayout (3 scenarios)
- `brief` — MorningBriefLayout (3 scenarios)
- `studio` — StudioLayout (3 scenarios)
- `status` — StatusLayout (3 scenarios)
- `quiet` — QuietRoomLayout (3 scenarios)

Each concept layout receives a `scenario` prop (0/1/2) representing different states in the filing lifecycle. These were built to explore different interaction paradigms — from task-list-heavy to minimal/calm.

**Design direction for concept layouts:** "The AO Tax team is so good at handling the details that the burden on the customer is very low. Calm, trustworthy, human, minimal but still functional."

---

## Components

### `src/components/Navbar.jsx`
Used on all pages. Accepts `activePage` and `dark` props.
- `dark=true` → `bg-[#0f1923]` dark navy, white text — used everywhere now
- Nav items are **absolutely centered** in the header, logo left, user+bell right
- Nav items use `whitespace-nowrap` to prevent wrapping
- "EST. 2003" tagline was removed
- Active item in dark mode: white text with bottom border underline

### `src/components/MyTickets.jsx`
The filings list on the dashboard. Key design decisions:
- **List/table view** (not card grid — we explored cards and reverted)
- **No "All" tab** — tabs were replaced with a "Show completed" toggle
- **Filters:** Year dropdown + Type dropdown (left) + "Show completed" toggle (right-aligned)
- When "Show completed" is ON, completed filings are appended to the active list, sorted by date (most recent first)
- Columns: Ticket ID (blue link), Service, Status badge, Updated, Progress bar

**Current mock tickets:**
| ID | Status | Tab | Year | href |
|---|---|---|---|---|
| #467503 | Not started | active | 2025 | `/tickets/467501` |
| #467502 | Needs approval | active | 2025 | `/tickets/467501?demo=step3` |
| #467501 | Ready to submit | active | 2025 | `/tickets/467501?demo=complete` |
| #467400 | Filed | completed | 2024 | null |

Status badge colors:
- Not started → gray
- Needs approval → amber
- Ready to submit → purple
- In review → blue
- Filed → emerald
- On hold → orange

### `src/components/AdvisorCard.jsx`
Right sidebar widget showing Priya Nair (PN avatar, purple background). Message + Call buttons are both **secondary style** (white bg, gray border).

### `src/components/ReferralSection.jsx`
"Refer a friend, earn $25" section. "Invite friends" button is **secondary style** (white bg, gray border). Shows referral link, share icons, and a list of referred friends (currently sample data).

### `src/components/UpcomingSection.jsx`
Right sidebar — upcoming dates (IRS deadlines, quarterly check-ins, etc.)

### `src/components/ResourcesSection.jsx`
Right sidebar — 4 resource tiles (Check refund status, Received an IRS notice?, How to read your return, How to file with AOTax)

### `src/components/FilingFormShell.jsx`
The full-screen form that slides in when a user opens a filing section. Has sub-sections with question fields, save/submit logic. Passes `onSave` callback back to TicketDetailsPage to persist state.

### `src/components/FloatingConceptPanel.jsx`
The bottom-center floating switcher for switching between layout concepts and scenarios. Currently commented out in TicketDetailsPage. Has two rows: layout selector (top) + scenario stepper (bottom, only when a concept with scenarios is active).

### `src/components/NewTicketModal.jsx`
Modal for creating a new filing, triggered by "+ New filing" button on dashboard.

---

## Removed Components (files still exist, just not imported/used)

These were removed from the Dashboard intentionally to simplify the UI:
- **`StatCards`** — 4 stat tiles (Filing status, Open tickets, Docs uploaded, Referral balance). Removed — felt too dashboard-heavy for the calm direction.
- **`NextStep`** — Dark banner showing the user's next action (e.g. "Upload last two pay stubs"). Removed — too action-heavy for the calm/trust direction.
- **`FilingJourney`** — Horizontal stage tracker (Intake → Documents → Advisor Review → Tax Draft → Your Approval → Filed). Removed — redundant with information available in MyTickets.
- **`DocumentsSection`** — Right sidebar checklist of required documents with upload links. Removed — felt like too much pressure on the customer.

**Do NOT re-add these without explicit direction.** They were removed as a design decision, not an accident.

---

## Filing Flow & Business Logic

### The 4-Step Filing Process
1. **Provide details** — Customer fills in profile, income, deductions, global assets via the filing form. Each section has sub-sections. Progress is tracked per sub-section.
2. **Expert review** — Priya reviews everything. Customer waits. No action needed.
3. **Review drafts** — Priya prepares draft returns (Federal Form 1040, NY State IT-201, Schedule D). Customer reviews and approves each. Can request changes.
4. **Pay invoice** — After all drafts approved, invoice is presented. Customer pays.

### Demo Data (filing #467501)
- **Taxpayer:** Surajit Ray, married filing jointly, 1 qualifying child
- **Income:** $142,000 W-2 from TechNova + $12,500 net capital gains (Q1+Q2 broker statements) + $24,000 gross rental income (84 Grove Street)
- **Deduction:** Standard deduction $29,200 (confirmed over itemized)
- **Taxable income:** $54,800
- **Effective tax rate:** 18.2%
- **Federal refund:** $3,240
- **NY State:** $847 due
- **Invoice:** $527, due May 30

### State Management in TicketDetailsPage
All state lives in `TicketDetailsPage.jsx` and is passed as props to the active layout:
- `openStep` — which of the 4 steps is expanded
- `filingSubmitted` — whether step 1 has been submitted
- `draftsApproved` — whether all draft reviews are approved
- `paymentComplete` — whether invoice is paid
- `persistedSubStates` — completion state of each form sub-section
- `persistedFieldValues` — saved field values from the form
- `chatOpen/docsOpen` — floating panel open state
- `draftStates` — per-draft approval state (pending/approved/changes_requested)

---

## Design Principles (Non-negotiable Direction)

1. **Calm over urgent** — The customer should feel the advisor has it handled. Don't surface problems or pending items aggressively.
2. **Minimal but functional** — Whitespace is intentional. Don't add widgets "because there's space."
3. **Human, not bureaucratic** — Priya speaks in prose, not checklists. The UI should reflect this.
4. **Secondary CTAs for support actions** — Message, Call, Invite friends = outlined/white buttons. Primary actions (New filing, Start filing, Approve) = dark/filled buttons.
5. **Consistent dark navbar** — Both dashboard and ticket details use the dark `#0f1923` navbar. This was a deliberate decision to unify the app feel.
6. **No card grids for filings list** — We explored it and reverted. The table/list view is the right call for this data density.

---

## Visual Tokens
- Background: `bg-[#f5f4f0]` (warm off-white, used on dashboard + ticket details body)
- Navbar: `bg-[#0f1923]` (dark navy)
- Primary CTA: `bg-gray-900 text-white hover:bg-gray-800`
- Secondary CTA: `bg-white text-gray-700 border border-gray-200 hover:bg-gray-50`
- Section labels: `text-[10px] font-bold tracking-widest text-gray-400` (all caps)
- Status badges: rounded-full, small text, color-coded per status (see MyTickets)

---

## What's Next / Possible Directions

- Continue refining the DefaultLayout ticket details page
- Explore the filing form UX (FilingFormShell) — currently functional but not fully polished
- The "Not started" ticket (#467503) should eventually lead into a clean onboarding/intake flow
- The concept layouts (Brief, Studio, Status, Quiet, etc.) are available to revisit if the direction shifts back toward exploring alternatives
- The ReferralSection could be moved to a dedicated Invite & Earn page (it has its own nav item)
