/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLLearningCard Component
 * Educational content cards for MF/SIP learning
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
  DesignShadows,
} from '../../constants/design-system';

export type WBLLearningCardType = 'lesson' | 'concept' | 'comparison' | 'simulation' | 'quiz' | 'milestone';

export interface WBLLearningCardProps {
  type: WBLLearningCardType;
  title: string;
  subtitle?: string;
  description?: string;
  duration?: string;
  progress?: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const typeConfig = {
  lesson: {
    icon: '📖',
    color: DesignColors.primary[500],
    bg: DesignColors.primary[50],
    label: 'Lesson'
  },
  concept: {
    icon: '💡',
    color: DesignColors.accent.purple,
    bg: DesignColors.semantic.learning.light,
    label: 'Concept'
  },
  comparison: {
    icon: '⚖️',
    color: DesignColors.secondary[500],
    bg: DesignColors.secondary[50],
    label: 'Compare'
  },
  simulation: {
    icon: '🎮',
    color: DesignColors.accent.teal,
    bg: '#0D2626',
    label: 'Practice'
  },
  quiz: {
    icon: '❓',
    color: DesignColors.semantic.warning.main,
    bg: DesignColors.semantic.warning.light,
    label: 'Quiz'
  },
  milestone: {
    icon: '🏆',
    color: DesignColors.accent.gold,
    bg: DesignColors.semantic.wealth.light,
    label: 'Milestone'
  },
};

export const WBLLearningCard: React.FC<WBLLearningCardProps> = ({
  type,
  title,
  subtitle,
  description,
  duration,
  progress = 0,
  isCompleted = false,
  isLocked = false,
  onPress,
  style,
}) => {
  const config = typeConfig[type];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLocked && styles.lockedContainer,
        isCompleted && styles.completedContainer,
        style,
      ]}
      onPress={isLocked ? undefined : onPress}
      activeOpacity={isLocked ? 1 : 0.85}
      disabled={isLocked}
    >
      {/* Left Section - Icon */}
      <View style={[styles.iconSection, { backgroundColor: config.bg }]}>
        <Text style={styles.icon}>{isLocked ? '🔒' : isCompleted ? '✅' : config.icon}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.typeBadge, { backgroundColor: `${config.color}20` }]}>
            <Text style={[styles.typeText, { color: config.color }]}>{config.label}</Text>
          </View>
          {duration && (
            <Text style={styles.duration}>⏱️ {duration}</Text>
          )}
        </View>

        <Text style={[styles.title, isLocked && styles.lockedText]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {description && <Text style={styles.description} numberOfLines={2}>{description}</Text>}

        {/* Progress Bar */}
        {progress > 0 && !isCompleted && (
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%`, backgroundColor: config.color }]} />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
          </View>
        )}
      </View>

      {/* Arrow */}
      {!isLocked && (
        <View style={styles.arrowSection}>
          <Text style={styles.arrow}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    overflow: 'hidden',
    ...DesignShadows.sm,
  },
  lockedContainer: {
    opacity: 0.6,
  },
  completedContainer: {
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  iconSection: {
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    padding: DesignSpacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DesignSpacing.xs,
  },
  typeBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.xs,
  },
  typeText: {
    ...DesignTextStyles.caption,
    fontWeight: '700',
  },
  duration: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  title: {
    ...DesignTextStyles.titleSmall,
    color: DesignColors.neutral[900],
    marginBottom: 2,
  },
  lockedText: {
    color: DesignColors.neutral[500],
  },
  subtitle: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[600],
  },
  description: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[500],
    marginTop: DesignSpacing.xs,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DesignSpacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 2,
    marginRight: DesignSpacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    minWidth: 32,
    textAlign: 'right',
  },
  arrowSection: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: DesignColors.neutral[400],
  },
});
