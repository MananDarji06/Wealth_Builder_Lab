/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLFundCard Component
 * Mutual Fund display card with calm, long-term focused design
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

export type FundCategory = 'equity' | 'debt' | 'hybrid' | 'index' | 'liquid';
export type RiskLevel = 'low' | 'moderate' | 'high';

export interface WBLFundCardProps {
  name: string;
  shortName?: string;
  category: FundCategory;
  riskLevel: RiskLevel;
  nav: number;
  returns1Y?: number;
  returns3Y?: number;
  returns5Y?: number;
  minSIP?: number;
  onPress?: () => void;
  selected?: boolean;
  style?: ViewStyle;
}

const categoryConfig = {
  equity: { icon: '📈', label: 'Equity', color: DesignColors.primary[500] },
  debt: { icon: '🛡️', label: 'Debt', color: DesignColors.secondary[500] },
  hybrid: { icon: '⚖️', label: 'Hybrid', color: DesignColors.accent.purple },
  index: { icon: '📊', label: 'Index', color: DesignColors.accent.teal },
  liquid: { icon: '💧', label: 'Liquid', color: DesignColors.accent.blue },
};

const riskConfig = {
  low: { label: 'Low Risk', color: DesignColors.primary[500], bg: DesignColors.primary[50] },
  moderate: { label: 'Moderate', color: DesignColors.semantic.warning.main, bg: DesignColors.semantic.warning.light },
  high: { label: 'High Risk', color: DesignColors.semantic.negative.main, bg: DesignColors.semantic.negative.light },
};

export const WBLFundCard: React.FC<WBLFundCardProps> = ({
  name,
  shortName,
  category,
  riskLevel,
  nav,
  returns1Y,
  returns3Y,
  returns5Y,
  minSIP = 500,
  onPress,
  selected = false,
  style,
}) => {
  const catConfig = categoryConfig[category];
  const riskCfg = riskConfig[riskLevel];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{catConfig.icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.fundName} numberOfLines={2}>{shortName || name}</Text>
          <View style={styles.badges}>
            <View style={[styles.categoryBadge, { backgroundColor: `${catConfig.color}20` }]}>
              <Text style={[styles.categoryText, { color: catConfig.color }]}>{catConfig.label}</Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: riskCfg.bg }]}>
              <Text style={[styles.riskText, { color: riskCfg.color }]}>{riskCfg.label}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Returns */}
      <View style={styles.returnsRow}>
        {returns1Y !== undefined && (
          <View style={styles.returnItem}>
            <Text style={styles.returnLabel}>1Y</Text>
            <Text style={[styles.returnValue, { color: returns1Y >= 0 ? DesignColors.primary[500] : DesignColors.semantic.negative.main }]}>
              {returns1Y >= 0 ? '+' : ''}{returns1Y.toFixed(1)}%
            </Text>
          </View>
        )}
        {returns3Y !== undefined && (
          <View style={styles.returnItem}>
            <Text style={styles.returnLabel}>3Y</Text>
            <Text style={[styles.returnValue, { color: returns3Y >= 0 ? DesignColors.primary[500] : DesignColors.semantic.negative.main }]}>
              {returns3Y >= 0 ? '+' : ''}{returns3Y.toFixed(1)}%
            </Text>
          </View>
        )}
        {returns5Y !== undefined && (
          <View style={styles.returnItem}>
            <Text style={styles.returnLabel}>5Y</Text>
            <Text style={[styles.returnValue, { color: returns5Y >= 0 ? DesignColors.primary[500] : DesignColors.semantic.negative.main }]}>
              {returns5Y >= 0 ? '+' : ''}{returns5Y.toFixed(1)}%
            </Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.navContainer}>
          <Text style={styles.navLabel}>NAV</Text>
          <Text style={styles.navValue}>₹{nav.toFixed(2)}</Text>
        </View>
        <View style={styles.sipContainer}>
          <Text style={styles.sipLabel}>Min SIP</Text>
          <Text style={styles.sipValue}>₹{minSIP}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.lg,
    ...DesignShadows.card,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: DesignColors.primary[500],
    ...DesignShadows.glow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: DesignColors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DesignSpacing.md,
  },
  icon: {
    fontSize: 22,
  },
  titleContainer: {
    flex: 1,
  },
  fundName: {
    ...DesignTextStyles.titleSmall,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.xs,
  },
  badges: {
    flexDirection: 'row',
    gap: DesignSpacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.xs,
  },
  categoryText: {
    ...DesignTextStyles.caption,
    fontWeight: '600',
  },
  riskBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.xs,
  },
  riskText: {
    ...DesignTextStyles.caption,
    fontWeight: '600',
  },
  returnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: DesignSpacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: DesignColors.neutral[300],
    marginBottom: DesignSpacing.md,
  },
  returnItem: {
    alignItems: 'center',
  },
  returnLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 2,
  },
  returnValue: {
    ...DesignTextStyles.labelLarge,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navContainer: {},
  navLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  navValue: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    fontWeight: '600',
  },
  sipContainer: {
    alignItems: 'flex-end',
  },
  sipLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  sipValue: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.primary[500],
    fontWeight: '600',
  },
});
