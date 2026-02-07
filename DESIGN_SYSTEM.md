# Wealth Builder Lab - Design System

## Overview

The **Wealth Builder Lab** is an educational module within the FinLearn app focused on teaching users about **mutual funds and SIP (Systematic Investment Plan)** investing. Unlike the Stock Market Lab which simulates stock trading, this module emphasizes **long-term wealth building** through patient, consistent investing.

---

## Design Philosophy

### 🎯 Core Principles

1. **Calm & Reassuring**: Avoid flashy, trading-style visuals. Use soothing colors and gentle animations.
2. **Long-term Focus**: Emphasize years, not days. Show steady growth, not volatile swings.
3. **Educational First**: Every interaction teaches something. Focus on building confidence, not FOMO.
4. **Beginner-Friendly**: Target first-time investors (age 15+) who may confuse stocks with mutual funds.

### 🌙 Dark Mode Only

The module uses exclusively dark mode for a focused, professional learning environment.

---

## Color Palette

### Primary Colors - Deep Emerald (Growth & Stability)
- **Primary 500**: `#10B981` - Main actions, positive growth
- **Primary 600**: `#059669` - Hover/pressed states
- **Primary 50**: `#ECFDF5` - Subtle backgrounds

### Secondary Colors - Calm Blue (Trust & Security)
- **Secondary 500**: `#3B82F6` - Secondary actions
- **Secondary 400**: `#60A5FA` - Highlights
- **Secondary 50**: `#EFF6FF` - Light backgrounds

### Accent Colors
- **Gold** `#F59E0B`: Wealth, achievements, milestones
- **Purple** `#8B5CF6`: Learning, education content
- **Teal** `#14B8A6`: Charts, simulations

### Semantic Colors
- **Wealth**: Gold tones for wealth-related content
- **Learning**: Purple tones for educational content
- **Positive**: Emerald for gains (calm, not aggressive red/green)
- **Warning**: Amber (not aggressive)
- **Negative**: Coral (softer than trading red)

---

## Components

### Core Components
- **WBLButton**: Calm, wealth-focused buttons with variants: `primary`, `secondary`, `outline`, `ghost`, `wealth`, `invest`
- **WBLCard**: Content containers with variants: `default`, `elevated`, `outlined`, `glass`, `wealth`, `learning`, `growth`
- **WBLHeader**: Screen navigation headers
- **WBLInfoBox**: Educational tips and info with variants: `info`, `tip`, `warning`, `learn`, `wealth`, `compare`, `sip`

### Specialized Components
- **WBLFundCard**: Mutual fund display with category, risk level, returns, and NAV
- **WBLGrowthChart**: Long-term wealth growth visualization
- **WBLLearningCard**: Educational content cards with types: `lesson`, `concept`, `comparison`, `simulation`, `quiz`, `milestone`
- **WealthIllustration**: Animated entry screen illustration

---

## Animation Guidelines

### Motion Philosophy
- **Slower is Better**: Use `duration.slow` (400-500ms) for most animations
- **Gentle Springs**: Soft, non-bouncy spring effects
- **Calm Easing**: Ease-out for smooth, natural deceleration

### Specific Timings
- Chart animations: 2000ms (slow, steady reveal)
- Button feedback: 150ms
- Card transitions: 300ms
- Modal appearances: 400ms

---

## Typography

### Scale
- **Data Large**: 32px - Portfolio values, main numbers
- **Data Medium**: 24px - Returns, statistics
- **Title Large**: 22px - Screen titles
- **Title Medium**: 18px - Section headers
- **Body Medium**: 15px - Main content
- **Caption**: 12px - Labels, hints

### Font Weights
- Bold (700): Headers, important values
- SemiBold (600): Labels, buttons
- Regular (400): Body text

---

## Screen Architecture

### Entry Flow
1. **Module Entry** (`/module-entry`): Welcome screen with illustration and CTA
2. **Learn Mode** (`/learn-mode`): Full learning journey with modules
3. **SIP Simulator** (`/sip-simulator`): Practice wealth building
4. **Fund Selection** (`/fund-selection`): Explore fund types
5. **Insights** (`/insights`): Wealth mindset and comparisons

### Tab Navigation
- **Home Tab**: Quick actions, stats, featured content
- **Learn Tab**: Learning progress, topics, featured lessons

---

## Key Differentiators from Stock Market Lab

| Aspect | Stock Market Lab | Wealth Builder Lab |
|--------|------------------|-------------------|
| Focus | Daily trading simulation | Long-term wealth building |
| Colors | Red/Green (trading) | Emerald/Gold (wealth) |
| Charts | Volatile price movements | Steady growth curves |
| Timeframe | Days, weeks | Years, decades |
| Animation | Fast, reactive | Slow, calm |
| Feedback | "Buy low, sell high" | "Stay invested, be patient" |
| Terminology | Trades, positions | SIP, NAV, compounding |

---

## Educational Content Themes

1. **What is SIP**: Systematic Investment Plan basics
2. **MF vs Stocks**: Clear differentiation
3. **Compounding Magic**: Power of long-term investing
4. **Rupee Cost Averaging**: How SIP reduces risk
5. **Patience Pays**: Why time is your friend
6. **Common Mistakes**: What to avoid

---

## Accessibility

- High contrast text on dark backgrounds
- Touch targets minimum 44x44px
- Clear visual hierarchy
- Simple, scannable content
- Educational content in digestible chunks

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2026 | Initial design system and components |

---

## Usage Examples

### Import Components
```typescript
import {
  WBLButton,
  WBLCard,
  WBLInfoBox,
  WBLFundCard,
  DesignColors,
  DesignSpacing,
} from '@/components/design-system';
```

### Button Usage
```tsx
<WBLButton
  title="Start SIP"
  variant="wealth"
  size="large"
  fullWidth
  onPress={handleStartSIP}
/>
```

### Card Usage
```tsx
<WBLCard variant="growth" title="Your Portfolio">
  {/* Content */}
</WBLCard>
```

### Info Box Usage
```tsx
<WBLInfoBox
  variant="sip"
  icon="💰"
  title="SIP Tip"
  message="Consistency beats timing!"
/>
```
