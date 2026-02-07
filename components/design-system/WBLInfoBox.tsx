/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLInfoBox Component
 * Educational tips and information boxes for wealth learning
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
} from '../../constants/design-system';

export type WBLInfoBoxVariant = 'info' | 'tip' | 'warning' | 'learn' | 'wealth' | 'compare' | 'sip';

export interface WBLInfoBoxProps {
  variant?: WBLInfoBoxVariant;
  title?: string;
  message: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const WBLInfoBox: React.FC<WBLInfoBoxProps> = ({
  variant = 'info',
  title,
  message,
  icon,
  actionText,
  onAction,
  style,
}) => {
  const boxStyles = getBoxStyles(variant);
  const defaultIcons = {
    info: '💡',
    tip: '🎯',
    warning: '⚠️',
    learn: '📚',
    wealth: '💰',
    compare: '⚖️',
    sip: '📈',
  };

  return (
    <View style={[styles.container, boxStyles.container, style]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon || defaultIcons[variant]}</Text>
      </View>
      <View style={styles.contentContainer}>
        {title && <Text style={[styles.title, boxStyles.title]}>{title}</Text>}
        <Text style={[styles.message, boxStyles.message]}>{message}</Text>
        {actionText && onAction && (
          <TouchableOpacity onPress={onAction} style={styles.actionButton}>
            <Text style={[styles.actionText, boxStyles.actionText]}>{actionText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getBoxStyles = (variant: WBLInfoBoxVariant) => {
  const variants = {
    info: {
      container: {
        backgroundColor: DesignColors.semantic.info.light,
        borderLeftColor: DesignColors.semantic.info.main,
      },
      title: { color: DesignColors.semantic.info.dark },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.semantic.info.main },
    },
    tip: {
      container: {
        backgroundColor: DesignColors.primary[50],
        borderLeftColor: DesignColors.primary[400],
      },
      title: { color: DesignColors.primary[600] },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.primary[500] },
    },
    warning: {
      container: {
        backgroundColor: DesignColors.semantic.warning.light,
        borderLeftColor: DesignColors.semantic.warning.main,
      },
      title: { color: DesignColors.semantic.warning.dark },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.semantic.warning.main },
    },
    learn: {
      container: {
        backgroundColor: DesignColors.semantic.learning.light,
        borderLeftColor: DesignColors.semantic.learning.main,
      },
      title: { color: DesignColors.semantic.learning.dark },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.semantic.learning.main },
    },
    wealth: {
      container: {
        backgroundColor: DesignColors.semantic.wealth.light,
        borderLeftColor: DesignColors.semantic.wealth.main,
      },
      title: { color: DesignColors.semantic.wealth.dark },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.semantic.wealth.main },
    },
    compare: {
      container: {
        backgroundColor: DesignColors.secondary[50],
        borderLeftColor: DesignColors.secondary[400],
      },
      title: { color: DesignColors.secondary[600] },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.secondary[500] },
    },
    sip: {
      container: {
        backgroundColor: DesignColors.primary[50],
        borderLeftColor: DesignColors.accent.emerald,
      },
      title: { color: DesignColors.primary[600] },
      message: { color: DesignColors.neutral[700] },
      actionText: { color: DesignColors.primary[500] },
    },
  };

  return variants[variant];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
    borderLeftWidth: 4,
  },
  iconContainer: {
    marginRight: DesignSpacing.md,
    marginTop: 2,
  },
  icon: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    ...DesignTextStyles.labelLarge,
    marginBottom: DesignSpacing.xs,
  },
  message: {
    ...DesignTextStyles.bodyMedium,
    lineHeight: 22,
  },
  actionButton: {
    marginTop: DesignSpacing.sm,
    alignSelf: 'flex-start',
  },
  actionText: {
    ...DesignTextStyles.labelMedium,
    fontWeight: '600',
  },
});
