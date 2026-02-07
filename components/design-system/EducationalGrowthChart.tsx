/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - EDUCATIONAL GROWTH CHART COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * An interactive, educational chart component that teaches users
 * how to read long-term investment graphs.
 * 
 * Features:
 * - Dark mode line chart with annotations
 * - Learning overlays for key concepts
 * - Interactive tooltips
 * - Educational explanations
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, {
  Path,
  Line,
  Circle,
  G,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import { DesignColors, DesignSpacing, DesignTextStyles, DesignRadius } from '../../constants/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// CHART DATA - Simulated 20-year SIP investment growth
// ═══════════════════════════════════════════════════════════════════════════

interface DataPoint {
  year: number;
  value: number;
  invested: number;
  event?: string;
  isMarketDip?: boolean;
}

// Generate realistic 20-year investment data with market volatility
const generateChartData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  let value = 0;
  let invested = 0;
  const monthlyInvestment = 5000; // ₹5,000/month SIP
  const annualReturn = 0.12; // Average 12% annual return

  for (let year = 0; year <= 20; year++) {
    invested = year * 12 * monthlyInvestment;

    // Simulate compounding with volatility
    if (year === 0) {
      value = 0;
    } else {
      // Base growth with compounding
      const baseGrowth = invested * Math.pow(1 + annualReturn / 12, year * 12) - invested;

      // Add some volatility patterns
      let volatilityFactor = 1;
      if (year === 3) volatilityFactor = 0.85; // 2008-like dip
      if (year === 8) volatilityFactor = 0.92; // Small correction
      if (year === 12) volatilityFactor = 0.88; // COVID-like dip
      if (year === 4) volatilityFactor = 1.1; // Recovery
      if (year === 13) volatilityFactor = 1.15; // Strong recovery

      value = invested + baseGrowth * volatilityFactor;
    }

    let event = undefined;
    let isMarketDip = false;

    if (year === 3) { event = 'Market Correction'; isMarketDip = true; }
    if (year === 12) { event = 'Market Dip'; isMarketDip = true; }
    if (year === 10) { event = 'Compounding kicks in!'; }
    if (year === 20) { event = 'Patience pays!'; }

    data.push({
      year,
      value: Math.round(value),
      invested: Math.round(invested),
      event,
      isMarketDip,
    });
  }

  return data;
};

const chartData = generateChartData();

// ═══════════════════════════════════════════════════════════════════════════
// LEARNING OVERLAY TYPES
// ═══════════════════════════════════════════════════════════════════════════

type LearningOverlay = 'none' | 'growth' | 'dips' | 'compounding';

