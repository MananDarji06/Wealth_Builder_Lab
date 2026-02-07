/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - INSIGHTS SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Educational insights about long-term wealth building.
 * Comparison between MF/SIP and stock trading mindset.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLHeader,
  WBLCard,
  WBLButton,
  WBLInfoBox,
} from '@/components/design-system';

const wealthMindsetPoints = [
  {
    icon: '⏰',
    title: 'Time is Your Best Friend',
    description: 'In SIP, longer investment periods mean more compounding. 20 years beats 10 years significantly.',
  },
  {
    icon: '🎯',
    title: 'Consistency Over Timing',
    description: 'Regular monthly investments matter more than trying to time the market perfectly.',
  },
  {
    icon: '😌',
    title: 'Stay Calm During Drops',
    description: 'Market drops are normal. SIP automatically buys more units when prices are low.',
  },
  {
    icon: '📊',
    title: 'Look at Years, Not Days',
    description: 'Check your portfolio quarterly or yearly, not daily. Avoid emotional decisions.',
  },
];

const sipVsStocksComparison = [
  {
    aspect: 'Time Commitment',
    sip: 'Set and forget. 10 mins/month.',
    stocks: 'Needs regular monitoring.',
    sipIcon: '✅',
    stockIcon: '⏱️',
  },
  {
    aspect: 'Knowledge Needed',
    sip: 'Basic understanding is enough.',
    stocks: 'Deep research required.',
    sipIcon: '✅',
    stockIcon: '📚',
  },
  {
    aspect: 'Diversification',
    sip: 'Built-in. Spread across many stocks.',
    stocks: 'You must diversify yourself.',
    sipIcon: '✅',
    stockIcon: '🔧',
  },
  {
    aspect: 'Emotional Control',
    sip: 'Automatic. Less emotional decisions.',
    stocks: 'Requires strong discipline.',
    sipIcon: '✅',
    stockIcon: '😰',
  },
  {
    aspect: 'Minimum Amount',
    sip: '₹500/month is enough.',
    stocks: 'Need more capital to diversify.',
    sipIcon: '✅',
    stockIcon: '💰',
  },
];

const commonMistakes = [
  {
    mistake: 'Stopping SIP during market crash',
    why: 'This is the BEST time to continue! You get more units at lower prices.',
    icon: '🛑',
  },
  {
    mistake: 'Checking returns daily',
    why: 'Creates anxiety. SIP is for years, not days. Check quarterly at most.',
    icon: '📱',
  },
  {
    mistake: 'Withdrawing early',
    why: 'Compounding magic happens in later years. Stay invested for full benefit.',
    icon: '💸',
  },
  {
    mistake: 'Chasing past returns',
    why: 'Last year\'s top fund may not be next year\'s. Focus on consistency.',
    icon: '🏃',
  },
];

