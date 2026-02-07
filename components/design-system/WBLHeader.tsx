/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLHeader Component
 * Screen header with dark mode styling
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
} from '../../constants/design-system';

export type WBLHeaderVariant = 'default' | 'transparent' | 'elevated';

export interface WBLHeaderProps {
  title: string;
  subtitle?: string;
  variant?: WBLHeaderVariant;
  leftIcon?: string;
  rightIcon?: string;
  onLeftAction?: () => void;
  onRightAction?: () => void;
  style?: ViewStyle;
}

export const WBLHeader: React.FC<WBLHeaderProps> = ({
  title,
  subtitle,
  variant = 'default',
  leftIcon = '←',
  rightIcon,
  onLeftAction,
  onRightAction,
  style,
}) => {
  const headerStyles = getHeaderStyles(variant);

  return (
    <View style={[styles.container, headerStyles.container, style]}>
      {/* Left Action */}
      <View style={styles.leftSection}>
        {onLeftAction && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLeftAction}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.iconText}>{leftIcon}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <View style={styles.centerSection}>
        <Text style={[styles.title, headerStyles.title]} numberOfLines={1}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, headerStyles.subtitle]}>{subtitle}</Text>
        )}
      </View>

      {/* Right Action */}
      <View style={styles.rightSection}>
        {onRightAction && rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightAction}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.iconText}>{rightIcon}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getHeaderStyles = (variant: WBLHeaderVariant) => {
  const variants = {
    default: {
      container: {
        backgroundColor: DesignColors.neutral[50],
        borderBottomWidth: 1,
        borderBottomColor: DesignColors.neutral[200],
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    transparent: {
      container: {
        backgroundColor: 'transparent',
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
    elevated: {
      container: {
        backgroundColor: DesignColors.neutral[100],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      },
      title: { color: DesignColors.neutral[900] },
      subtitle: { color: DesignColors.neutral[600] },
    },
  };
  return variants[variant];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.md,
    minHeight: 56,
  },
  leftSection: {
    width: 48,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 48,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: DesignColors.neutral[200],
  },
  iconText: {
    fontSize: 20,
    color: DesignColors.neutral[800],
  },
  title: {
    ...DesignTextStyles.titleMedium,
    textAlign: 'center',
  },
  subtitle: {
    ...DesignTextStyles.caption,
    marginTop: 2,
  },
});
