/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WBLGrowthChart Component
 * Long-term wealth growth visualization chart
 * Calm, reassuring, steady growth visualization
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  DesignColors,
  DesignRadius,
  DesignSpacing,
  DesignTextStyles,
} from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface GrowthDataPoint {
  month: number;
  invested: number;
  value: number;
}

export interface WBLGrowthChartProps {
  data: GrowthDataPoint[];
  totalInvested: number;
  currentValue: number;
  yearsLabel?: string;
  showEducation?: boolean;
}

export const WBLGrowthChart: React.FC<WBLGrowthChartProps> = ({
  data,
  totalInvested,
  currentValue,
  yearsLabel = 'years',
  showEducation = true,
}) => {
  const chartWidth = SCREEN_WIDTH - (DesignSpacing.screenPadding * 2) - (DesignSpacing.cardPadding * 2);
  const chartHeight = 180;

  const maxValue = Math.max(...data.map(d => Math.max(d.invested, d.value)));
  const minValue = 0;
  const range = maxValue - minValue;

  const gains = currentValue - totalInvested;
  const gainsPercent = totalInvested > 0 ? ((gains / totalInvested) * 100) : 0;

  // Create SVG-like path points for both lines
  const investedPath = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((point.invested - minValue) / range) * (chartHeight - 20);
    return { x, y };
  });

  const valuePath = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((point.value - minValue) / range) * (chartHeight - 20);
    return { x, y };
  });

  return (
    <View style={styles.container}>
      {/* Summary Header */}
      <View style={styles.summaryHeader}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total Invested</Text>
          <Text style={styles.summaryValue}>
            ₹{totalInvested.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Current Value</Text>
          <Text style={[styles.summaryValue, styles.valueHighlight]}>
            ₹{currentValue.toLocaleString('en-IN')}
          </Text>
        </View>
      </View>

      {/* Gains Badge */}
      <View style={[styles.gainsBadge, gains >= 0 ? styles.gainsPositive : styles.gainsNegative]}>
        <Text style={styles.gainsIcon}>{gains >= 0 ? '📈' : '📉'}</Text>
        <Text style={[styles.gainsText, { color: gains >= 0 ? DesignColors.primary[500] : DesignColors.semantic.negative.main }]}>
          {gains >= 0 ? '+' : ''}₹{gains.toLocaleString('en-IN')} ({gainsPercent.toFixed(1)}% returns)
        </Text>
      </View>

      {/* Chart Area */}
      <View style={[styles.chartContainer, { width: chartWidth, height: chartHeight }]}>
        {/* Grid Lines */}
        {[0, 1, 2, 3].map(i => (
          <View
            key={i}
            style={[
              styles.gridLine,
              { bottom: (i / 3) * (chartHeight - 20) + 10 }
            ]}
          />
        ))}

        {/* Invested Line (dashed effect with dots) */}
        <View style={styles.lineContainer}>
          {investedPath.map((point, index) => (
            <View
              key={`inv-${index}`}
              style={[
                styles.linePoint,
                {
                  left: point.x - 2,
                  top: point.y - 2,
                  backgroundColor: DesignColors.secondary[500],
                  opacity: 0.7,
                },
              ]}
            />
          ))}
        </View>

        {/* Value Line (solid) */}
        <View style={styles.lineContainer}>
          {valuePath.map((point, index) => {
            const prevPoint = index > 0 ? valuePath[index - 1] : point;
            const width = Math.sqrt(Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2));
            const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);

            if (index === 0) return null;

            return (
              <View
                key={`val-${index}`}
                style={[
                  styles.lineSegment,
                  {
                    left: prevPoint.x,
                    top: prevPoint.y,
                    width: width,
                    transform: [{ rotate: `${angle}rad` }],
                    backgroundColor: DesignColors.primary[500],
                  },
                ]}
              />
            );
          })}
        </View>

        {/* End Points */}
        <View
          style={[
            styles.endPoint,
            {
              left: valuePath[valuePath.length - 1]?.x - 6 || 0,
              top: valuePath[valuePath.length - 1]?.y - 6 || 0,
              backgroundColor: DesignColors.primary[500],
            },
          ]}
        />
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: DesignColors.secondary[500] }]} />
          <Text style={styles.legendText}>Amount Invested</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendLine, { backgroundColor: DesignColors.primary[500] }]} />
          <Text style={styles.legendText}>Portfolio Value</Text>
        </View>
      </View>

      {/* Educational Note */}
      {showEducation && (
        <View style={styles.educationNote}>
          <Text style={styles.educationIcon}>💡</Text>
          <Text style={styles.educationText}>
            The green area shows your wealth growth from compound returns over time
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.card,
    padding: DesignSpacing.cardPadding,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  summaryItem: {
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: DesignColors.neutral[300],
    marginHorizontal: DesignSpacing.lg,
  },
  summaryLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 2,
  },
  summaryValue: {
    ...DesignTextStyles.dataSmall,
    color: DesignColors.neutral[900],
  },
  valueHighlight: {
    color: DesignColors.primary[500],
  },
  gainsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    alignSelf: 'flex-start',
    marginBottom: DesignSpacing.lg,
  },
  gainsPositive: {
    backgroundColor: `${DesignColors.primary[500]}15`,
  },
  gainsNegative: {
    backgroundColor: `${DesignColors.semantic.negative.main}15`,
  },
  gainsIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  gainsText: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '700',
  },
  chartContainer: {
    position: 'relative',
    marginBottom: DesignSpacing.md,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: DesignColors.neutral[300],
    opacity: 0.5,
  },
  lineContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  linePoint: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  lineSegment: {
    position: 'absolute',
    height: 3,
    borderRadius: 1.5,
    transformOrigin: 'left center',
  },
  endPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: DesignColors.neutral[100],
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: DesignSpacing.xl,
    marginBottom: DesignSpacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: DesignSpacing.xs,
  },
  legendLine: {
    width: 16,
    height: 3,
    borderRadius: 1.5,
    marginRight: DesignSpacing.xs,
  },
  legendText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
  },
  educationNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.sm,
    padding: DesignSpacing.sm,
    marginTop: DesignSpacing.sm,
  },
  educationIcon: {
    fontSize: 12,
    marginRight: DesignSpacing.xs,
    marginTop: 2,
  },
  educationText: {
    ...DesignTextStyles.caption,
    color: DesignColors.primary[600],
    flex: 1,
    lineHeight: 16,
  },
});