export default function InsightsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <WBLHeader
        title="Wealth Insights"
        subtitle="Learn to Think Long-term"
        variant="default"
        onLeftAction={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroIcon}>🌳</Text>
          <Text style={styles.heroTitle}>Build Wealth Like Growing a Tree</Text>
          <Text style={styles.heroSubtitle}>
            Plant seeds (SIP), water regularly, and let time do the magic.
          </Text>
        </View>

        {/* Wealth Mindset Section */}
        <WBLCard variant="growth" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🧠 Wealth Building Mindset</Text>

          {wealthMindsetPoints.map((point, index) => (
            <View key={index} style={styles.mindsetItem}>
              <Text style={styles.mindsetIcon}>{point.icon}</Text>
              <View style={styles.mindsetContent}>
                <Text style={styles.mindsetTitle}>{point.title}</Text>
                <Text style={styles.mindsetDesc}>{point.description}</Text>
              </View>
            </View>
          ))}
        </WBLCard>

        {/* SIP vs Stocks Comparison */}
        <WBLCard variant="outlined" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>⚖️ SIP vs Direct Stocks</Text>
          <Text style={styles.sectionSubtitle}>Both are valid, but for beginners, SIP is often better.</Text>

          {sipVsStocksComparison.map((item, index) => (
            <View key={index} style={styles.compareRow}>
              <Text style={styles.compareAspect}>{item.aspect}</Text>
              <View style={styles.compareColumns}>
                <View style={[styles.compareCol, styles.sipCol]}>
                  <Text style={styles.sipIcon}>{item.sipIcon}</Text>
                  <Text style={styles.sipText}>{item.sip}</Text>
                </View>
                <View style={styles.divider} />
                <View style={[styles.compareCol, styles.stockCol]}>
                  <Text style={styles.stockIcon}>{item.stockIcon}</Text>
                  <Text style={styles.stockText}>{item.stocks}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.compareLabels}>
            <View style={styles.labelBadge}>
              <Text style={styles.labelIcon}>💰</Text>
              <Text style={styles.labelText}>SIP/MF</Text>
            </View>
            <View style={[styles.labelBadge, styles.stockLabelBadge]}>
              <Text style={styles.labelIcon}>📈</Text>
              <Text style={styles.labelText}>Direct Stocks</Text>
            </View>
          </View>
        </WBLCard>

        {/* Common Mistakes */}
        <WBLCard variant="outlined" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🚫 Common Mistakes to Avoid</Text>

          {commonMistakes.map((item, index) => (
            <View key={index} style={styles.mistakeItem}>
              <View style={styles.mistakeHeader}>
                <Text style={styles.mistakeIcon}>{item.icon}</Text>
                <Text style={styles.mistakeTitle}>{item.mistake}</Text>
              </View>
              <View style={styles.mistakeWhyBox}>
                <Text style={styles.mistakeWhyLabel}>Why it's a mistake:</Text>
                <Text style={styles.mistakeWhy}>{item.why}</Text>
              </View>
            </View>
          ))}
        </WBLCard>

        {/* Power of Compounding */}
        <WBLCard variant="wealth" style={styles.sectionCard}>
          <View style={styles.compoundHeader}>
            <Text style={styles.compoundIcon}>✨</Text>
            <Text style={styles.compoundTitle}>The Magic of Compounding</Text>
          </View>

          <View style={styles.compoundExample}>
            <Text style={styles.exampleTitle}>₹5,000/month for 20 years at 12% returns</Text>
            <View style={styles.exampleRow}>
              <View style={styles.exampleItem}>
                <Text style={styles.exampleLabel}>You Invest</Text>
                <Text style={styles.exampleValue}>₹12,00,000</Text>
              </View>
              <Text style={styles.exampleArrow}>→</Text>
              <View style={styles.exampleItem}>
                <Text style={styles.exampleLabel}>You Get</Text>
                <Text style={[styles.exampleValue, styles.highlightValue]}>₹49,95,740</Text>
              </View>
            </View>
            <View style={styles.wealthCreated}>
              <Text style={styles.wealthLabel}>Wealth Created:</Text>
              <Text style={styles.wealthValue}>+₹37,95,740</Text>
              <Text style={styles.wealthPercent}>(316% of investment)</Text>
            </View>
          </View>

          <Text style={styles.compoundNote}>
            💡 The longer you stay invested, the more powerful compounding becomes!
          </Text>
        </WBLCard>

        {/* Key Takeaways */}
        <WBLInfoBox
          variant="learn"
          icon="📝"
          title="Key Takeaways"
          message="Start early, stay consistent, stay invested through ups and downs, and think in years, not days. That's the SIP success formula!"
          style={styles.takeawayBox}
        />

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <WBLButton
            title="Try SIP Simulator"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/sip-simulator')}
            style={styles.primaryBtn}
          />
          <WBLButton
            title="Explore Funds"
            variant="outline"
            size="medium"
            fullWidth
            onPress={() => router.push('/fund-selection')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignColors.neutral[50],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: 100,
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.xl,
    marginTop: DesignSpacing.md,
  },
  heroIcon: {
    fontSize: 56,
    marginBottom: DesignSpacing.md,
  },
  heroTitle: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.sm,
  },
  heroSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    textAlign: 'center',
    paddingHorizontal: DesignSpacing.lg,
  },

  // Section Cards
  sectionCard: {
    marginTop: DesignSpacing.lg,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  sectionSubtitle: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    marginBottom: DesignSpacing.lg,
  },

  // Mindset Items
  mindsetItem: {
    flexDirection: 'row',
    marginBottom: DesignSpacing.lg,
  },
  mindsetIcon: {
    fontSize: 28,
    marginRight: DesignSpacing.md,
  },
  mindsetContent: {
    flex: 1,
  },
  mindsetTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
    marginBottom: 2,
  },
  mindsetDesc: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },

  // Comparison
  compareRow: {
    marginBottom: DesignSpacing.lg,
  },
  compareAspect: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    marginBottom: DesignSpacing.sm,
  },
  compareColumns: {
    flexDirection: 'row',
  },
  compareCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: DesignSpacing.sm,
    borderRadius: DesignRadius.sm,
  },
  sipCol: {
    backgroundColor: DesignColors.primary[50],
    marginRight: DesignSpacing.xs,
  },
  stockCol: {
    backgroundColor: DesignColors.secondary[50],
    marginLeft: DesignSpacing.xs,
  },
  divider: {
    width: 1,
    backgroundColor: DesignColors.neutral[300],
  },
  sipIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  sipText: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[600],
    flex: 1,
  },
  stockIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  stockText: {
    ...DesignTextStyles.caption,
    color: DesignColors.secondary[600],
    flex: 1,
  },
  compareLabels: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: DesignSpacing.lg,
    marginTop: DesignSpacing.md,
    paddingTop: DesignSpacing.md,
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[300],
  },
  labelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[100],
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.round,
  },
  stockLabelBadge: {
    backgroundColor: DesignColors.secondary[100],
  },
  labelIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  labelText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[700],
    fontWeight: '600',
  },

  // Mistakes
  mistakeItem: {
    marginBottom: DesignSpacing.lg,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
  },
  mistakeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  mistakeIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.sm,
  },
  mistakeTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    flex: 1,
  },
  mistakeWhyBox: {
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.sm,
    padding: DesignSpacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: DesignColors.primary[400],
  },
  mistakeWhyLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[500],
    fontWeight: '600',
    marginBottom: 2,
  },
  mistakeWhy: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    lineHeight: 18,
  },

  // Compounding
  compoundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.lg,
  },
  compoundIcon: {
    fontSize: 28,
    marginRight: DesignSpacing.sm,
  },
  compoundTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.accent.gold,
  },
  compoundExample: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.md,
  },
  exampleTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    textAlign: 'center',
    marginBottom: DesignSpacing.md,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DesignSpacing.md,
  },
  exampleItem: {
    alignItems: 'center',
  },
  exampleLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 2,
  },
  exampleValue: {
    ...DesignTextStyles.dataMedium,
    color: DesignColors.neutral[800],
  },
  highlightValue: {
    color: DesignColors.accent.gold,
  },
  exampleArrow: {
    fontSize: 24,
    color: DesignColors.neutral[400],
    marginHorizontal: DesignSpacing.lg,
  },
  wealthCreated: {
    alignItems: 'center',
    paddingTop: DesignSpacing.md,
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[300],
  },
  wealthLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  wealthValue: {
    ...DesignTextStyles.dataLarge,
    color: DesignColors.primary[500],
    marginVertical: 4,
  },
  wealthPercent: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[600],
  },
  compoundNote: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Takeaway
  takeawayBox: {
    marginTop: DesignSpacing.lg,
  },

  // Bottom Actions
  bottomActions: {
    marginTop: DesignSpacing.xl,
    gap: DesignSpacing.md,
  },
  primaryBtn: {
    marginBottom: DesignSpacing.sm,
  },
});
