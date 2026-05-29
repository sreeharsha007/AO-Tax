export const COUNTRIES = [
  { code: 'US', dial: '+1',   flag: '🇺🇸', label: 'United States' },
  { code: 'IN', dial: '+91',  flag: '🇮🇳', label: 'India' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧', label: 'United Kingdom' },
  { code: 'CA', dial: '+1',   flag: '🇨🇦', label: 'Canada' },
  { code: 'AU', dial: '+61',  flag: '🇦🇺', label: 'Australia' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪', label: 'Germany' },
  { code: 'SG', dial: '+65',  flag: '🇸🇬', label: 'Singapore' },
  { code: 'AE', dial: '+971', flag: '🇦🇪', label: 'UAE' },
]

export const INCOME_OPTIONS = [
  { id: 'w2',          label: 'Salary or wages',            sub: 'W-2 from employer' },
  { id: 'freelance',   label: 'Freelance or self-employed',  sub: 'Schedule C' },
  { id: 'investments', label: 'Investments',                 sub: 'Stocks, ETFs, crypto' },
  { id: 'dividends',   label: 'Dividends & interest',        sub: 'From brokerage accounts' },
  { id: 'rental',      label: 'Rental income',               sub: 'Property you own' },
  { id: 'foreign',     label: 'Foreign income',              sub: 'Earned outside the US' },
]

export const DEDUCTION_OPTIONS = [
  { id: 'mortgage',   label: 'Home mortgage',           sub: 'Interest & property tax' },
  { id: 'student',    label: 'Student loans',           sub: 'Interest paid this year' },
  { id: 'charitable', label: 'Charitable giving',       sub: 'Cash or goods donated' },
  { id: 'medical',    label: 'Medical expenses',        sub: 'Out-of-pocket costs' },
  { id: 'business',   label: 'Business expenses',       sub: 'Work-related deductions' },
  { id: 'homeoffice', label: 'Home office or vehicle',  sub: 'If self-employed' },
]

export const SECTION_LABELS = {
  income_w2:              'Salary & wages (W-2)',
  income_self_employment: 'Freelance income',
  income_investments:     'Investment income',
  income_dividends:       'Dividends & interest',
  income_rental:          'Rental income',
  income_foreign:         'Foreign income',
  deductions_mortgage:    'Home mortgage interest',
  deductions_student:     'Student loan interest',
  deductions_charitable:  'Charitable donations',
  deductions_medical:     'Medical expenses',
  deductions_business:    'Business expenses',
  global_assets:          'Global asset reporting',
}

export function inferFormType(answers) {
  if (answers.usCitizenOrGC) return '1040'
  if (answers.livingInUS) return '1040'
  return '1040-NR'
}

export function buildSectionList(answers) {
  const sections = []
  const income = answers.income || []
  const deductions = answers.deductions || []

  if (income.includes('w2'))          sections.push('income_w2')
  if (income.includes('freelance'))   sections.push('income_self_employment')
  if (income.includes('investments')) sections.push('income_investments')
  if (income.includes('dividends'))   sections.push('income_dividends')
  if (income.includes('rental'))      sections.push('income_rental')
  if (income.includes('foreign'))     sections.push('income_foreign')

  if (deductions.includes('mortgage'))   sections.push('deductions_mortgage')
  if (deductions.includes('student'))    sections.push('deductions_student')
  if (deductions.includes('charitable')) sections.push('deductions_charitable')
  if (deductions.includes('medical'))    sections.push('deductions_medical')
  if (deductions.includes('business') || deductions.includes('homeoffice'))
    sections.push('deductions_business')

  if (answers.globalAssets === true) sections.push('global_assets')

  return sections
}
