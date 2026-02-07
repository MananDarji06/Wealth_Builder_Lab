/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - DESIGN SYSTEM COMPONENTS INDEX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Central export file for all design system components.
 * Import components from this file for consistent usage.
 * 
 * Usage:
 * import { WBLButton, WBLCard, DesignColors } from '@/components/design-system';
 */

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export {
  DesignColors,
  DesignTypography,
  DesignSpacing,
  DesignRadius,
  DesignShadows,
  DesignTouch,
  DesignMotion,
  DesignBreakpoints,
  DesignIcons,
  DesignPresets,
  DesignTextStyles,
  DesignSystem,
} from '../../constants/design-system';

// ═══════════════════════════════════════════════════════════════════════════
// CORE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Button - Primary interaction element
export { WBLButton } from './WBLButton';
export type { WBLButtonProps, WBLButtonVariant, WBLButtonSize } from './WBLButton';

// Card - Content container
export { WBLCard } from './WBLCard';
export type { WBLCardProps, WBLCardVariant } from './WBLCard';

// Header - Screen header
export { WBLHeader } from './WBLHeader';
export type { WBLHeaderProps, WBLHeaderVariant } from './WBLHeader';

// ═══════════════════════════════════════════════════════════════════════════
// FEEDBACK & INFORMATION
// ═══════════════════════════════════════════════════════════════════════════

// Info Box - Educational tips and information
export { WBLInfoBox } from './WBLInfoBox';
export type { WBLInfoBoxProps, WBLInfoBoxVariant } from './WBLInfoBox';

// ═══════════════════════════════════════════════════════════════════════════
// MUTUAL FUND SPECIFIC COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Fund Card - Mutual fund display in lists
export { WBLFundCard } from './WBLFundCard';
export type { WBLFundCardProps, FundCategory, RiskLevel } from './WBLFundCard';

// Growth Chart - Long-term wealth visualization
export { WBLGrowthChart } from './WBLGrowthChart';
export type { WBLGrowthChartProps, GrowthDataPoint } from './WBLGrowthChart';

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// Learning Card - Educational content cards
export { WBLLearningCard } from './WBLLearningCard';
export type { WBLLearningCardProps, WBLLearningCardType } from './WBLLearningCard';

// ═══════════════════════════════════════════════════════════════════════════
// ILLUSTRATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Wealth Illustration - Module entry visual
export { WealthIllustration } from './WealthIllustration';

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATION VISUALS
// ═══════════════════════════════════════════════════════════════════════════

// Visual education components for Learning Mode
export {
  MutualFundPoolVisual,
  DiversificationVisual,
  SIPVisual,
  RupeeCostAveragingVisual,
  MFvsStocksVisual,
  SIPDisciplineVisual,
} from './EducationVisuals';

// Educational Growth Chart for investment graph learning
export {
  EducationalGrowthChart,
  learningOverlays,
  chartData,
} from './EducationalGrowthChart';
export type {
  LearningOverlay,
  DataPoint,
  OverlayInfo,
} from './EducationalGrowthChart';
