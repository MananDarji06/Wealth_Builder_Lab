/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - INVESTMENT GROWTH GRAPH SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * An educational screen that teaches users how to read long-term investment
 * graphs. This is NOT a performance dashboard - it's a learning tool.
 * 
 * Key Educational Goals:
 * 1. Teach steady upward growth over time
 * 2. Explain that short-term dips are normal
 * 3. Show the power of compounding
 * 4. Build confidence for long-term investing
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
  WBLCard,
  WBLInfoBox,
  WBLHeader,
} from '@/components/design-system';
import {
  EducationalGrowthChart,
  learningOverlays,
  chartData,
  LearningOverlay,
  DataPoint,
} from '@/components/design-system/EducationalGrowthChart';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATIONAL INSIGHTS DATA
// ═══════════════════════════════════════════════════════════════════════════

interface InsightCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

const educationalInsights: InsightCard[] = [
  {
    id: 'dips-normal',
    icon: '📉',
    title: 'Dips Are Normal',
    description: 'Markets fall sometimes - it happened in Year 3 and Year 12 in our example. But notice: the market ALWAYS recovered and grew higher!',
    color: DesignColors.semantic.warning.main,
  },
  {
    id: 'long-term-growth',
    icon: '📈',
    title: 'Long-Term Smooths Volatility',
    description: 'Zoom out! A 1-year chart looks scary. A 20-year chart shows a clear upward trend. Time smooths out the bumps.',
    color: DesignColors.primary[500],
  },
  {
    id: 'patience-matters',
    icon: '⏰',
    title: 'Patience = Wealth',
    description: 'In Year 5, gains were modest. By Year 20, the portfolio is 3x the invested amount! Patience turns small contributions into big wealth.',
    color: DesignColors.accent.gold,
  },
];

