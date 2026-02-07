/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - MODULE ENTRY SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The welcoming entry point for the Wealth Builder Lab module.
 * Designed to introduce mutual fund and SIP education in a calm, reassuring way.
 * 
 * PURPOSE:
 * - Introduce mutual fund and SIP concepts
 * - Emphasize long-term wealth building, not trading
 * - Build confidence for first-time investors
 * - Clearly differentiate from stock trading
 * 
 * DARK MODE ONLY - Calm, focused, wealth-building appearance
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
  WealthIllustration,
} from '@/components/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ModuleEntryScreen() {
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/learn-mode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={DesignColors.neutral[50]} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FINLEARN BRANDING */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.brandingContainer}>
          <View style={styles.brandingBadge}>
            <Text style={styles.brandingIcon}>📚</Text>
            <Text style={styles.brandingText}>FinLearn</Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTENT - CENTERED */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.mainContent}>
          {/* Central Illustration */}
          <View style={styles.illustrationContainer}>
            <WealthIllustration size={220} animated={true} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Wealth Builder Lab</Text>
            <Text style={styles.subtitle}>Mutual Funds & SIP Simulator</Text>
            <Text style={styles.tagline}>Learn to grow wealth over time</Text>
          </View>

          {/* What You'll Learn Section */}
          <View style={styles.learnPreviewSection}>
            <Text style={styles.learnPreviewTitle}>What You'll Learn</Text>
            <Text style={styles.learnPreviewSubtitle}>~5 min visual journey</Text>

            <View style={styles.learnTopics}>
              {/* Topic 1 */}
              <View style={styles.learnTopic}>
                <View style={[styles.topicNumber, { backgroundColor: DesignColors.primary[100] }]}>
                  <Text style={[styles.topicNumberText, { color: DesignColors.primary[600] }]}>1</Text>
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.topicIcon}>🏦</Text>
                  <Text style={styles.topicTitle}>What is a Mutual Fund?</Text>
                  <Text style={styles.topicDesc}>Pool your money with others</Text>
                </View>
              </View>

              {/* Topic 2 */}
              <View style={styles.learnTopic}>
                <View style={[styles.topicNumber, { backgroundColor: DesignColors.accent.gold + '30' }]}>
                  <Text style={[styles.topicNumberText, { color: DesignColors.accent.gold }]}>2</Text>
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.topicIcon}>💰</Text>
                  <Text style={styles.topicTitle}>What is SIP?</Text>
                  <Text style={styles.topicDesc}>Small amounts, big results</Text>
                </View>
              </View>

              {/* Topic 3 */}
              <View style={styles.learnTopic}>
                <View style={[styles.topicNumber, { backgroundColor: DesignColors.secondary[100] }]}>
                  <Text style={[styles.topicNumberText, { color: DesignColors.secondary[500] }]}>3</Text>
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.topicIcon}>⚖️</Text>
                  <Text style={styles.topicTitle}>MF vs Stock Trading</Text>
                  <Text style={styles.topicDesc}>Know the key differences</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Key Difference Card */}
          <View style={styles.differenceCard}>
            <View style={styles.differenceHeader}>
              <Text style={styles.differenceIcon}>🎯</Text>
              <Text style={styles.differenceTitle}>Learn First, Practice After</Text>
            </View>
            <Text style={styles.differenceText}>
              Complete the quick visual lessons, then try the{' '}
              <Text style={styles.highlight}>SIP Simulator</Text>{' '}
              to practice with virtual money.
            </Text>
          </View>
        </View>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* BOTTOM ACTION SECTION */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <View style={styles.actionSection}>
          {/* Disclaimer Card */}
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerIcon}>🎓</Text>
            <View style={styles.disclaimerContent}>
              <Text style={styles.disclaimerTitle}>Educational Simulator</Text>
              <Text style={styles.disclaimerText}>
                Practice with virtual money. No real investments. Learn safely without risk.
              </Text>
            </View>
          </View>

          {/* Primary CTA */}
          <WBLButton
            title="Start Learning"
            variant="primary"
            size="large"
            fullWidth
            onPress={handleStartLearning}
            style={styles.ctaButton}
          />

          {/* Reassurance Text */}
          <View style={styles.reassuranceContainer}>
            <View style={styles.reassuranceBadge}>
              <Text style={styles.reassuranceIcon}>🌱</Text>
              <Text style={styles.reassuranceText}>Grow wealth patiently & wisely</Text>
            </View>
          </View>
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
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.xxxl,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BRANDING
  // ─────────────────────────────────────────────────────────────────────────
  brandingContainer: {
    alignItems: 'center',
    marginBottom: DesignSpacing.lg,
  },
  brandingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: DesignColors.neutral[300],
  },
  brandingIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  brandingText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN CONTENT
  // ─────────────────────────────────────────────────────────────────────────
  mainContent: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.xl,
  },
  illustrationContainer: {
    marginBottom: DesignSpacing.xxl,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.lg,
    marginBottom: DesignSpacing.xl,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.primary[500],
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: DesignSpacing.xs,
  },
  tagline: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    textAlign: 'center',
  },

  // Learn Preview Section
  learnPreviewSection: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.xl,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.lg,
    width: '100%',
  },
  learnPreviewTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.xs,
  },
  learnPreviewSubtitle: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    textAlign: 'center',
    marginBottom: DesignSpacing.lg,
  },
  learnTopics: {
    gap: DesignSpacing.md,
  },
  learnTopic: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
  },
  topicNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  topicNumberText: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '700',
  },
  topicContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  topicIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.sm,
  },
  topicTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    marginRight: DesignSpacing.sm,
  },
  topicDesc: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },

  // Difference Card
  differenceCard: {
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.primary[300],
    width: '100%',
  },
  differenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.sm,
  },
  differenceIcon: {
    fontSize: 20,
    marginRight: DesignSpacing.sm,
  },
  differenceTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.primary[600],
    fontWeight: '700',
  },
  differenceText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[700],
    lineHeight: 22,
  },
  highlight: {
    color: DesignColors.primary[500],
    fontWeight: '600',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ACTION SECTION
  // ─────────────────────────────────────────────────────────────────────────
  actionSection: {
    alignItems: 'center',
    marginTop: DesignSpacing.xl,
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.semantic.learning.light,
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.xl,
    borderWidth: 1,
    borderColor: DesignColors.accent.purple,
    width: '100%',
  },
  disclaimerIcon: {
    fontSize: 24,
    marginRight: DesignSpacing.md,
  },
  disclaimerContent: {
    flex: 1,
  },
  disclaimerTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.accent.purple,
    marginBottom: 4,
  },
  disclaimerText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },
  ctaButton: {
    marginBottom: DesignSpacing.lg,
    shadowColor: DesignColors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  reassuranceContainer: {
    alignItems: 'center',
  },
  reassuranceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[50],
    paddingHorizontal: DesignSpacing.lg,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    borderWidth: 1,
    borderColor: DesignColors.primary[300],
  },
  reassuranceIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.sm,
  },
  reassuranceText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '600',
  },
});
