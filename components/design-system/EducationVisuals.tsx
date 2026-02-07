/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - VISUAL EDUCATION COMPONENTS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Visual components for educational explanations with minimal text.
 * Each component teaches a concept through visuals and simple animations.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import Svg, { Circle, Path, Line, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { DesignColors, DesignSpacing, DesignTextStyles, DesignRadius } from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// MUTUAL FUND POOL VISUALIZATION
// Shows how money from many investors pools together
// ═══════════════════════════════════════════════════════════════════════════

interface MutualFundPoolVisualProps {
  animated?: boolean;
  step?: 'investors' | 'pooling' | 'fund' | 'growth';
}

export const MutualFundPoolVisual: React.FC<MutualFundPoolVisualProps> = ({
  animated = true,
  step = 'investors',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const fadeAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const flowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      // Animate investors appearing
      const sequence = fadeAnims.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          delay: index * 200,
          useNativeDriver: true,
        })
      );

      Animated.stagger(200, sequence).start();

      // Flow animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(flowAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(flowAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      fadeAnims.forEach(anim => anim.setValue(1));
    }
  }, [animated]);

  const investors = [
    { emoji: '👨‍💼', amount: '₹1,000', color: DesignColors.accent.blue },
    { emoji: '👩‍🏫', amount: '₹2,000', color: DesignColors.accent.purple },
    { emoji: '👴', amount: '₹500', color: DesignColors.accent.teal },
    { emoji: '👩‍💻', amount: '₹3,000', color: DesignColors.primary[500] },
  ];

  return (
    <View style={styles.visualContainer}>
      {/* Investors Row */}
      <View style={styles.investorsRow}>
        {investors.map((inv, index) => (
          <Animated.View
            key={index}
            style={[
              styles.investorItem,
              { opacity: fadeAnims[index] },
            ]}
          >
            <View style={[styles.investorCircle, { borderColor: inv.color }]}>
              <Text style={styles.investorEmoji}>{inv.emoji}</Text>
            </View>
            <Text style={styles.investorAmount}>{inv.amount}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Flow Arrows */}
      <View style={styles.flowSection}>
        <View style={styles.flowArrows}>
          {[0, 1, 2, 3].map(i => (
            <Animated.View
              key={i}
              style={[
                styles.flowArrow,
                {
                  opacity: flowAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                },
              ]}
            >
              <Text style={styles.arrowText}>↓</Text>
            </Animated.View>
          ))}
        </View>
        <Text style={styles.flowLabel}>Money pools together</Text>
      </View>

      {/* Mutual Fund Pool */}
      <View style={styles.fundPool}>
        <View style={styles.fundPoolCircle}>
          <Text style={styles.fundPoolIcon}>🏦</Text>
          <Text style={styles.fundPoolLabel}>Mutual Fund</Text>
          <Text style={styles.fundPoolAmount}>₹6,500</Text>
        </View>
      </View>

      {/* Fund Manager */}
      <View style={styles.managerSection}>
        <View style={styles.managerBadge}>
          <Text style={styles.managerEmoji}>👨‍💼</Text>
          <View style={styles.managerInfo}>
            <Text style={styles.managerTitle}>Fund Manager</Text>
            <Text style={styles.managerDesc}>Professional investor</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DIVERSIFICATION VISUAL
// Shows how one fund invests in many stocks
// ═══════════════════════════════════════════════════════════════════════════

export const DiversificationVisual: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnims = useRef([...Array(6)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animated) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.stagger(100, fadeAnims.map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        )),
      ]).start();
    } else {
      scaleAnim.setValue(1);
      fadeAnims.forEach(a => a.setValue(1));
    }
  }, [animated]);

  const stocks = [
    { name: 'Tech', icon: '💻', color: DesignColors.accent.blue },
    { name: 'Bank', icon: '🏦', color: DesignColors.primary[500] },
    { name: 'Pharma', icon: '💊', color: DesignColors.accent.teal },
    { name: 'Auto', icon: '🚗', color: DesignColors.accent.purple },
    { name: 'Energy', icon: '⚡', color: DesignColors.semantic.warning.main },
    { name: 'FMCG', icon: '🛒', color: DesignColors.secondary[500] },
  ];

  return (
    <View style={styles.diversificationContainer}>
      {/* Your Fund */}
      <Animated.View style={[styles.yourFund, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.yourFundIcon}>💰</Text>
        <Text style={styles.yourFundLabel}>Your ₹5,000</Text>
      </Animated.View>

      {/* Arrow */}
      <View style={styles.spreadArrow}>
        <Text style={styles.spreadArrowText}>↓</Text>
        <Text style={styles.spreadLabel}>Spreads across</Text>
      </View>

      {/* Multiple Stocks */}
      <View style={styles.stocksGrid}>
        {stocks.map((stock, index) => (
          <Animated.View
            key={index}
            style={[
              styles.stockItem,
              { opacity: fadeAnims[index], backgroundColor: `${stock.color}20` },
            ]}
          >
            <Text style={styles.stockIcon}>{stock.icon}</Text>
            <Text style={[styles.stockName, { color: stock.color }]}>{stock.name}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Benefit */}
      <View style={styles.benefitBox}>
        <Text style={styles.benefitIcon}>🛡️</Text>
        <Text style={styles.benefitText}>
          If one falls, others may rise. {'\n'}
          <Text style={styles.benefitHighlight}>Less risk!</Text>
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIP VISUAL - Shows regular monthly investment
// ═══════════════════════════════════════════════════════════════════════════

export const SIPVisual: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  const [activeMonth, setActiveMonth] = useState(0);
  const totalAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setActiveMonth(prev => (prev < 5 ? prev + 1 : prev));
      }, 800);

      Animated.timing(totalAnim, {
        toValue: 1,
        duration: 4800,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      return () => clearInterval(interval);
    }
  }, [animated]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const amounts = [1000, 2000, 3000, 4000, 5000, 6000];

  return (
    <View style={styles.sipContainer}>
      {/* Calendar Row */}
      <View style={styles.calendarRow}>
        {months.map((month, index) => (
          <View
            key={index}
            style={[
              styles.monthCard,
              index <= activeMonth && styles.monthCardActive,
            ]}
          >
            <Text style={styles.monthEmoji}>{index <= activeMonth ? '✅' : '📅'}</Text>
            <Text style={[styles.monthName, index <= activeMonth && styles.monthNameActive]}>
              {month}
            </Text>
            <Text style={styles.monthAmount}>₹1,000</Text>
          </View>
        ))}
      </View>

      {/* Growth Bar */}
      <View style={styles.growthBarContainer}>
        <View style={styles.growthBarTrack}>
          <Animated.View
            style={[
              styles.growthBarFill,
              {
                width: totalAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.growthLabels}>
          <Text style={styles.growthLabel}>₹0</Text>
          <Text style={styles.growthLabel}>₹6,000</Text>
        </View>
      </View>

      {/* Key Message */}
      <View style={styles.sipMessage}>
        <Text style={styles.sipMessageIcon}>💡</Text>
        <Text style={styles.sipMessageText}>
          Same amount. Every month. {'\n'}
          <Text style={styles.sipHighlight}>No need to think or time the market!</Text>
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// RUPEE COST AVERAGING VISUAL
// Shows how SIP buys more units when price is low
// ═══════════════════════════════════════════════════════════════════════════

export const RupeeCostAveragingVisual: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(slideAnim, { toValue: 1, duration: 3000, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [animated]);

  const monthData = [
    { month: 'Jan', price: 100, units: 10, priceLevel: 'high' },
    { month: 'Feb', price: 50, units: 20, priceLevel: 'low' },
    { month: 'Mar', price: 80, units: 12.5, priceLevel: 'mid' },
  ];

  return (
    <View style={styles.rcaContainer}>
      <Text style={styles.rcaTitle}>SIP Magic: Buy More When Price is Low</Text>

      <View style={styles.rcaTable}>
        <View style={styles.rcaHeader}>
          <Text style={styles.rcaHeaderText}>Month</Text>
          <Text style={styles.rcaHeaderText}>Price</Text>
          <Text style={styles.rcaHeaderText}>₹1000 buys</Text>
        </View>

        {monthData.map((data, index) => (
          <View key={index} style={styles.rcaRow}>
            <Text style={styles.rcaCell}>{data.month}</Text>
            <View style={styles.rcaPriceCell}>
              <Text style={[
                styles.rcaPrice,
                data.priceLevel === 'low' && styles.rcaPriceLow,
                data.priceLevel === 'high' && styles.rcaPriceHigh,
              ]}>
                ₹{data.price}
              </Text>
              <Text style={styles.rcaPriceArrow}>
                {data.priceLevel === 'low' ? '📉' : data.priceLevel === 'high' ? '📈' : '➡️'}
              </Text>
            </View>
            <View style={styles.rcaUnitsCell}>
              <Text style={[
                styles.rcaUnits,
                data.priceLevel === 'low' && styles.rcaUnitsHigh,
              ]}>
                {data.units} units
              </Text>
              {data.priceLevel === 'low' && (
                <Text style={styles.rcaBonus}>More! 🎉</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.rcaInsight}>
        <Text style={styles.rcaInsightIcon}>✨</Text>
        <Text style={styles.rcaInsightText}>
          When market falls, your SIP automatically buys MORE units!
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MF vs STOCKS COMPARISON VISUAL
// ═══════════════════════════════════════════════════════════════════════════

export const MFvsStocksVisual: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (animated) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [animated]);

  const comparisons = [
    {
      aspect: 'Who Manages?',
      mf: { text: 'Expert Manager', icon: '👨‍💼' },
      stock: { text: 'You Yourself', icon: '🙋' },
    },
    {
      aspect: 'Time Needed',
      mf: { text: '10 mins/month', icon: '☕' },
      stock: { text: 'Hours daily', icon: '⏰' },
    },
    {
      aspect: 'Knowledge',
      mf: { text: 'Basic is enough', icon: '📖' },
      stock: { text: 'Deep research', icon: '📊' },
    },
    {
      aspect: 'Best For',
      mf: { text: 'Long-term Goals', icon: '🎯' },
      stock: { text: 'Active Trading', icon: '📈' },
    },
    {
      aspect: 'Risk',
      mf: { text: 'Diversified', icon: '🛡️' },
      stock: { text: 'Concentrated', icon: '⚠️' },
    },
  ];

  return (
    <View style={styles.comparisonContainer}>
      {/* Header */}
      <View style={styles.compHeader}>
        <View style={[styles.compHeaderItem, styles.mfHeader]}>
          <Text style={styles.compHeaderIcon}>🏦</Text>
          <Text style={styles.compHeaderTitle}>Mutual Funds</Text>
        </View>
        <Text style={styles.vsText}>vs</Text>
        <View style={[styles.compHeaderItem, styles.stockHeader]}>
          <Text style={styles.compHeaderIcon}>📈</Text>
          <Text style={styles.compHeaderTitle}>Stocks</Text>
        </View>
      </View>

      {/* Comparison Rows */}
      {comparisons.map((comp, index) => (
        <Animated.View
          key={index}
          style={[
            styles.compRow,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={[styles.compItem, styles.mfItem]}>
            <Text style={styles.compItemIcon}>{comp.mf.icon}</Text>
            <Text style={styles.compItemText}>{comp.mf.text}</Text>
          </View>
          <View style={styles.compAspect}>
            <Text style={styles.compAspectText}>{comp.aspect}</Text>
          </View>
          <View style={[styles.compItem, styles.compStockItem]}>
            <Text style={styles.compItemIcon}>{comp.stock.icon}</Text>
            <Text style={styles.compItemText}>{comp.stock.text}</Text>
          </View>
        </Animated.View>
      ))}

      {/* Verdict */}
      <View style={styles.verdict}>
        <Text style={styles.verdictIcon}>💡</Text>
        <Text style={styles.verdictText}>
          For beginners building long-term wealth,{'\n'}
          <Text style={styles.verdictHighlight}>Mutual Funds + SIP is the calmer path!</Text>
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SIP DISCIPLINE VISUAL
// Shows the power of habit-based investing and discipline
// ═══════════════════════════════════════════════════════════════════════════

export const SIPDisciplineVisual: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  const [streakCount, setStreakCount] = useState(0);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnims = useRef([...Array(4)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (animated) {
      // Animate streak counter
      const interval = setInterval(() => {
        setStreakCount(prev => (prev < 12 ? prev + 1 : prev));
      }, 300);

      // Animate benefits appearing
      Animated.stagger(200, fadeAnims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )).start();

      // Pulse animation for streak
      Animated.loop(
        Animated.sequence([
          Animated.spring(scaleAnim, {
            toValue: 1.05,
            tension: 40,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 40,
            friction: 3,
            useNativeDriver: true,
          }),
        ])
      ).start();

      return () => clearInterval(interval);
    }
  }, [animated]);

  const habits = [
    { icon: '🔄', title: 'Automatic', desc: 'Set once, runs monthly' },
    { icon: '🧘', title: 'No Stress', desc: 'No daily decisions' },
    { icon: '🎯', title: 'Goal-Driven', desc: 'Focus on long-term' },
    { icon: '💪', title: 'Builds Wealth', desc: 'Consistency wins' },
  ];

  return (
    <View style={styles.disciplineContainer}>
      {/* Streak Counter */}
      <Animated.View style={[styles.streakCard, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <View style={styles.streakInfo}>
          <Text style={styles.streakLabel}>SIP Streak</Text>
          <Text style={styles.streakCount}>{streakCount} months</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakBadgeText}>Building habit!</Text>
        </View>
      </Animated.View>

      {/* Calendar Visual */}
      <View style={styles.calendarVisual}>
        {[...Array(12)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.calendarDay,
              i < streakCount && styles.calendarDayActive,
            ]}
          >
            <Text style={styles.calendarCheck}>
              {i < streakCount ? '✅' : '📅'}
            </Text>
          </View>
        ))}
      </View>

      {/* Habit Benefits */}
      <View style={styles.habitsGrid}>
        {habits.map((habit, index) => (
          <Animated.View
            key={index}
            style={[
              styles.habitCard,
              { opacity: fadeAnims[index] },
            ]}
          >
            <Text style={styles.habitIcon}>{habit.icon}</Text>
            <Text style={styles.habitTitle}>{habit.title}</Text>
            <Text style={styles.habitDesc}>{habit.desc}</Text>
          </Animated.View>
        ))}
      </View>

      {/* Key Message */}
      <View style={styles.disciplineMessage}>
        <Text style={styles.disciplineMessageIcon}>🌱</Text>
        <Text style={styles.disciplineMessageText}>
          SIP builds a <Text style={styles.disciplineHighlight}>money habit</Text>.{'\n'}
          Like brushing teeth - small action, big results over time!
        </Text>
      </View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  // Mutual Fund Pool Visual
  visualContainer: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.lg,
  },
  investorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: DesignSpacing.lg,
  },
  investorItem: {
    alignItems: 'center',
  },
  investorCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: DesignColors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: DesignSpacing.xs,
  },
  investorEmoji: {
    fontSize: 28,
  },
  investorAmount: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
    fontWeight: '600',
  },
  flowSection: {
    alignItems: 'center',
    marginBottom: DesignSpacing.lg,
  },
  flowArrows: {
    flexDirection: 'row',
    gap: DesignSpacing.xxl,
  },
  flowArrow: {},
  arrowText: {
    fontSize: 24,
    color: DesignColors.primary[500],
  },
  flowLabel: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[500],
    marginTop: DesignSpacing.xs,
  },
  fundPool: {
    marginBottom: DesignSpacing.lg,
  },
  fundPoolCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: DesignColors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: DesignColors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fundPoolIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  fundPoolLabel: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[900],
  },
  fundPoolAmount: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
    fontWeight: '700',
  },
  managerSection: {
    marginTop: DesignSpacing.md,
  },
  managerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: DesignColors.accent.gold,
  },
  managerEmoji: {
    fontSize: 28,
    marginRight: DesignSpacing.md,
  },
  managerInfo: {},
  managerTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.accent.gold,
    fontWeight: '700',
  },
  managerDesc: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },

  // Diversification Visual
  diversificationContainer: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.lg,
  },
  yourFund: {
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  yourFundIcon: {
    fontSize: 40,
    marginBottom: DesignSpacing.xs,
  },
  yourFundLabel: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
  },
  spreadArrow: {
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  spreadArrowText: {
    fontSize: 24,
    color: DesignColors.primary[500],
  },
  spreadLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  stocksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: DesignSpacing.sm,
    marginBottom: DesignSpacing.lg,
  },
  stockItem: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.sm,
    paddingHorizontal: DesignSpacing.md,
    borderRadius: DesignRadius.md,
    minWidth: 80,
  },
  stockIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  stockName: {
    ...DesignTextStyles.caption,
    fontWeight: '600',
  },
  benefitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  benefitText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    textAlign: 'center',
  },
  benefitHighlight: {
    color: DesignColors.primary[500],
    fontWeight: '700',
  },

  // SIP Visual
  sipContainer: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.lg,
  },
  calendarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: DesignSpacing.sm,
    marginBottom: DesignSpacing.xl,
  },
  monthCard: {
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingVertical: DesignSpacing.sm,
    paddingHorizontal: DesignSpacing.md,
    borderRadius: DesignRadius.md,
    minWidth: 50,
    opacity: 0.5,
  },
  monthCardActive: {
    backgroundColor: DesignColors.primary[100],
    opacity: 1,
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  monthEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  monthName: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    fontWeight: '600',
  },
  monthNameActive: {
    color: DesignColors.primary[600],
  },
  monthAmount: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[400],
    fontSize: 10,
  },
  growthBarContainer: {
    width: '100%',
    marginBottom: DesignSpacing.lg,
  },
  growthBarTrack: {
    height: 12,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 6,
    overflow: 'hidden',
  },
  growthBarFill: {
    height: '100%',
    backgroundColor: DesignColors.primary[500],
    borderRadius: 6,
  },
  growthLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DesignSpacing.xs,
  },
  growthLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  sipMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.semantic.learning.light,
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
    borderWidth: 1,
    borderColor: DesignColors.accent.purple,
  },
  sipMessageIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.md,
  },
  sipMessageText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    flex: 1,
    lineHeight: 20,
  },
  sipHighlight: {
    color: DesignColors.accent.purple,
    fontWeight: '700',
  },

  // Rupee Cost Averaging
  rcaContainer: {
    paddingVertical: DesignSpacing.lg,
  },
  rcaTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.lg,
  },
  rcaTable: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    overflow: 'hidden',
    marginBottom: DesignSpacing.lg,
  },
  rcaHeader: {
    flexDirection: 'row',
    backgroundColor: DesignColors.neutral[200],
    paddingVertical: DesignSpacing.sm,
  },
  rcaHeaderText: {
    flex: 1,
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[600],
    textAlign: 'center',
  },
  rcaRow: {
    flexDirection: 'row',
    paddingVertical: DesignSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DesignColors.neutral[200],
  },
  rcaCell: {
    flex: 1,
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    textAlign: 'center',
  },
  rcaPriceCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rcaPrice: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    marginRight: 4,
  },
  rcaPriceLow: {
    color: DesignColors.primary[500],
  },
  rcaPriceHigh: {
    color: DesignColors.semantic.warning.main,
  },
  rcaPriceArrow: {
    fontSize: 14,
  },
  rcaUnitsCell: {
    flex: 1,
    alignItems: 'center',
  },
  rcaUnits: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
  },
  rcaUnitsHigh: {
    color: DesignColors.primary[500],
    fontWeight: '700',
  },
  rcaBonus: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[500],
  },
  rcaInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
  },
  rcaInsightIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.md,
  },
  rcaInsightText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.primary[600],
    flex: 1,
    fontWeight: '500',
  },

  // Comparison Visual
  comparisonContainer: {
    paddingVertical: DesignSpacing.lg,
  },
  compHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DesignSpacing.lg,
  },
  compHeaderItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
  },
  mfHeader: {
    backgroundColor: DesignColors.primary[100],
    marginRight: DesignSpacing.sm,
  },
  stockHeader: {
    backgroundColor: DesignColors.secondary[100],
    marginLeft: DesignSpacing.sm,
  },
  compHeaderIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  compHeaderTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '700',
  },
  vsText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[500],
  },
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  compItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DesignSpacing.sm,
    paddingHorizontal: DesignSpacing.sm,
    borderRadius: DesignRadius.sm,
  },
  mfItem: {
    backgroundColor: DesignColors.primary[50],
    justifyContent: 'flex-start',
  },
  compStockItem: {
    backgroundColor: DesignColors.secondary[50],
    justifyContent: 'flex-end',
  },
  compItemIcon: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  compItemText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[700],
    flex: 1,
  },
  compAspect: {
    paddingHorizontal: DesignSpacing.sm,
  },
  compAspectText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    textAlign: 'center',
    fontSize: 10,
  },
  verdict: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.semantic.wealth.light,
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
    marginTop: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.accent.gold,
  },
  verdictIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.md,
  },
  verdictText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    flex: 1,
    lineHeight: 20,
  },
  verdictHighlight: {
    color: DesignColors.accent.gold,
    fontWeight: '700',
  },

  // SIP Discipline Visual
  disciplineContainer: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.md,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.accent.gold + '20',
    borderRadius: DesignRadius.xl,
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    marginBottom: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.accent.gold,
  },
  streakEmoji: {
    fontSize: 32,
    marginRight: DesignSpacing.md,
  },
  streakInfo: {
    flex: 1,
  },
  streakLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
  },
  streakCount: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.accent.gold,
    fontWeight: '700',
  },
  streakBadge: {
    backgroundColor: DesignColors.accent.gold,
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.round,
  },
  streakBadgeText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[900],
    fontWeight: '600',
  },
  calendarVisual: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: DesignSpacing.xs,
    marginBottom: DesignSpacing.lg,
  },
  calendarDay: {
    width: 44,
    height: 44,
    borderRadius: DesignRadius.sm,
    backgroundColor: DesignColors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  calendarDayActive: {
    backgroundColor: DesignColors.primary[100],
    opacity: 1,
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  calendarCheck: {
    fontSize: 18,
  },
  habitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: DesignSpacing.sm,
    marginBottom: DesignSpacing.lg,
    width: '100%',
  },
  habitCard: {
    width: '48%',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    alignItems: 'center',
  },
  habitIcon: {
    fontSize: 24,
    marginBottom: DesignSpacing.xs,
  },
  habitTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    marginBottom: 2,
  },
  habitDesc: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    textAlign: 'center',
  },
  disciplineMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.primary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.md,
    borderRadius: DesignRadius.lg,
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
    width: '100%',
  },
  disciplineMessageIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.md,
  },
  disciplineMessageText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    flex: 1,
    lineHeight: 20,
  },
  disciplineHighlight: {
    color: DesignColors.primary[500],
    fontWeight: '700',
  },
});
