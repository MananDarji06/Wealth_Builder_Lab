/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - LEARN TAB SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLCard,
  WBLButton,
  WBLInfoBox,
  WBLLearningCard,
} from '@/components/design-system';

const featuredLessons = [
  {
    id: 'what-is-mf',
    type: 'lesson' as const,
    title: 'What is a Mutual Fund?',
    subtitle: 'Start your wealth journey here',
    duration: '3 min',
  },
  {
    id: 'sip-power',
    type: 'concept' as const,
    title: 'The Power of SIP',
    subtitle: 'Small steps, big dreams',
    duration: '4 min',
  },
  {
    id: 'mf-vs-stocks',
    type: 'comparison' as const,
    title: 'MF vs Stocks',
    subtitle: 'Know the difference',
    duration: '5 min',
  },
];

const categories = [
  { id: 'basics', label: 'Basics', icon: '📖', count: 3 },
  { id: 'sip', label: 'SIP', icon: '💰', count: 4 },
  { id: 'funds', label: 'Funds', icon: '🏦', count: 3 },
  { id: 'mindset', label: 'Mindset', icon: '🧠', count: 3 },
];

export default function LearnTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Learn</Text>
          <Text style={styles.subtitle}>Build your financial knowledge</Text>
        </View>

        {/* Progress */}
        <WBLCard variant="growth" style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercent}>0% Complete</Text>
            </View>
            <View style={styles.streak}>
              <Text style={styles.streakIcon}>🌱</Text>
              <Text style={styles.streakText}>New Learner</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
        </WBLCard>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Topics</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => router.push('/learn-mode')}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
                <Text style={styles.categoryCount}>{cat.count} lessons</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Start Here</Text>
          {featuredLessons.map(lesson => (
            <WBLLearningCard
              key={lesson.id}
              type={lesson.type}
              title={lesson.title}
              subtitle={lesson.subtitle}
              duration={lesson.duration}
              onPress={() => router.push('/learn-mode')}
              style={styles.lessonCard}
            />
          ))}
        </View>

        {/* Tip */}
        <WBLInfoBox
          variant="tip"
          icon="💡"
          title="Quick Tip"
          message="Start with 'What is a Mutual Fund?' to build a strong foundation before exploring SIP and other concepts."
          style={styles.tipBox}
        />

        {/* Full Course CTA */}
        <View style={styles.ctaSection}>
          <WBLButton
            title="View Full Course"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/learn-mode')}
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

  // Header
  header: {
    paddingTop: DesignSpacing.xl,
    paddingBottom: DesignSpacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: DesignColors.neutral[900],
  },
  subtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    marginTop: DesignSpacing.xs,
  },

  // Progress
  progressCard: {},
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  progressTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
  },
  progressPercent: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginTop: 2,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.primary[100],
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.round,
  },
  streakIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  streakText: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[600],
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: DesignColors.primary[500],
    borderRadius: 4,
  },

  // Categories
  categoriesSection: {
    marginTop: DesignSpacing.xl,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSpacing.sm,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: DesignSpacing.xs,
  },
  categoryLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
  },
  categoryCount: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginTop: 2,
  },

  // Featured
  featuredSection: {
    marginTop: DesignSpacing.xl,
  },
  lessonCard: {
    marginBottom: DesignSpacing.md,
  },

  // Tip
  tipBox: {
    marginTop: DesignSpacing.md,
  },

  // CTA
  ctaSection: {
    marginTop: DesignSpacing.xl,
  },
});
