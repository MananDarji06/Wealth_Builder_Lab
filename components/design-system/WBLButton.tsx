/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLButton Component
 * Calm, confidence-building button for long-term wealth actions
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTypography,
  DesignTouch,
} from '../../constants/design-system';

export type WBLButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'wealth' | 'invest';
export type WBLButtonSize = 'small' | 'medium' | 'large';

export interface WBLButtonProps {
  title: string;
  onPress?: () => void;
  variant?: WBLButtonVariant;
  size?: WBLButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

export const WBLButton: React.FC<WBLButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const buttonStyles = getButtonStyles(variant, size, disabled);

  return (
    <TouchableOpacity
      style={[
        styles.base,
        buttonStyles.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={buttonStyles.textColor} size="small" />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text style={[styles.text, buttonStyles.text, textStyle]}>{title}</Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const getButtonStyles = (variant: WBLButtonVariant, size: WBLButtonSize, disabled: boolean) => {
  const heights = {
    small: DesignTouch.buttonSmall,
    medium: DesignTouch.buttonMedium,
    large: DesignTouch.buttonLarge,
  };

  const fontSizes = {
    small: DesignTypography.fontSize.labelMedium,
    medium: DesignTypography.fontSize.labelLarge,
    large: DesignTypography.fontSize.titleSmall,
  };

  const variants = {
    primary: {
      backgroundColor: disabled ? DesignColors.neutral[400] : DesignColors.primary[500],
      textColor: DesignColors.neutral[0],
      borderColor: 'transparent',
    },
    secondary: {
      backgroundColor: disabled ? DesignColors.neutral[300] : DesignColors.neutral[200],
      textColor: disabled ? DesignColors.neutral[500] : DesignColors.neutral[800],
      borderColor: 'transparent',
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: disabled ? DesignColors.neutral[500] : DesignColors.primary[500],
      borderColor: disabled ? DesignColors.neutral[400] : DesignColors.primary[400],
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: disabled ? DesignColors.neutral[500] : DesignColors.primary[500],
      borderColor: 'transparent',
    },
    wealth: {
      backgroundColor: disabled ? DesignColors.neutral[400] : DesignColors.semantic.wealth.main,
      textColor: DesignColors.neutral[0],
      borderColor: 'transparent',
    },
    invest: {
      backgroundColor: disabled ? DesignColors.neutral[400] : DesignColors.secondary[400],
      textColor: DesignColors.neutral[900],
      borderColor: 'transparent',
    },
  };

  const v = variants[variant];

  return {
    container: {
      height: heights[size],
      backgroundColor: v.backgroundColor,
      borderWidth: variant === 'outline' ? 2 : 0,
      borderColor: v.borderColor,
    } as ViewStyle,
    text: {
      color: v.textColor,
      fontSize: fontSizes[size],
    } as TextStyle,
    textColor: v.textColor,
  };
};

const styles = StyleSheet.create({
  base: {
    borderRadius: DesignRadius.button,
    paddingHorizontal: DesignSpacing.buttonPadding.horizontal,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: DesignSpacing.sm,
  },
  iconRight: {
    marginLeft: DesignSpacing.sm,
  },
});