const graphReadingTips = [
  { icon: '🔍', tip: 'The GREEN line shows how your money grows' },
  { icon: '➖', tip: 'The DASHED line shows what you actually invested' },
  { icon: '📊', tip: 'The GAP between lines = your returns!' },
  { icon: '⬆️', tip: 'Overall trend should be UP over many years' },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SCREEN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function InvestmentGrowthGraphScreen() {
  const router = useRouter();
  const [activeOverlay, setActiveOverlay] = useState<LearningOverlay>('none');
  const [selectedDataPoint, setSelectedDataPoint] = useState<DataPoint | null>(null);
  const [showTips, setShowTips] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  // Calculate summary stats from chart data
  const finalData = chartData[chartData.length - 1];
  const totalInvested = finalData.invested;
  const totalValue = finalData.value;
  const totalReturns = totalValue - totalInvested;
  const returnsPercent = Math.round((totalReturns / totalInvested) * 100);

  const handleOverlayChange = (overlay: LearningOverlay) => {
    setActiveOverlay(activeOverlay === overlay ? 'none' : overlay);
  };

  const handleDataPointPress = (point: DataPoint) => {
    setSelectedDataPoint(point);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WBLHeader
        title="Reading Growth Charts"
        subtitle="Learn to interpret long-term graphs"
        variant="default"
        leftIcon="←"
        onLeftAction={() => router.back()}
      />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Educational Banner */}
        <View style={styles.educationalBanner}>
          <Text style={styles.bannerIcon}>🎓</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>This is an Educational Chart</Text>
            <Text style={styles.bannerText}>
              Learn to read investment graphs - this shows a simulated 20-year SIP journey.
            </Text>
          </View>
        </View>

        {/* Quick Tips (Collapsible) */}
        <TouchableOpacity
          style={styles.tipsHeader}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.tipsTitle}>📖 How to Read This Chart</Text>
          <Text style={styles.tipsToggle}>{showTips ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {showTips && (
          <View style={styles.tipsContainer}>
            {graphReadingTips.map((tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Text style={styles.tipIcon}>{tip.icon}</Text>
                <Text style={styles.tipText}>{tip.tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Main Chart Section */}
        <WBLCard variant="default" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>20-Year SIP Journey</Text>
              <Text style={styles.chartSubtitle}>₹5,000/month investment</Text>
            </View>
            <View style={styles.chartBadge}>
              <Text style={styles.chartBadgeText}>Educational</Text>
            </View>
          </View>

          {/* The Educational Chart */}
          <EducationalGrowthChart
            activeOverlay={activeOverlay}
            onDataPointPress={handleDataPointPress}
          />

          {/* Learning Overlay Buttons */}
          <View style={styles.overlaySection}>
            <Text style={styles.overlayTitle}>Tap to highlight:</Text>
            <View style={styles.overlayButtons}>
              {learningOverlays.map(overlay => (
                <TouchableOpacity
                  key={overlay.id}
                  style={[
                    styles.overlayButton,
                    activeOverlay === overlay.id && styles.overlayButtonActive,
                    { borderColor: overlay.color },
                  ]}
                  onPress={() => handleOverlayChange(overlay.id)}
                >
                  <Text style={styles.overlayButtonIcon}>{overlay.icon}</Text>
                  <Text style={[
                    styles.overlayButtonText,
                    activeOverlay === overlay.id && { color: overlay.color },
                  ]}>
                    {overlay.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Active Overlay Description */}
            {activeOverlay !== 'none' && (
              <View style={[
                styles.overlayDescription,
                { borderLeftColor: learningOverlays.find(o => o.id === activeOverlay)?.color },
              ]}>
                <Text style={styles.overlayDescriptionText}>
                  {learningOverlays.find(o => o.id === activeOverlay)?.description}
                </Text>
              </View>
            )}
          </View>
        </WBLCard>

        {/* Summary Stats */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>After 20 Years of Patience</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>You Invested</Text>
              <Text style={styles.summaryValue}>₹{(totalInvested / 100000).toFixed(1)}L</Text>
              <Text style={styles.summarySubtext}>₹5K × 240 months</Text>
            </View>
            <View style={styles.summaryArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={[styles.summaryCard, styles.summaryCardHighlight]}>
              <Text style={styles.summaryLabel}>It Became</Text>
              <Text style={[styles.summaryValue, styles.summaryValueHighlight]}>
                ₹{(totalValue / 100000).toFixed(1)}L
              </Text>
              <Text style={styles.summaryGain}>+{returnsPercent}% returns!</Text>
            </View>
          </View>
        </View>

        {/* Educational Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Key Lessons From This Graph</Text>

          {educationalInsights.map(insight => (
            <View key={insight.id} style={styles.insightCard}>
              <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                <Text style={styles.insightEmoji}>{insight.icon}</Text>
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: insight.color }]}>
                  {insight.title}
                </Text>
                <Text style={styles.insightDescription}>
                  {insight.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* The "Don't Do This" Section */}
        <WBLInfoBox
          variant="warning"
          icon="⚠️"
          title="Common Mistake to Avoid"
          message="Don't panic and sell during dips! In Year 3 and Year 12, the market fell. If someone had stopped their SIP or sold everything, they would have missed the recovery and the amazing growth that followed."
          style={styles.warningBox}
        />

        {/* Key Takeaway */}
        <View style={styles.takeawaySection}>
          <Text style={styles.takeawayIcon}>💡</Text>
          <Text style={styles.takeawayTitle}>The Big Takeaway</Text>
          <Text style={styles.takeawayText}>
            Long-term graphs tell a story of patience winning. Short-term charts show noise.
            Always zoom out and look at the bigger picture!
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <WBLButton
            title="Try the SIP Simulator"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/sip-simulator')}
            style={styles.primaryButton}
          />
          <WBLButton
            title="Back to Learning"
            variant="outline"
            size="medium"
            fullWidth
            onPress={() => router.push('/learn-mode')}
          />
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerIcon}>ℹ️</Text>
          <Text style={styles.disclaimerText}>
            This is a simulated example for educational purposes. Real market returns vary.
            Past performance doesn't guarantee future results.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

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

  // Educational Banner
  educationalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.semantic.learning.light,
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.md,
    borderWidth: 1,
    borderColor: DesignColors.accent.purple,
  },
  bannerIcon: {
    fontSize: 28,
    marginRight: DesignSpacing.md,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.accent.purple,
    fontWeight: '700',
  },
  bannerText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
    marginTop: 2,
  },

  // Tips Section
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.lg,
  },
  tipsTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
  },
  tipsToggle: {
    fontSize: 12,
    color: DesignColors.neutral[500],
  },
  tipsContainer: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.xs,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: DesignSpacing.sm,
    width: 24,
  },
  tipText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    flex: 1,
  },

  // Chart Card
  chartCard: {
    marginTop: DesignSpacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: DesignSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: DesignColors.neutral[200],
  },
  chartTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
  },
  chartSubtitle: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginTop: 2,
  },
  chartBadge: {
    backgroundColor: DesignColors.accent.purple + '20',
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.round,
  },
  chartBadgeText: {
    ...DesignTextStyles.caption,
    color: DesignColors.accent.purple,
    fontWeight: '600',
  },

  // Overlay Section
  overlaySection: {
    padding: DesignSpacing.md,
    backgroundColor: DesignColors.neutral[50],
  },
  overlayTitle: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[600],
    marginBottom: DesignSpacing.sm,
  },
  overlayButtons: {
    flexDirection: 'row',
    gap: DesignSpacing.sm,
  },
  overlayButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    paddingVertical: DesignSpacing.sm,
    paddingHorizontal: DesignSpacing.sm,
    borderWidth: 1,
    borderColor: DesignColors.neutral[300],
  },
  overlayButtonActive: {
    backgroundColor: DesignColors.neutral[200],
    borderWidth: 2,
  },
  overlayButtonIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  overlayButtonText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[700],
    fontWeight: '600',
  },
  overlayDescription: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.md,
    borderLeftWidth: 3,
  },
  overlayDescriptionText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[700],
    lineHeight: 20,
  },

  // Summary Section
  summarySection: {
    marginTop: DesignSpacing.xl,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  summaryCards: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    alignItems: 'center',
  },
  summaryCardHighlight: {
    backgroundColor: DesignColors.primary[50],
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  summaryLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  summaryValue: {
    ...DesignTextStyles.dataLarge,
    color: DesignColors.neutral[900],
    marginVertical: 4,
  },
  summaryValueHighlight: {
    color: DesignColors.primary[500],
  },
  summarySubtext: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    fontSize: 10,
  },
  summaryGain: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '700',
  },
  summaryArrow: {
    paddingHorizontal: DesignSpacing.sm,
  },
  arrowText: {
    fontSize: 20,
    color: DesignColors.neutral[400],
  },

  // Insights Section
  insightsSection: {
    marginTop: DesignSpacing.xl,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.md,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: DesignRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  insightEmoji: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    ...DesignTextStyles.labelMedium,
    fontWeight: '700',
    marginBottom: 4,
  },
  insightDescription: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },

  // Warning Box
  warningBox: {
    marginTop: DesignSpacing.lg,
  },

  // Takeaway Section
  takeawaySection: {
    backgroundColor: DesignColors.accent.gold + '15',
    borderRadius: DesignRadius.xl,
    padding: DesignSpacing.lg,
    marginTop: DesignSpacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DesignColors.accent.gold,
  },
  takeawayIcon: {
    fontSize: 40,
    marginBottom: DesignSpacing.md,
  },
  takeawayTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.accent.gold,
    marginBottom: DesignSpacing.sm,
  },
  takeawayText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[700],
    textAlign: 'center',
    lineHeight: 22,
  },

  // Actions Section
  actionsSection: {
    marginTop: DesignSpacing.xl,
    gap: DesignSpacing.md,
  },
  primaryButton: {
    shadowColor: DesignColors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.xl,
  },
  disclaimerIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.sm,
  },
  disclaimerText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    flex: 1,
    lineHeight: 18,
  },
});
