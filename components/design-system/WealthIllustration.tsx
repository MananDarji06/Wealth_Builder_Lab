/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - WealthIllustration Component
 * Calm, growth-focused illustration for module entry
 * ═══════════════════════════════════════════════════════════════════════════
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Rect, G } from 'react-native-svg';
import { DesignColors } from '../../constants/design-system';

interface WealthIllustrationProps {
  size?: number;
  animated?: boolean;
}

export const WealthIllustration: React.FC<WealthIllustrationProps> = ({
  size = 200,
  animated = true,
}) => {
  const growthAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (animated) {
      // Slow, steady growth animation
      Animated.timing(growthAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();

      // Gentle glow pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 0.6,
            duration: 2500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 2500,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      growthAnim.setValue(1);
      glowAnim.setValue(0.5);
    }
  }, [animated]);

  const viewBox = '0 0 200 200';

  // Steady upward growth curve (not volatile like stocks)
  const growthPath = 'M20 160 Q50 155, 80 140 T130 100 T180 50';

  // Compound growth area fill
  const areaPath = 'M20 160 Q50 155, 80 140 T130 100 T180 50 L180 180 L20 180 Z';

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.glowContainer, { opacity: glowAnim }]}>
        <View style={styles.glow} />
      </Animated.View>

      <Svg width={size} height={size} viewBox={viewBox}>
        <Defs>
          {/* Growth gradient - emerald tones */}
          <LinearGradient id="growthGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor={DesignColors.primary[50]} stopOpacity="0.2" />
            <Stop offset="50%" stopColor={DesignColors.primary[400]} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={DesignColors.primary[500]} stopOpacity="0.5" />
          </LinearGradient>

          {/* Line gradient */}
          <LinearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={DesignColors.primary[400]} />
            <Stop offset="100%" stopColor={DesignColors.primary[600]} />
          </LinearGradient>

          {/* Gold accent gradient */}
          <LinearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={DesignColors.accent.gold} />
            <Stop offset="100%" stopColor="#E8C860" />
          </LinearGradient>
        </Defs>

        {/* Background circle */}
        <Circle
          cx="100"
          cy="100"
          r="90"
          fill={DesignColors.neutral[200]}
          opacity="0.3"
        />

        {/* Grid lines - representing steady progress */}
        <G opacity="0.2">
          {[40, 80, 120, 160].map(y => (
            <Path
              key={`h-${y}`}
              d={`M30 ${y} L170 ${y}`}
              stroke={DesignColors.neutral[400]}
              strokeWidth="0.5"
              strokeDasharray="4,4"
            />
          ))}
        </G>

        {/* Growth area fill */}
        <Path
          d={areaPath}
          fill="url(#growthGradient)"
        />

        {/* Main growth line */}
        <Path
          d={growthPath}
          stroke="url(#lineGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* SIP contribution dots - regular intervals */}
        {[20, 50, 80, 110, 140, 170].map((x, i) => {
          const y = 160 - (i * 18);
          return (
            <Circle
              key={`sip-${i}`}
              cx={x}
              cy={Math.max(y, 60)}
              r="4"
              fill={DesignColors.secondary[500]}
              opacity="0.8"
            />
          );
        })}

        {/* End point - wealth goal */}
        <Circle
          cx="180"
          cy="50"
          r="8"
          fill="url(#goldGradient)"
        />
        <Circle
          cx="180"
          cy="50"
          r="12"
          fill="none"
          stroke={DesignColors.accent.gold}
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Seed/Start icon */}
        <G transform="translate(10, 145)">
          <Circle cx="10" cy="10" r="8" fill={DesignColors.secondary[400]} />
          <Path
            d="M10 6 L10 14 M6 10 L14 10"
            stroke={DesignColors.neutral[900]}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* Goal/Tree icon */}
        <G transform="translate(165, 25)">
          <Circle cx="15" cy="15" r="18" fill={DesignColors.semantic.wealth.light} opacity="0.5" />
        </G>
      </Svg>

      {/* Progress years indicator */}
      <View style={styles.yearsIndicator}>
        <View style={styles.yearDot} />
        <View style={styles.yearLine} />
        <View style={styles.yearDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: '80%',
    height: '80%',
    borderRadius: 1000,
    backgroundColor: DesignColors.primary[500],
    opacity: 0.1,
  },
  yearsIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DesignColors.neutral[400],
  },
  yearLine: {
    flex: 1,
    height: 1,
    backgroundColor: DesignColors.neutral[400],
    opacity: 0.5,
  },
});
