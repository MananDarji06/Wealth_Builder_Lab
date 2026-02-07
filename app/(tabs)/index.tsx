/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - HOME TAB SCREEN
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
} from '@/components/design-system';

const quickActions = [
  { id: 'simulator', title: 'SIP Simulator', icon: '🎮', route: '/sip-simulator' },
  { id: 'funds', title: 'Explore Funds', icon: '🏦', route: '/fund-selection' },
  { id: 'insights', title: 'Insights', icon: '💡', route: '/insights' },
  { id: 'learn', title: 'Learn More', icon: '📖', route: '/learn-mode' },
];

export default function HomeTab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>👋 Welcome to</Text>
          <Text style={styles.title}>Wealth Builder Lab</Text>
          <Text style={styles.subtitle}>Learn mutual funds & SIP investing</Text>
        </View>

        {/* Quick Stats Card */}
        <WBLCard variant="growth" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Lessons Done</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>🌱</Text>
              <Text style={styles.statLabel}>Beginner</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Simulations</Text>
            </View>
          </View>
        </WBLCard>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Tip */}
        <WBLInfoBox
          variant="wealth"
          icon="💰"
          title="Did You Know?"
          message="₹500/month invested for 20 years at 12% returns can grow to ₹5+ lakhs. Start small, think big!"
          style={styles.tipBox}
        />

        {/* CTA */}
        <WBLCard variant="learning" style={styles.ctaCard}>
          <Text style={styles.ctaIcon}>🎯</Text>
          <Text style={styles.ctaTitle}>Ready to Learn?</Text>
          <Text style={styles.ctaDesc}>Start with the basics of mutual funds and SIP investing.</Text>
          <WBLButton
            title="Start Learning Journey"
            variant="primary"
            size="medium"
            onPress={() => router.push('/learn-mode')}
            style={styles.ctaButton}
          />
        </WBLCard>

        {/* Reminder */}
        <View style={styles.reminder}>
          <Text style={styles.reminderIcon}>🎓</Text>
          <Text style={styles.reminderText}>
            This is an educational platform. Practice with virtual money, learn real skills.
          </Text>
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
  greeting: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: DesignColors.neutral[900],
    marginTop: DesignSpacing.xs,
  },
  subtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.primary[500],
    marginTop: DesignSpacing.xs,
  },

  // Stats
  statsCard: {
    marginTop: DesignSpacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...DesignTextStyles.dataLarge,
    color: DesignColors.neutral[900],
    marginBottom: 4,
  },
  statLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: DesignColors.neutral[300],
  },

  // Actions
  actionsSection: {
    marginTop: DesignSpacing.xl,
  },
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DesignSpacing.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: DesignSpacing.sm,
  },
  actionTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    textAlign: 'center',
  },

  // Tip
  tipBox: {
    marginTop: DesignSpacing.xl,
  },

  // CTA
  ctaCard: {
    marginTop: DesignSpacing.xl,
    alignItems: 'center',
  },
  ctaIcon: {
    fontSize: 40,
    marginBottom: DesignSpacing.md,
  },
  ctaTitle: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.accent.purple,
    marginBottom: DesignSpacing.sm,
  },
  ctaDesc: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    textAlign: 'center',
    marginBottom: DesignSpacing.lg,
  },
  ctaButton: {},

  // Reminder
  reminder: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
    marginTop: DesignSpacing.xl,
  },
  reminderIcon: {
    fontSize: 18,
    marginRight: DesignSpacing.md,
  },
  reminderText: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    flex: 1,
    lineHeight: 20,
  },
});
