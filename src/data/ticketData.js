export const SECTION_SUB_IDS = {
  income:       ['employment', 'interest_dividends', 'retirement', 'sale_assets', 'rental', 'business', 'other_income'],
  expenses:     ['healthcare', 'education', 'charitable', 'retirement_contributions', 'other_expenses'],
  global_assets: ['global_assets'],
}

export const PROFILE_SUB_IDS = ['contact', 'general', 'household', 'dependents', 'last_year_return', 'identity', 'visa_passport', 'banking', 'other']

export const SECTION_ROWS = [
  { label: 'Income & Investments',   sectionId: 'income',        comments: 2, target: 'employment'   },
  { label: 'Expenses & Deductions',  sectionId: 'expenses',      comments: 0, target: 'healthcare'   },
  { label: 'Global Asset Reporting', sectionId: 'global_assets', comments: 0, target: 'global_assets'},
]

export const STEPS = [
  { num: 1, label: 'Complete your profile', sub: 'Tell us who you are. This carries over to future filings.', state: 'active'   },
  { num: 2, label: 'Provide details',       sub: 'Complete your filing details and resolve expert-requested updates.', state: 'upcoming' },
  { num: 3, label: 'Expert review',         sub: 'Priya reviews and freezes your details once all required items are submitted.', state: 'upcoming' },
  { num: 4, label: 'Review drafts',         sub: 'Your tax drafts will appear here after expert review is complete.', state: 'upcoming' },
  { num: 5, label: 'Pay invoice',           sub: 'Invoice is available after you approve the drafts.', state: 'upcoming'  },
]

export const CHAT_MESSAGES = [
  { id: 1, from: 'advisor', text: "Hi Surajit! I've started reviewing your 2025 filing. Could you upload your W-2 from TechNova? I need it to complete the income section.", time: 'May 10 · 10:24 AM' },
  { id: 2, from: 'you',     text: "Hi Priya, just uploaded the W-2 in the Document Vault. Let me know if you need anything else.", time: 'May 11 · 9:05 AM' },
  { id: 3, from: 'advisor', text: "Got it, thank you! I also noticed you had rental income last year — is that still the case for 2025?", time: 'May 12 · 2:18 PM' },
  { id: 4, from: 'you',     text: "Yes, same property. I'll upload the rental income statement today.", time: 'May 12 · 4:30 PM' },
  { id: 5, from: 'advisor', text: "Perfect. I've completed my review and prepared all three draft returns. Please check and approve them when you get a chance.", time: 'May 15 · 11:42 AM' },
  { id: 6, from: 'you',     text: "Approved all three — Federal, NY State, and Schedule D. All looks good!", time: 'May 19 · 3:15 PM' },
  { id: 7, from: 'advisor', text: "Your returns have been filed with the IRS and NY DTF. Confirmation #EF-2025-8841. Your federal refund of $3,240 is expected by June 10.", time: 'May 20 · 9:02 AM' },
]

export const DRAFTS = [
  {
    id: 'd1',
    form: 'Form 1040',
    label: 'Federal Return',
    jurisdiction: 'Federal · IRS',
    headline: '$3,240',
    headlineLabel: 'Estimated refund',
    detail: 'Effective tax rate 18.2% · $54,800 taxable income',
    preparedOn: 'May 19, 2025',
  },
  {
    id: 'd2',
    form: 'Form IT-201',
    label: 'New York State Return',
    jurisdiction: 'State · NY DTF',
    headline: '$847',
    headlineLabel: 'State tax due',
    detail: 'Effective rate 6.1% · Standard deduction applied',
    preparedOn: 'May 19, 2025',
  },
  {
    id: 'd3',
    form: 'Schedule D',
    label: 'Capital Gains & Losses',
    jurisdiction: 'Federal · Attachment',
    headline: '$12,500',
    headlineLabel: 'Net capital gains',
    detail: 'Long-term gains $9,200 · Short-term gains $3,300',
    preparedOn: 'May 19, 2025',
  },
]
