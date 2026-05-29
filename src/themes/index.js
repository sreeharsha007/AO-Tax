export const THEMES = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Clean · Blue · Functional',
    previewPageBg: '#ffffff',
    previewAccent: '#2563eb',
    previewCardRadius: '6px',
    previewBtnRadius: '6px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-white',
    pageGrain: false,

    card: 'bg-white border border-gray-200',
    cardRadius: 'rounded-xl',
    cardShadow: '',

    btnPrimary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]',
    btnSecondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
    btnRadius: 'rounded-xl',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-gray-200 rounded-xl focus:border-blue-400 bg-white text-gray-900 placeholder-gray-400',

    accentText: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-700',
    accentTextHover: 'hover:text-blue-700',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-500',
    accentTextColor: '#2563eb',

    progressFill: 'bg-blue-500',
    progressTrack: 'bg-gray-100',

    stepActive: 'border-2 border-blue-600 text-blue-600 bg-white',
    stepComplete: 'bg-green-500 text-white',
    stepUpcoming: 'bg-gray-200 text-gray-400',

    badgeRadius: 'rounded-full',

    // Icon system
    iconStyle: 'lucide',
    iconWeight: 'regular',
    useColoredIcons: false,
    iconBadge: false,
    iconBadgeRadius: 'rounded-lg',
    iconDefault: 'bg-gray-100 text-gray-500',
    iconProfile: 'bg-gray-100 text-gray-500',
    iconIncome: 'bg-gray-100 text-gray-500',
    iconDeductions: 'bg-gray-100 text-gray-500',
    iconAssets: 'bg-gray-100 text-gray-500',

    label: 'text-[10px] font-bold tracking-widest text-gray-400 uppercase',

    // Key moment tokens
    heroNumberSize: 'text-4xl',
    heroNumberColor: 'text-gray-900',
    successBg: 'bg-blue-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: '',
    advisorAvatarBg: 'bg-purple-600',
    completeBg: 'bg-emerald-50',
    completeAccent: 'text-emerald-700',

    // Typography scale tokens
    loginHeadingCls: 'text-4xl font-bold tracking-tight',
    sectionHeadingCls: 'text-2xl font-bold',
    heroTagline: 'text-sm text-gray-500',
    wizardQuestionSize: 'text-xl',

    // Illustration tokens
    useIllustrations: false,
    emptyStateStyle: 'text',
    monogramStyle: 'none',                      // 'none' | 'rings' | 'square'
    revealIllustrationPalette: 'warm',          // 'warm' | 'cool'

    // ── Structural tokens (gates component-level behavior) ──────────────────
    // These replace all hardcoded `theme.id === 'loft'` checks in components.
    // Adding a new direction = set these tokens, no component code changes needed.

    // Ambient background glow blur orbs
    ambientGlow: false,
    ambientGlowPrimary: '',
    ambientGlowSecondary: '',

    // Icon badge above LoginPage heading
    showHeaderIcon: false,

    // Trust signal text on LoginPage
    showTrustSignal: false,

    // Wrap form fields in a floating white card
    formCardWrapped: false,
    formFieldSpacing: 'space-y-4',

    // Card hover lift effect on interactive cards/buttons
    cardHoverLift: false,

    // Enable all micro-interaction animations
    animationsEnhanced: false,

    // Welcome card header style: 'minimal' | 'dark-gradient' | 'light-gradient'
    welcomeCardStyle: 'minimal',

    // Yes/No pill border radius
    pillBtnRadius: 'rounded-full',

    // Wizard multi-select: stacked list (OptionRow) vs grid (OptionPill)
    wizardListLayout: false,

    // Show percentage on wizard progress bar
    showProgressPercent: true,
  },

  loft: {
    id: 'loft',
    name: 'Loft',
    description: 'Warm · Elevated · Premium',
    previewPageBg: '#f5f4f0',
    previewAccent: '#1d4ed8',
    previewCardRadius: '12px',
    previewBtnRadius: '10px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-[#f5f4f0]',
    pageGrain: true,

    card: 'bg-white border border-gray-100',
    cardRadius: 'rounded-2xl',
    cardShadow: 'shadow-[0_2px_16px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.05)]',

    btnPrimary: 'bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.97] transition-all tracking-wide',
    btnSecondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-xl',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-gray-200 rounded-xl focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(29,78,216,0.10)] bg-[#fafbff] text-gray-900 placeholder-gray-400 transition-all',

    accentText: 'text-blue-700',
    accentBg: 'bg-blue-700',
    accentBgHover: 'hover:bg-blue-800',
    accentTextHover: 'hover:text-blue-800',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-600',
    accentTextColor: '#1d4ed8',

    progressFill: 'bg-blue-600',
    progressTrack: 'bg-gray-100',

    stepActive: 'border-2 border-blue-700 text-blue-700 bg-white shadow-sm',
    stepComplete: 'bg-emerald-500 text-white shadow-sm',
    stepUpcoming: 'bg-gray-200 text-gray-400',

    badgeRadius: 'rounded-full',

    // Icon system — Phosphor duotone badges
    iconStyle: 'phosphor',
    iconWeight: 'duotone',
    useColoredIcons: true,
    iconBadge: true,
    iconBadgeRadius: 'rounded-xl',
    iconDefault: 'bg-blue-50 text-blue-600',
    iconProfile: 'bg-indigo-50 text-indigo-600',
    iconIncome: 'bg-emerald-50 text-emerald-600',
    iconDeductions: 'bg-amber-50 text-amber-600',
    iconAssets: 'bg-sky-50 text-sky-600',

    label: 'text-[10px] font-bold tracking-widest text-gray-400 uppercase',

    // Key moment tokens
    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-blue-700',
    successBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: 'bg-gradient-to-br from-slate-800 to-blue-900',
    advisorAvatarBg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    completeBg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    completeAccent: 'text-emerald-700',

    // Typography scale tokens
    loginHeadingCls: 'text-5xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-base text-gray-500',
    wizardQuestionSize: 'text-2xl',

    // Illustration tokens
    useIllustrations: true,
    emptyStateStyle: 'illustrated',
    monogramStyle: 'rings',                     // LoftMonogram — thin SVG rings
    revealIllustrationPalette: 'warm',          // slate strokes + blue-700 check

    // ── Structural tokens ───────────────────────────────────────────────────
    ambientGlow: true,
    ambientGlowPrimary: 'bg-blue-200/25',
    ambientGlowSecondary: 'bg-indigo-100/30',

    showHeaderIcon: true,
    showTrustSignal: true,

    formCardWrapped: true,
    formFieldSpacing: 'space-y-5',

    cardHoverLift: true,
    animationsEnhanced: true,

    welcomeCardStyle: 'dark-gradient',

    pillBtnRadius: 'rounded-xl',
    wizardListLayout: true,
    showProgressPercent: false,
  },

  azure: {
    id: 'azure',
    name: 'Azure',
    description: 'Blue-ambient · Modern SaaS · Airy',
    previewPageBg: '#f0f6ff',
    previewAccent: '#2563eb',
    previewCardRadius: '10px',
    previewBtnRadius: '10px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-[#f0f6ff]',
    pageGrain: false,

    card: 'bg-white border border-blue-50',
    cardRadius: 'rounded-2xl',
    cardShadow: 'shadow-[0_2px_16px_rgba(37,99,235,0.09),0_1px_4px_rgba(37,99,235,0.06)]',

    btnPrimary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.97] transition-all tracking-wide',
    btnSecondary: 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:shadow-sm active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-xl',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-blue-100 rounded-xl focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] bg-white text-gray-900 placeholder-gray-400 transition-all',

    accentText: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-700',
    accentTextHover: 'hover:text-blue-700',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-400',
    accentTextColor: '#2563eb',

    progressFill: 'bg-blue-500',
    progressTrack: 'bg-blue-50',

    stepActive: 'border-2 border-blue-600 text-blue-600 bg-white',
    stepComplete: 'bg-blue-500 text-white',
    stepUpcoming: 'bg-blue-50 text-blue-300',

    badgeRadius: 'rounded-full',

    // Icon system — Phosphor duotone, more blue-biased badges
    iconStyle: 'phosphor',
    iconWeight: 'duotone',
    useColoredIcons: true,
    iconBadge: true,
    iconBadgeRadius: 'rounded-xl',
    iconDefault: 'bg-blue-100 text-blue-600',
    iconProfile: 'bg-blue-100 text-blue-600',
    iconIncome: 'bg-blue-100 text-blue-600',
    iconDeductions: 'bg-indigo-100 text-indigo-600',
    iconAssets: 'bg-cyan-100 text-cyan-700',

    label: 'text-[10px] font-bold tracking-widest text-blue-400 uppercase',

    // Key moment tokens
    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-blue-600',
    successBg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
    advisorAvatarBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    completeBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    completeAccent: 'text-blue-700',

    // Typography scale tokens
    loginHeadingCls: 'text-5xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-base text-blue-500',
    wizardQuestionSize: 'text-2xl',

    // Illustration tokens
    useIllustrations: true,
    emptyStateStyle: 'illustrated',
    monogramStyle: 'square',                    // AzureMonogram — solid rounded square
    revealIllustrationPalette: 'cool',          // azure/cyan strokes + blue-600 check

    // ── Structural tokens ───────────────────────────────────────────────────
    ambientGlow: true,
    ambientGlowPrimary: 'bg-blue-200/20',
    ambientGlowSecondary: 'bg-cyan-100/15',

    showHeaderIcon: true,
    showTrustSignal: true,

    formCardWrapped: true,
    formFieldSpacing: 'space-y-5',

    cardHoverLift: true,
    animationsEnhanced: true,

    welcomeCardStyle: 'light-gradient',

    pillBtnRadius: 'rounded-xl',
    wizardListLayout: true,
    showProgressPercent: false,
  },
}

export const THEME_LIST = ['default', 'loft', 'azure']