interface OverlayInfo {
  id: LearningOverlay;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const learningOverlays: OverlayInfo[] = [
  {
    id: 'growth',
    title: 'Steady Growth',
    icon: '📈',
    color: DesignColors.primary[500],
    description: 'Notice how the line trends upward over 20 years despite bumps.',
  },
  {
    id: 'dips',
    title: 'Market Dips',
    icon: '📉',
    color: DesignColors.semantic.warning.main,
    description: 'Short-term drops are normal! The market always recovered.',
  },
  {
    id: 'compounding',
    title: 'Compounding',
    icon: '✨',
    color: DesignColors.accent.gold,
    description: 'See how growth accelerates in later years - that\'s compounding magic!',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATIONAL CHART COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface EducationalChartProps {
  width?: number;
  height?: number;
  activeOverlay?: LearningOverlay;
  onDataPointPress?: (point: DataPoint) => void;
}

export const EducationalGrowthChart: React.FC<EducationalChartProps> = ({
  width = SCREEN_WIDTH - 48,
  height = 280,
  activeOverlay = 'none',
  onDataPointPress,
}) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  const padding = { top: 30, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...chartData.map(d => d.value));
  const maxInvested = Math.max(...chartData.map(d => d.invested));

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  // Convert data to chart coordinates
  const getX = (year: number) => padding.left + (year / 20) * chartWidth;
  const getY = (value: number) => padding.top + chartHeight - (value / maxValue) * chartHeight;

  // Generate path for the main line
  const generatePath = (data: DataPoint[], key: 'value' | 'invested') => {
    return data.map((point, index) => {
      const x = getX(point.year);
      const y = getY(point[key]);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const mainPath = generatePath(chartData, 'value');
  const investedPath = generatePath(chartData, 'invested');

  // Generate Y-axis labels
  const yLabels = [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map(v => ({
    value: v,
    label: `₹${Math.round(v / 100000)}L`,
    y: getY(v),
  }));

  // Generate X-axis labels
  const xLabels = [0, 5, 10, 15, 20].map(year => ({
    year,
    label: `${year}Y`,
    x: getX(year),
  }));

  const handlePointPress = (point: DataPoint) => {
    setSelectedPoint(point);
    onDataPointPress?.(point);
  };

  return (
    <View style={styles.chartContainer}>
      <Svg width={width} height={height}>
        <Defs>
          {/* Gradient for area fill */}
          <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={DesignColors.primary[500]} stopOpacity="0.3" />
            <Stop offset="1" stopColor={DesignColors.primary[500]} stopOpacity="0.05" />
          </LinearGradient>

          {/* Growth overlay gradient */}
          <LinearGradient id="growthGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={DesignColors.primary[500]} stopOpacity="0.1" />
            <Stop offset="1" stopColor={DesignColors.primary[500]} stopOpacity="0.3" />
          </LinearGradient>

          {/* Compounding overlay gradient */}
          <LinearGradient id="compoundGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={DesignColors.accent.gold} stopOpacity="0" />
            <Stop offset="0.5" stopColor={DesignColors.accent.gold} stopOpacity="0.1" />
            <Stop offset="1" stopColor={DesignColors.accent.gold} stopOpacity="0.4" />
          </LinearGradient>
        </Defs>

        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <G key={`grid-${i}`}>
            <Line
              x1={padding.left}
              y1={label.y}
              x2={width - padding.right}
              y2={label.y}
              stroke={DesignColors.neutral[300]}
              strokeWidth={1}
              strokeDasharray="4,4"
              opacity={0.5}
            />
            <SvgText
              x={padding.left - 8}
              y={label.y + 4}
              fontSize={10}
              fill={DesignColors.neutral[500]}
              textAnchor="end"
            >
              {label.label}
            </SvgText>
          </G>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <SvgText
            key={`x-${i}`}
            x={label.x}
            y={height - 10}
            fontSize={10}
            fill={DesignColors.neutral[500]}
            textAnchor="middle"
          >
            {label.label}
          </SvgText>
        ))}

        {/* Learning Overlays */}
        {activeOverlay === 'growth' && (
          <G>
            {/* Trend line annotation */}
            <Line
              x1={getX(0)}
              y1={getY(0)}
              x2={getX(20)}
              y2={getY(maxValue * 0.9)}
              stroke={DesignColors.primary[500]}
              strokeWidth={2}
              strokeDasharray="8,4"
              opacity={0.8}
            />
            <Rect
              x={padding.left}
              y={padding.top}
              width={chartWidth}
              height={chartHeight}
              fill="url(#growthGradient)"
            />
          </G>
        )}

        {activeOverlay === 'dips' && (
          <G>
            {/* Highlight dip areas */}
            {chartData.filter(d => d.isMarketDip).map((point, i) => (
              <G key={`dip-${i}`}>
                <Circle
                  cx={getX(point.year)}
                  cy={getY(point.value)}
                  r={25}
                  fill={DesignColors.semantic.warning.main}
                  opacity={0.2}
                />
                <Circle
                  cx={getX(point.year)}
                  cy={getY(point.value)}
                  r={15}
                  fill={DesignColors.semantic.warning.main}
                  opacity={0.3}
                />
              </G>
            ))}
          </G>
        )}

        {activeOverlay === 'compounding' && (
          <G>
            {/* Highlight compounding acceleration */}
            <Rect
              x={getX(10)}
              y={padding.top}
              width={chartWidth - getX(10) + padding.left}
              height={chartHeight}
              fill="url(#compoundGradient)"
            />
            {/* Gap between lines annotation */}
            <Line
              x1={getX(15)}
              y1={getY(chartData[15].invested)}
              x2={getX(15)}
              y2={getY(chartData[15].value)}
              stroke={DesignColors.accent.gold}
              strokeWidth={2}
              strokeDasharray="4,2"
            />
            <SvgText
              x={getX(15) + 5}
              y={(getY(chartData[15].invested) + getY(chartData[15].value)) / 2}
              fontSize={9}
              fill={DesignColors.accent.gold}
              fontWeight="bold"
            >
              Returns!
            </SvgText>
          </G>
        )}

        {/* Invested amount line (base) */}
        <Path
          d={investedPath}
          stroke={DesignColors.neutral[400]}
          strokeWidth={2}
          fill="none"
          strokeDasharray="6,3"
        />

        {/* Main growth line */}
        <Path
          d={mainPath}
          stroke={DesignColors.primary[500]}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Area under curve */}
        <Path
          d={`${mainPath} L ${getX(20)} ${height - padding.bottom} L ${getX(0)} ${height - padding.bottom} Z`}
          fill="url(#areaGradient)"
        />

        {/* Data points */}
        {chartData.filter((_, i) => i % 2 === 0 || _.event).map((point, i) => (
          <G key={`point-${i}`}>
            <Circle
              cx={getX(point.year)}
              cy={getY(point.value)}
              r={point.event ? 8 : 4}
              fill={point.isMarketDip ? DesignColors.semantic.warning.main : DesignColors.primary[500]}
              stroke={DesignColors.neutral[50]}
              strokeWidth={2}
              onPress={() => handlePointPress(point)}
            />
            {point.event && (
              <SvgText
                x={getX(point.year)}
                y={getY(point.value) - 15}
                fontSize={8}
                fill={point.isMarketDip ? DesignColors.semantic.warning.main : DesignColors.accent.gold}
                textAnchor="middle"
                fontWeight="bold"
              >
                {point.event}
              </SvgText>
            )}
          </G>
        ))}

        {/* Legend */}
        <G>
          <Circle cx={padding.left + 10} cy={padding.top - 12} r={4} fill={DesignColors.primary[500]} />
          <SvgText x={padding.left + 20} y={padding.top - 8} fontSize={9} fill={DesignColors.neutral[600]}>
            Portfolio Value
          </SvgText>
          <Line
            x1={padding.left + 100}
            y1={padding.top - 12}
            x2={padding.left + 120}
            y2={padding.top - 12}
            stroke={DesignColors.neutral[400]}
            strokeWidth={2}
            strokeDasharray="4,2"
          />
          <SvgText x={padding.left + 125} y={padding.top - 8} fontSize={9} fill={DesignColors.neutral[600]}>
            Invested Amount
          </SvgText>
        </G>
      </Svg>

      {/* Selected Point Tooltip */}
      {selectedPoint && (
        <View style={[styles.tooltip, { left: getX(selectedPoint.year) - 60, top: getY(selectedPoint.value) - 70 }]}>
          <Text style={styles.tooltipYear}>Year {selectedPoint.year}</Text>
          <Text style={styles.tooltipValue}>₹{(selectedPoint.value / 100000).toFixed(1)}L</Text>
          <Text style={styles.tooltipInvested}>Invested: ₹{(selectedPoint.invested / 100000).toFixed(1)}L</Text>
          {selectedPoint.value > selectedPoint.invested && (
            <Text style={styles.tooltipGain}>
              +{Math.round(((selectedPoint.value - selectedPoint.invested) / selectedPoint.invested) * 100)}% gain
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  chartContainer: {
    position: 'relative',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.sm,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.sm,
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipYear: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 2,
  },
  tooltipValue: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
    fontWeight: '700',
  },
  tooltipInvested: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
  },
  tooltipGain: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '600',
    marginTop: 2,
  },
});

export { learningOverlays, chartData };
export type { LearningOverlay, DataPoint, OverlayInfo };
