/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - DESIGN SYSTEM
 * A calm, confidence-building UI design system for mutual fund and SIP education
 * Part of FinLearn Parent Application
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * TARGET USERS:
 * - First-time investors
 * - Students and beginners (age 15+)
 * - Users who may confuse stock trading with mutual fund investing
 * 
 * DESIGN PRINCIPLES:
 * - Dark mode only - calm, focused, reassuring
 * - Long-term wealth building focus, not trading/gambling
 * - Teach how mutual funds & SIP work
 * - Differentiate MF investing from stock trading
 * - Wealth building lab feel, not trading platform
 */

import { Platform, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// COLOR PALETTE - DARK MODE ONLY
// Calm, reassuring colors for long-term wealth thinking
// ═══════════════════════════════════════════════════════════════════════════

export const DesignColors = {
  // ─────────────────────────────────────────────────────────────────────────
  // PRIMARY COLORS - Deep Emerald (Growth & Stability)
  // ─────────────────────────────────────────────────────────────────────────
  primary: {
    50: '#0D1F1A',   // Deepest - backgrounds
    100: '#122E24',  // Deep accent
    200: '#1A4236',  // Medium dark
    300: '#245848',  // Medium
    400: '#2E7A5E',  // Medium light
    500: '#3D9970',  // Main primary - interactive elements
    600: '#5AB88A',  // Light primary
    700: '#80CFA6',  // Lighter
    800: '#B3E4C7',  // Near white
    900: '#E6F7ED',  // White-ish
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SECONDARY COLORS - Calm Blue (Trust & Security)
  // ─────────────────────────────────────────────────────────────────────────
  secondary: {
    50: '#0D1621',   // Deepest backgrounds
    100: '#152538',  // Deep
    200: '#1E3755',  // Medium dark
    300: '#2A4D75',  // Medium
    400: '#3A6795',  // Main secondary
    500: '#5A8FC5',  // Bright blue
    600: '#7FAFD8',  // Light
    700: '#A8C9E8',  // Light accent
    800: '#D0E3F5',  // Lightest
    900: '#E8F3FB',  // Near white
  },

  // ─────────────────────────────────────────────────────────────────────────
  // NEUTRAL COLORS - Dark Mode Grayscale
  // ─────────────────────────────────────────────────────────────────────────
  neutral: {
    0: '#0A0C10',       // Deepest background
    50: '#0F1216',      // Main background
    100: '#161A21',     // Card background
    200: '#1E232C',     // Elevated surface
    300: '#2A313D',     // Border
    400: '#3D4654',     // Muted elements
    500: '#5A6478',     // Placeholder text
    600: '#8892A4',     // Secondary text
    700: '#B0B8C7',     // Medium text
    800: '#D8DCE5',     // Primary text
    900: '#F5F6F8',     // Bright text
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SEMANTIC COLORS - Calm, reassuring, non-aggressive
  // ─────────────────────────────────────────────────────────────────────────
  semantic: {
    // Positive growth - Soft emerald (calm, not flashy)
    positive: {
      light: '#0D1F1A',
      main: '#3D9970',
      dark: '#5AB88A',
      contrastText: '#FFFFFF',
    },
    // Decline - Soft muted (not alarming)
    negative: {
      light: '#1F1A1A',
      main: '#B07070',
      dark: '#C89090',
      contrastText: '#FFFFFF',
    },
    // Caution - Warm amber
    warning: {
      light: '#2D2815',
      main: '#E5B84A',
      dark: '#F0D080',
      contrastText: '#0F1216',
    },
    // Info - Calm blue
    info: {
      light: '#152538',
      main: '#5A8FC5',
      dark: '#7FAFD8',
      contrastText: '#FFFFFF',
    },
    // Learning - Soft purple
    learning: {
      light: '#1B1A2D',
      main: '#9B8DCB',
      dark: '#C1B6E0',
      contrastText: '#FFFFFF',
    },
    // Wealth/Success - Gold accent
    wealth: {
      light: '#2B2510',
      main: '#D4AF37',
      dark: '#E8C860',
      contrastText: '#0F1216',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CHART COLORS - Long-term growth visualization
  // ─────────────────────────────────────────────────────────────────────────
  chart: {
    line: '#3D9970',        // Primary line - emerald
    lineFill: 'rgba(61, 153, 112, 0.15)', // Area fill
    sipLine: '#5A8FC5',     // SIP line - blue
    sipFill: 'rgba(90, 143, 197, 0.12)',
    grid: '#2A313D',        // Grid lines
    axis: '#5A6478',        // Axis labels
    growth: '#5AB88A',      // Growth indicator
    projection: '#D4AF37',  // Future projections - gold
    milestone: '#9B8DCB',   // Milestone markers
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ACCENT COLORS - For illustrations & highlights
  // ─────────────────────────────────────────────────────────────────────────
  accent: {
    emerald: '#3D9970',     // Growth, success
    blue: '#5A8FC5',        // Trust, stability
    gold: '#D4AF37',        // Wealth, achievement
    purple: '#9B8DCB',      // Learning, concepts
    coral: '#B07070',       // Attention (soft)
    teal: '#4A9999',        // Neutral positive
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GRADIENT PRESETS
  // ─────────────────────────────────────────────────────────────────────────
  gradients: {
    primary: ['#1A4236', '#0D1F1A'],
    secondary: ['#2A4D75', '#0D1621'],
    surface: ['#161A21', '#0F1216'],
    wealth: ['#2B2510', '#1A1510'],
    card: ['#1E232C', '#161A21'],
    growth: ['#0D1F1A', '#122E24'],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// Clean, readable fonts for calm wealth education
// ═══════════════════════════════════════════════════════════════════════════

export const DesignTypography = {
  // ─────────────────────────────────────────────────────────────────────────
  // FONT FAMILIES
  // ─────────────────────────────────────────────────────────────────────────
  fontFamily: Platform.select({
    ios: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
      mono: 'Menlo',
    },
    android: {
      regular: 'Roboto',
      medium: 'Roboto-Medium',
      semibold: 'Roboto-Medium',
      bold: 'Roboto-Bold',
      mono: 'monospace',
    },
    default: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
      mono: 'monospace',
    },
  }),

  // ─────────────────────────────────────────────────────────────────────────
  // FONT SIZES
  // ─────────────────────────────────────────────────────────────────────────
  fontSize: {
    // Display - Hero sections
    displayLarge: 40,
    displayMedium: 34,
    displaySmall: 28,

    // Headlines - Page titles
    headlineLarge: 26,
    headlineMedium: 22,
    headlineSmall: 20,

    // Title - Card titles
    titleLarge: 20,
    titleMedium: 18,
    titleSmall: 16,

    // Body - Main content
    bodyLarge: 17,
    bodyMedium: 15,
    bodySmall: 14,

    // Label - Buttons, captions
    labelLarge: 16,
    labelMedium: 14,
    labelSmall: 12,

    // Data - Numbers, amounts
    dataLarge: 28,
    dataMedium: 22,
    dataSmall: 18,

    // Caption
    caption: 12,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LINE HEIGHTS
  // ─────────────────────────────────────────────────────────────────────────
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FONT WEIGHTS
  // ─────────────────────────────────────────────────────────────────────────
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LETTER SPACING
  // ─────────────────────────────────────────────────────────────────────────
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    mono: 1.5,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SPACING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

export const DesignSpacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,

  // Component-specific
  cardPadding: 20,
  cardGap: 16,
  sectionGap: 32,
  screenPadding: 20,
  buttonPadding: {
    horizontal: 24,
    vertical: 16,
  },
  inputPadding: {
    horizontal: 16,
    vertical: 14,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════════════════════════════════════════

export const DesignRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,

  // Component-specific
  button: 12,
  card: 16,
  input: 10,
  chip: 20,
  avatar: 9999,
  modal: 20,
};

// ═══════════════════════════════════════════════════════════════════════════
// SHADOWS - Subtle dark mode shadows
// ═══════════════════════════════════════════════════════════════════════════

export const DesignShadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  glow: {
    shadowColor: '#3D9970',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 0,
  },
  goldGlow: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 0,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// TOUCH TARGETS
// ═══════════════════════════════════════════════════════════════════════════

export const DesignTouch = {
  minTargetSize: 48,
  buttonSmall: 44,
  buttonMedium: 52,
  buttonLarge: 60,
  inputSmall: 44,
  inputMedium: 52,
  inputLarge: 60,
  iconButtonSmall: 40,
  iconButtonMedium: 48,
  iconButtonLarge: 56,
  listItemSmall: 56,
  listItemMedium: 72,
  listItemLarge: 88,
};

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION & TRANSITIONS - Slower, calmer animations
// ═══════════════════════════════════════════════════════════════════════════

export const DesignMotion = {
  duration: {
    instant: 150,
    fast: 250,
    normal: 400,
    slow: 600,
    slower: 800,
    wealth: 1200, // Special slow animation for wealth growth
  },
  easing: {
    standard: 'ease-in-out',
    decelerate: 'ease-out',
    accelerate: 'ease-in',
    linear: 'linear',
  },
  spring: {
    gentle: { damping: 25, stiffness: 80, mass: 1 },
    calm: { damping: 30, stiffness: 60, mass: 1.2 },
    smooth: { damping: 20, stiffness: 100, mass: 0.8 },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// BREAKPOINTS
// ═══════════════════════════════════════════════════════════════════════════

export const DesignBreakpoints = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isSmallPhone: SCREEN_WIDTH < 375,
  isPhone: SCREEN_WIDTH < 768,
  isTablet: SCREEN_WIDTH >= 768,
};

// ═══════════════════════════════════════════════════════════════════════════
// ICON SIZES
// ═══════════════════════════════════════════════════════════════════════════

export const DesignIcons = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  illustrationSmall: 80,
  illustrationMedium: 120,
  illustrationLarge: 180,
  illustrationHero: 240,
};

// ═══════════════════════════════════════════════════════════════════════════
// TEXT STYLE PRESETS
// ═══════════════════════════════════════════════════════════════════════════

export const DesignTextStyles = {
  // Display styles
  displayLarge: {
    fontSize: DesignTypography.fontSize.displayLarge,
    fontWeight: DesignTypography.fontWeight.bold,
    lineHeight: DesignTypography.fontSize.displayLarge * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[900],
  },
  displayMedium: {
    fontSize: DesignTypography.fontSize.displayMedium,
    fontWeight: DesignTypography.fontWeight.bold,
    lineHeight: DesignTypography.fontSize.displayMedium * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[900],
  },
  displaySmall: {
    fontSize: DesignTypography.fontSize.displaySmall,
    fontWeight: DesignTypography.fontWeight.bold,
    lineHeight: DesignTypography.fontSize.displaySmall * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[900],
  },

  // Headlines
  headlineLarge: {
    fontSize: DesignTypography.fontSize.headlineLarge,
    fontWeight: DesignTypography.fontWeight.bold,
    lineHeight: DesignTypography.fontSize.headlineLarge * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[900],
  },
  headlineMedium: {
    fontSize: DesignTypography.fontSize.headlineMedium,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.headlineMedium * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[800],
  },
  headlineSmall: {
    fontSize: DesignTypography.fontSize.headlineSmall,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.headlineSmall * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[800],
  },

  // Titles
  titleLarge: {
    fontSize: DesignTypography.fontSize.titleLarge,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.titleLarge * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[800],
  },
  titleMedium: {
    fontSize: DesignTypography.fontSize.titleMedium,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.titleMedium * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[700],
  },
  titleSmall: {
    fontSize: DesignTypography.fontSize.titleSmall,
    fontWeight: DesignTypography.fontWeight.medium,
    lineHeight: DesignTypography.fontSize.titleSmall * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[700],
  },

  // Body
  bodyLarge: {
    fontSize: DesignTypography.fontSize.bodyLarge,
    fontWeight: DesignTypography.fontWeight.regular,
    lineHeight: DesignTypography.fontSize.bodyLarge * DesignTypography.lineHeight.relaxed,
    color: DesignColors.neutral[700],
  },
  bodyMedium: {
    fontSize: DesignTypography.fontSize.bodyMedium,
    fontWeight: DesignTypography.fontWeight.regular,
    lineHeight: DesignTypography.fontSize.bodyMedium * DesignTypography.lineHeight.relaxed,
    color: DesignColors.neutral[600],
  },
  bodySmall: {
    fontSize: DesignTypography.fontSize.bodySmall,
    fontWeight: DesignTypography.fontWeight.regular,
    lineHeight: DesignTypography.fontSize.bodySmall * DesignTypography.lineHeight.relaxed,
    color: DesignColors.neutral[600],
  },

  // Labels
  labelLarge: {
    fontSize: DesignTypography.fontSize.labelLarge,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.labelLarge * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[800],
  },
  labelMedium: {
    fontSize: DesignTypography.fontSize.labelMedium,
    fontWeight: DesignTypography.fontWeight.medium,
    lineHeight: DesignTypography.fontSize.labelMedium * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[700],
  },
  labelSmall: {
    fontSize: DesignTypography.fontSize.labelSmall,
    fontWeight: DesignTypography.fontWeight.medium,
    lineHeight: DesignTypography.fontSize.labelSmall * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[600],
  },

  // Data display (for amounts, numbers)
  dataLarge: {
    fontSize: DesignTypography.fontSize.dataLarge,
    fontWeight: DesignTypography.fontWeight.bold,
    lineHeight: DesignTypography.fontSize.dataLarge * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[900],
    letterSpacing: DesignTypography.letterSpacing.tight,
  },
  dataMedium: {
    fontSize: DesignTypography.fontSize.dataMedium,
    fontWeight: DesignTypography.fontWeight.semibold,
    lineHeight: DesignTypography.fontSize.dataMedium * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[800],
  },
  dataSmall: {
    fontSize: DesignTypography.fontSize.dataSmall,
    fontWeight: DesignTypography.fontWeight.medium,
    lineHeight: DesignTypography.fontSize.dataSmall * DesignTypography.lineHeight.tight,
    color: DesignColors.neutral[700],
  },

  // Caption
  caption: {
    fontSize: DesignTypography.fontSize.caption,
    fontWeight: DesignTypography.fontWeight.regular,
    lineHeight: DesignTypography.fontSize.caption * DesignTypography.lineHeight.normal,
    color: DesignColors.neutral[500],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT PRESETS
// ═══════════════════════════════════════════════════════════════════════════

export const DesignPresets = {
  button: {
    primary: {
      backgroundColor: DesignColors.primary[500],
      textColor: DesignColors.neutral[0],
      borderRadius: DesignRadius.button,
      height: DesignTouch.buttonMedium,
      paddingHorizontal: DesignSpacing.buttonPadding.horizontal,
      fontSize: DesignTypography.fontSize.labelLarge,
      fontWeight: DesignTypography.fontWeight.semibold,
    },
    secondary: {
      backgroundColor: DesignColors.neutral[200],
      textColor: DesignColors.neutral[800],
      borderRadius: DesignRadius.button,
      height: DesignTouch.buttonMedium,
      paddingHorizontal: DesignSpacing.buttonPadding.horizontal,
      fontSize: DesignTypography.fontSize.labelLarge,
      fontWeight: DesignTypography.fontWeight.semibold,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: DesignColors.primary[500],
      borderColor: DesignColors.primary[400],
      borderWidth: 2,
      borderRadius: DesignRadius.button,
      height: DesignTouch.buttonMedium,
      paddingHorizontal: DesignSpacing.buttonPadding.horizontal,
      fontSize: DesignTypography.fontSize.labelLarge,
      fontWeight: DesignTypography.fontWeight.semibold,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: DesignColors.primary[500],
      borderRadius: DesignRadius.button,
      height: DesignTouch.buttonMedium,
      paddingHorizontal: DesignSpacing.buttonPadding.horizontal,
      fontSize: DesignTypography.fontSize.labelLarge,
      fontWeight: DesignTypography.fontWeight.medium,
    },
  },
  card: {
    default: {
      backgroundColor: DesignColors.neutral[100],
      borderRadius: DesignRadius.card,
      padding: DesignSpacing.cardPadding,
      ...DesignShadows.card,
    },
    elevated: {
      backgroundColor: DesignColors.neutral[200],
      borderRadius: DesignRadius.card,
      padding: DesignSpacing.cardPadding,
      ...DesignShadows.lg,
    },
    outlined: {
      backgroundColor: DesignColors.neutral[100],
      borderRadius: DesignRadius.card,
      padding: DesignSpacing.cardPadding,
      borderWidth: 1,
      borderColor: DesignColors.neutral[300],
    },
    glass: {
      backgroundColor: 'rgba(30, 35, 44, 0.8)',
      borderRadius: DesignRadius.card,
      padding: DesignSpacing.cardPadding,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    wealth: {
      backgroundColor: DesignColors.semantic.wealth.light,
      borderRadius: DesignRadius.card,
      padding: DesignSpacing.cardPadding,
      borderWidth: 1,
      borderColor: DesignColors.accent.gold,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export const DesignSystem = {
  colors: DesignColors,
  typography: DesignTypography,
  spacing: DesignSpacing,
  radius: DesignRadius,
  shadows: DesignShadows,
  touch: DesignTouch,
  motion: DesignMotion,
  breakpoints: DesignBreakpoints,
  icons: DesignIcons,
  presets: DesignPresets,
  textStyles: DesignTextStyles,
};
