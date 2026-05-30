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
    pillBtnRadius: 'rounded-full',

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

    heroNumberSize: 'text-4xl',
    heroNumberColor: 'text-gray-900',
    successBg: 'bg-blue-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: '',
    advisorAvatarBg: 'bg-purple-600',
    completeBg: 'bg-emerald-50',
    completeAccent: 'text-emerald-700',

    loginHeadingCls: 'text-4xl font-bold tracking-tight',
    sectionHeadingCls: 'text-2xl font-bold',
    heroTagline: 'text-sm text-gray-500',
    wizardQuestionSize: 'text-xl',

    useIllustrations: false,
    emptyStateStyle: 'text',
    monogramStyle: 'none',
    revealIllustrationPalette: 'warm',
    revealStyle: 'check',               // 'check' | 'illustration' | 'number-hero'

    // ── Structural tokens ───────────────────────────────────────────────────
    ambientGlow: false,
    ambientGlowPrimary: '',
    ambientGlowSecondary: '',

    showHeaderIcon: false,
    showTrustSignal: false,

    formCardWrapped: false,
    formFieldSpacing: 'space-y-4',

    cardHoverLift: false,
    animationsEnhanced: false,

    welcomeCardStyle: 'minimal',

    wizardListLayout: false,
    showProgressPercent: true,

    // ── Animation class tokens (per-direction motion character) ─────────────
    stepEnterClass: 'step-enter-default',     // step transition animation
    itemEnterClass: '',                        // item stagger (empty = none)
    wizardProgressStyle: 'bar',               // 'bar' | 'dots'
    wizardIconInline: false,                   // inline icon vs badge
    wizardSelectionStyle: 'fill',             // 'fill' | 'ring' | 'warm-fill'
    wizardRowPy: 'py-3.5',

    // ── New cross-direction tokens ───────────────────────────────────────────
    cardBg: 'bg-white',
    springAnimations: false,
    progressBarHeight: 'h-0.5',
    borderMuted: 'border-gray-200',
    borderMutedHover: 'hover:border-gray-300',
    inputStyle: 'box',                        // 'box' | 'underline'
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
    pillBtnRadius: 'rounded-xl',

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

    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-blue-700',
    successBg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: 'bg-gradient-to-br from-slate-800 to-blue-900',
    advisorAvatarBg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    completeBg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    completeAccent: 'text-emerald-700',

    loginHeadingCls: 'text-5xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-base text-gray-500',
    wizardQuestionSize: 'text-2xl',

    useIllustrations: true,
    emptyStateStyle: 'illustrated',
    monogramStyle: 'rings',
    revealIllustrationPalette: 'warm',
    revealStyle: 'illustration',

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

    wizardListLayout: true,
    showProgressPercent: false,

    // ── Animation class tokens ──────────────────────────────────────────────
    stepEnterClass: 'step-enter',
    itemEnterClass: 'item-enter',
    wizardProgressStyle: 'bar',
    wizardIconInline: false,
    wizardSelectionStyle: 'fill',
    wizardRowPy: 'py-3.5',
    cardBg: 'bg-white',
    springAnimations: true,      // Loft: spring feels warm and physical
    progressBarHeight: 'h-0.5',
    borderMuted: 'border-gray-200',
    borderMutedHover: 'hover:border-gray-300',
    inputStyle: 'box',
  },

  azure: {
    id: 'azure',
    name: 'Azure',
    description: 'Blue-ambient · Modern SaaS · Airy',
    previewPageBg: '#f0f6ff',
    previewAccent: '#2563eb',
    previewCardRadius: '10px',
    previewBtnRadius: '99px',     // shows pill shape in preview

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-[#f0f6ff]',
    pageGrain: false,

    card: 'bg-white border border-blue-50',
    cardRadius: 'rounded-2xl',
    cardShadow: 'shadow-[0_1px_3px_rgba(37,99,235,0.08)]',

    btnPrimary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.97] transition-all tracking-wide',
    btnSecondary: 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 hover:shadow-sm active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-full',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-blue-100 rounded-lg focus:border-blue-500 focus:shadow-[0_0_0_1.5px_rgba(37,99,235,0.30)] bg-white text-gray-900 placeholder-gray-400 transition-all',

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
    pillBtnRadius: 'rounded-full',

    iconStyle: 'phosphor',
    iconWeight: 'duotone',
    useColoredIcons: true,
    iconBadge: false,             // no badge backgrounds in Azure
    iconBadgeRadius: 'rounded-xl',
    iconDefault: 'bg-blue-100 text-blue-600',
    iconProfile: 'bg-blue-100 text-blue-600',
    iconIncome: 'bg-blue-100 text-blue-600',
    iconDeductions: 'bg-indigo-100 text-indigo-600',
    iconAssets: 'bg-cyan-100 text-cyan-700',

    label: 'text-[10px] font-bold tracking-widest text-blue-400 uppercase',

    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-blue-600',
    successBg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50',
    successText: 'text-blue-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: 'bg-gradient-to-br from-sky-400 to-blue-500',
    advisorAvatarBg: 'bg-gradient-to-br from-blue-400 to-blue-600',
    completeBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    completeAccent: 'text-blue-700',

    loginHeadingCls: 'text-5xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-base text-blue-500',
    wizardQuestionSize: 'text-2xl',

    useIllustrations: true,
    emptyStateStyle: 'illustrated',
    monogramStyle: 'square',
    revealIllustrationPalette: 'cool',
    revealStyle: 'illustration',

    // ── Structural tokens ───────────────────────────────────────────────────
    ambientGlow: true,
    ambientGlowPrimary: 'bg-blue-200/20',
    ambientGlowSecondary: 'bg-cyan-100/15',

    showHeaderIcon: true,
    showTrustSignal: true,

    formCardWrapped: false,       // forms breathe on the blue-tinted background
    formFieldSpacing: 'space-y-6',

    cardHoverLift: true,
    animationsEnhanced: true,

    welcomeCardStyle: 'light-gradient',

    wizardListLayout: true,
    showProgressPercent: false,

    // ── Animation class tokens (smooth, deliberate — no springs) ────────────
    stepEnterClass: 'step-enter-azure',
    itemEnterClass: 'item-enter-azure',
    wizardProgressStyle: 'dots',
    wizardIconInline: true,        // inline icons, no badge backgrounds
    wizardSelectionStyle: 'ring',
    wizardRowPy: 'py-2.5',
    cardBg: 'bg-white',
    springAnimations: false,     // Azure: smooth, no spring
    progressBarHeight: 'h-0.5',
    borderMuted: 'border-blue-100',
    borderMutedHover: 'hover:border-blue-200',
    inputStyle: 'box',
  },

  grain: {
    id: 'grain',
    name: 'Grain',
    description: 'Tactile · Physical · Crafted',
    previewPageBg: '#f4f1eb',
    previewAccent: '#1e40af',
    previewCardRadius: '8px',
    previewBtnRadius: '6px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Lora', Georgia, serif",

    pageBg: 'bg-[#f4f1eb]',
    pageGrain: true,

    card: 'bg-[#faf9f6] border border-[#ddd5c5]',
    cardRadius: 'rounded-lg',    // angular like a printed form, not soft like Loft's xl
    cardShadow: 'shadow-[0_2px_8px_rgba(101,76,58,0.10),0_1px_3px_rgba(0,0,0,0.07)]',  // warm-tinted shadow

    btnPrimary: 'bg-blue-800 text-white hover:bg-blue-900 active:scale-[0.97] transition-all tracking-wide',
    btnSecondary: 'bg-[#faf9f6] text-blue-900 border border-[#ddd5c5] hover:bg-[#f4f1eb] active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-lg',
    btnDisabled: 'bg-stone-100 text-stone-400 cursor-not-allowed',

    // Underline input — bottom border only, no box, no radius. The LINE is the field.
    inputCls: 'border-0 border-b-2 border-[#c4b8a8] rounded-none bg-transparent text-gray-900 placeholder-stone-400/60 focus:border-blue-700 focus:outline-none transition-colors',

    accentText: 'text-blue-800',
    accentBg: 'bg-blue-800',
    accentBgHover: 'hover:bg-blue-900',
    accentTextHover: 'hover:text-blue-900',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-700',
    accentTextColor: '#1e40af',

    progressFill: 'bg-blue-800',
    progressTrack: 'bg-[#ddd5c5]',

    stepActive: 'border-2 border-blue-800 text-blue-800 bg-[#faf9f6]',
    stepComplete: 'bg-blue-800 text-white',
    stepUpcoming: 'bg-[#ddd5c5] text-stone-400',

    badgeRadius: 'rounded',
    pillBtnRadius: 'rounded-lg',

    iconStyle: 'phosphor',
    iconWeight: 'light',
    useColoredIcons: false,
    iconBadge: false,
    iconBadgeRadius: 'rounded-md',
    iconDefault: 'bg-stone-100 text-stone-500',
    iconProfile: 'bg-stone-100 text-stone-500',
    iconIncome: 'bg-stone-100 text-stone-600',
    iconDeductions: 'bg-stone-100 text-stone-600',
    iconAssets: 'bg-stone-100 text-stone-600',

    label: 'text-[10px] font-bold tracking-widest text-stone-400 uppercase',

    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-blue-800',
    successBg: 'bg-stone-50',          // flat warm surface — grain texture tells the warmth story
    successText: 'text-stone-900',
    advisorCardBg: 'bg-[#faf9f6]',
    advisorCardHeaderBg: 'bg-stone-900', // solid ink-dark — no digital gradient, physical authority
    advisorAvatarBg: 'bg-gradient-to-br from-blue-800 to-blue-900',
    completeBg: 'bg-gradient-to-br from-amber-50 to-stone-50',
    completeAccent: 'text-blue-800',

    loginHeadingCls: 'text-5xl font-bold tracking-tight leading-tight',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-base text-stone-500',
    wizardQuestionSize: 'text-2xl',

    useIllustrations: true,
    emptyStateStyle: 'illustrated',
    monogramStyle: 'stamp',
    revealIllustrationPalette: 'ink',
    revealStyle: 'illustration',

    ambientGlow: false,
    ambientGlowPrimary: '',
    ambientGlowSecondary: '',

    showHeaderIcon: true,
    showTrustSignal: true,

    formCardWrapped: true,
    formFieldSpacing: 'space-y-5',

    cardHoverLift: true,
    animationsEnhanced: true,

    welcomeCardStyle: 'ink-gradient',

    wizardListLayout: true,
    showProgressPercent: false,

    stepEnterClass: 'step-enter-grain',
    itemEnterClass: 'item-enter-grain',
    wizardProgressStyle: 'bar',
    wizardIconInline: true,
    wizardSelectionStyle: 'fill',   // same blue accent as Yes/No single-select — consistent
    wizardRowPy: 'py-3',
    cardBg: 'bg-[#faf9f6]',      // warm paper cast — not pure white
    springAnimations: false,     // Grain: measured ease-out, no bounce
    progressBarHeight: 'h-1',   // slightly thicker — physical meter feel
    borderMuted: 'border-[#ddd5c5]',
    borderMutedHover: 'hover:border-[#c5b99a]',
    inputStyle: 'underline',
  },

  print: {
    id: 'print',
    name: 'Print',
    description: 'Editorial · Typographic · Precise',
    previewPageBg: '#ffffff',
    previewAccent: '#1d4ed8',
    previewCardRadius: '0px',
    previewBtnRadius: '2px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-white',
    pageGrain: false,

    card: 'bg-white border border-gray-200',
    cardRadius: 'rounded-none',
    cardShadow: '',

    btnPrimary: 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] transition-all tracking-wide',
    btnSecondary: 'bg-white text-gray-900 border border-gray-900 hover:bg-gray-50 active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-none',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-gray-300 rounded-none focus:border-blue-700 focus:outline-none bg-white text-gray-900 placeholder-gray-400 transition-colors',

    accentText: 'text-blue-700',
    accentBg: 'bg-blue-700',
    accentBgHover: 'hover:bg-blue-800',
    accentTextHover: 'hover:text-blue-800',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-700',
    accentTextColor: '#1d4ed8',

    progressFill: 'bg-gray-900',    // editorial: dark ink fill, not blue
    progressTrack: 'bg-gray-100',

    stepActive: 'border-2 border-gray-900 text-gray-900 bg-white',
    stepComplete: 'bg-gray-900 text-white',
    stepUpcoming: 'bg-gray-100 text-gray-400',

    badgeRadius: 'rounded-none',
    pillBtnRadius: 'rounded-none',

    iconStyle: 'lucide',            // Lucide regular — functional, no decorative weight
    iconWeight: 'regular',
    useColoredIcons: false,
    iconBadge: false,
    iconBadgeRadius: 'rounded-none',
    iconDefault: 'text-gray-400',
    iconProfile: 'text-gray-400',
    iconIncome: 'text-gray-400',
    iconDeductions: 'text-gray-400',
    iconAssets: 'text-gray-400',

    label: 'text-[10px] font-bold tracking-widest text-gray-400 uppercase',

    heroNumberSize: 'text-7xl',     // ← THE Print signature: data as typography
    heroNumberColor: 'text-gray-900',
    successBg: 'bg-white',
    successText: 'text-gray-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: '',
    advisorAvatarBg: 'bg-gray-900',
    completeBg: 'bg-white',
    completeAccent: 'text-gray-900',

    loginHeadingCls: 'text-6xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-4xl font-bold',
    heroTagline: 'text-sm text-gray-500',
    wizardQuestionSize: 'text-2xl',

    useIllustrations: false,
    emptyStateStyle: 'text',
    monogramStyle: 'none',
    revealIllustrationPalette: 'none',
    revealStyle: 'number-hero',     // data as typography — no illustration

    // ── Structural tokens ───────────────────────────────────────────────────
    ambientGlow: false,
    ambientGlowPrimary: '',
    ambientGlowSecondary: '',

    showHeaderIcon: false,
    showTrustSignal: true,

    formCardWrapped: true,
    formFieldSpacing: 'space-y-6',

    cardHoverLift: false,
    animationsEnhanced: true,

    welcomeCardStyle: 'editorial',  // no gradient, pure typography

    wizardListLayout: true,
    showProgressPercent: false,

    stepEnterClass: 'step-enter-print',
    itemEnterClass: 'item-enter-print',
    wizardProgressStyle: 'bar',
    wizardIconInline: true,
    wizardSelectionStyle: 'checkbox',  // square checkmark — journalistic
    wizardRowPy: 'py-3',

    cardBg: 'bg-white',
    springAnimations: false,
    progressBarHeight: 'h-0.5',
    borderMuted: 'border-gray-200',
    borderMutedHover: 'hover:border-gray-400',
    inputStyle: 'box',
  },

  authority: {
    id: 'authority',
    name: 'Authority',
    description: 'Structured · Confident · Data-forward',
    previewPageBg: '#f9fafb',
    previewAccent: '#2563eb',
    previewCardRadius: '6px',
    previewBtnRadius: '4px',

    fontBody: "'Inter', system-ui, sans-serif",
    fontHeading: "'Inter', system-ui, sans-serif",

    pageBg: 'bg-[#f9fafb]',
    pageGrain: false,

    card: 'bg-white border border-gray-200',
    cardRadius: 'rounded-md',
    cardShadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_rgba(0,0,0,0.06)]',

    btnPrimary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition-all tracking-wide',
    btnSecondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:scale-[0.98] transition-all tracking-wide',
    btnRadius: 'rounded-md',
    btnDisabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',

    inputCls: 'border border-gray-300 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 bg-white text-gray-900 placeholder-gray-400 transition-colors',

    accentText: 'text-blue-600',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-700',
    accentTextHover: 'hover:text-blue-700',
    accentLight: 'bg-blue-50',
    accentBorder: 'border-blue-600',
    accentTextColor: '#2563eb',

    progressFill: 'bg-blue-600',
    progressTrack: 'bg-gray-200',

    stepActive: 'border-2 border-blue-600 text-blue-600 bg-white',
    stepComplete: 'bg-blue-600 text-white',
    stepUpcoming: 'bg-gray-200 text-gray-400',

    badgeRadius: 'rounded-md',
    pillBtnRadius: 'rounded-md',

    iconStyle: 'phosphor',
    iconWeight: 'regular',
    useColoredIcons: false,
    iconBadge: false,
    iconBadgeRadius: 'rounded-sm',
    iconDefault: 'text-gray-400',
    iconProfile: 'text-gray-400',
    iconIncome: 'text-gray-400',
    iconDeductions: 'text-gray-400',
    iconAssets: 'text-gray-400',

    label: 'text-[10px] font-bold tracking-widest text-gray-500 uppercase',

    heroNumberSize: 'text-5xl',
    heroNumberColor: 'text-gray-900',
    successBg: 'bg-white',
    successText: 'text-gray-900',
    advisorCardBg: 'bg-white',
    advisorCardHeaderBg: 'bg-blue-600',
    advisorAvatarBg: 'bg-blue-600',
    completeBg: 'bg-white',
    completeAccent: 'text-blue-600',

    loginHeadingCls: 'text-5xl font-black tracking-tight leading-none',
    sectionHeadingCls: 'text-3xl font-bold',
    heroTagline: 'text-sm text-gray-500',
    wizardQuestionSize: 'text-2xl',

    useIllustrations: false,
    emptyStateStyle: 'text',
    monogramStyle: 'command',
    revealIllustrationPalette: 'none',
    revealStyle: 'data-readout',

    ambientGlow: false,
    ambientGlowPrimary: '',
    ambientGlowSecondary: '',

    showHeaderIcon: true,
    showTrustSignal: true,

    formCardWrapped: true,
    formFieldSpacing: 'space-y-4',

    cardHoverLift: false,
    animationsEnhanced: true,

    welcomeCardStyle: 'command',

    wizardListLayout: true,
    showProgressPercent: false,

    stepEnterClass: 'step-enter-authority',
    itemEnterClass: 'item-enter-authority',
    wizardProgressStyle: 'bar',
    wizardIconInline: true,
    wizardSelectionStyle: 'accent-bar',
    wizardRowPy: 'py-3',

    cardBg: 'bg-white',
    springAnimations: false,
    progressBarHeight: 'h-1',
    borderMuted: 'border-gray-200',
    borderMutedHover: 'hover:border-gray-300',
    inputStyle: 'box',
  },
}

export const THEME_LIST = ['default', 'loft', 'azure', 'grain', 'print', 'authority']
