/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - LEARNING MODE (STEP-BY-STEP VISUAL EDUCATION)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A guided, step-by-step learning experience that teaches:
 * 1. What is a Mutual Fund?
 * 2. What is SIP?
 * 3. Mutual Funds vs Stock Trading
 * 
 * Design Principles:
 * - Dark mode
 * - Minimal text
 * - Visual explanations
 * - Step-by-step progression
 * - Build confidence before simulator
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
} from '@/components/design-system';
import {
  MutualFundPoolVisual,
  DiversificationVisual,
  SIPVisual,
  RupeeCostAveragingVisual,
  MFvsStocksVisual,
  SIPDisciplineVisual,
} from '@/components/design-system/EducationVisuals';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// LEARNING STEPS CONTENT
// ═══════════════════════════════════════════════════════════════════════════

interface LearningStep {
  id: string;
  section: number;
  sectionTitle: string;
  title: string;
  subtitle?: string;
  visualType: 'mf-pool' | 'diversification' | 'sip' | 'rca' | 'discipline' | 'comparison' | 'summary' | 'intro';
  keyPoints?: string[];
  emoji?: string;
}

const learningSteps: LearningStep[] = [
  // Intro
  {
    id: 'intro',
    section: 0,
    sectionTitle: 'Welcome',
    title: 'Let\'s Learn Together',
    subtitle: 'A visual guide to wealth building',
    visualType: 'intro',
    emoji: '🎓',
    keyPoints: [
      'No complicated terms',
      'Simple visual explanations',
      'Takes ~5 minutes',
    ],
  },

  // Section 1: What is a Mutual Fund?
  {
    id: 'mf-what',
    section: 1,
    sectionTitle: 'What is a Mutual Fund?',
    title: 'Many Investors, One Fund',
    subtitle: 'Your money combines with others',
    visualType: 'mf-pool',
    keyPoints: [
      'Money from many people pools together',
      'A professional manager invests it',
      'You own a small part of the big fund',
    ],
  },
  {
    id: 'mf-diversification',
    section: 1,
    sectionTitle: 'What is a Mutual Fund?',
    title: 'Spread Across Many Stocks',
    subtitle: 'Don\'t put all eggs in one basket',
    visualType: 'diversification',
    keyPoints: [
      'Your money spreads across many companies',
      'If one company falls, others may rise',
      'This reduces your overall risk',
    ],
  },

  // Section 2: What is SIP?
  {
    id: 'sip-what',
    section: 2,
    sectionTitle: 'What is SIP?',
    title: 'Small Amount, Every Month',
    subtitle: 'Systematic Investment Plan',
    visualType: 'sip',
    keyPoints: [
      'Invest a fixed amount regularly',
      'Could be ₹500, ₹1000, or more',
      'Automatic - no need to remember',
    ],
  },
  {
    id: 'sip-rca',
    section: 2,
    sectionTitle: 'What is SIP?',
    title: 'The Magic of SIP',
    subtitle: 'Buy more when prices are low',
    visualType: 'rca',
    keyPoints: [
      'SIP buys more units when market is low',
      'Buys fewer units when market is high',
      'Averages out over time - less timing risk!',
    ],
  },
  {
    id: 'sip-discipline',
    section: 2,
    sectionTitle: 'What is SIP?',
    title: 'Build a Money Habit',
    subtitle: 'Discipline leads to wealth',
    visualType: 'discipline',
    keyPoints: [
      'SIP is automatic - set it once, forget it',
      'No need for daily market watching',
      'Consistency beats timing every time',
    ],
  },

  // Section 3: MF vs Stocks
  {
    id: 'comparison',
    section: 3,
    sectionTitle: 'MF vs Stock Trading',
    title: 'Know the Difference',
    subtitle: 'Both are valid, but very different',
    visualType: 'comparison',
    keyPoints: [
      'MF: Expert manages, you relax',
      'Stocks: You research, you manage',
      'For beginners: MF + SIP is calmer',
    ],
  },

  // Summary
  {
    id: 'summary',
    section: 4,
    sectionTitle: 'You\'re Ready!',
    title: 'Key Takeaways',
    subtitle: 'Remember these 3 things',
    visualType: 'summary',
    emoji: '🏆',
    keyPoints: [
      '🏦 Mutual Fund = Pooled money, expert managed',
      '💰 SIP = Small regular investments, big results',
      '⏰ Time is your friend - start early, stay long',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// STEP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface StepContentProps {
  step: LearningStep;
  isActive: boolean;
}

const StepContent: React.FC<StepContentProps> = ({ step, isActive }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isActive]);

  const renderVisual = () => {
    switch (step.visualType) {
      case 'intro':
        return (
          <View style={styles.introVisual}>
            <Text style={styles.introEmoji}>{step.emoji}</Text>
            <View style={styles.introFeatures}>
              {step.keyPoints?.map((point, i) => (
                <View key={i} style={styles.introFeature}>
                  <Text style={styles.introCheck}>✓</Text>
                  <Text style={styles.introFeatureText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'mf-pool':
        return <MutualFundPoolVisual animated={isActive} />;
      case 'diversification':
        return <DiversificationVisual animated={isActive} />;
      case 'sip':
        return <SIPVisual animated={isActive} />;
      case 'rca':
        return <RupeeCostAveragingVisual animated={isActive} />;
      case 'discipline':
        return <SIPDisciplineVisual animated={isActive} />;
      case 'comparison':
        return <MFvsStocksVisual animated={isActive} />;
      case 'summary':
        return (
          <View style={styles.summaryVisual}>
            <Text style={styles.summaryEmoji}>{step.emoji}</Text>
            <View style={styles.summaryPoints}>
              {step.keyPoints?.map((point, i) => (
                <View key={i} style={styles.summaryPoint}>
                  <Text style={styles.summaryPointText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.stepContent, { opacity: fadeAnim }]}>
      {/* Visual Content */}
      <View style={styles.visualArea}>
        {renderVisual()}
      </View>

      {/* Key Points (for main steps) */}
      {step.visualType !== 'intro' && step.visualType !== 'summary' && step.keyPoints && (
        <View style={styles.keyPointsContainer}>
          <Text style={styles.keyPointsTitle}>Key Points:</Text>
          {step.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPoint}>
              <Text style={styles.keyPointBullet}>•</Text>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN LEARNING MODE SCREEN
// ═══════════════════════════════════════════════════════════════════════════

export default function LearningModeScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const totalSteps = learningSteps.length;
  const step = learningSteps[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      // Complete - go to growth chart educational screen first
      router.push('/growth-chart');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      router.back();
    }
  };

  const handleSkip = () => {
    router.push('/sip-simulator');
  };

  // Section colors
  const getSectionColor = (section: number) => {
    switch (section) {
      case 0: return DesignColors.accent.purple;
      case 1: return DesignColors.primary[500];
      case 2: return DesignColors.accent.gold;
      case 3: return DesignColors.secondary[500];
      case 4: return DesignColors.primary[500];
      default: return DesignColors.neutral[500];
    }
  };

  const sectionColor = getSectionColor(step.section);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={[styles.sectionBadge, { backgroundColor: `${sectionColor}20` }]}>
            <Text style={[styles.sectionBadgeText, { color: sectionColor }]}>
              {step.sectionTitle}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: sectionColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{currentStep + 1} of {totalSteps}</Text>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Title */}
        <View style={styles.titleSection}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          {step.subtitle && (
            <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
          )}
        </View>

        {/* Step Content */}
        <StepContent step={step} isActive={true} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Step Indicators */}
        <View style={styles.stepIndicators}>
          {learningSteps.map((_, index) => {
            const dotStyle = {
              ...styles.stepDot,
              ...(index === currentStep ? styles.stepDotActive : {}),
              ...(index < currentStep ? styles.stepDotCompleted : {}),
              backgroundColor: index <= currentStep ? sectionColor : DesignColors.neutral[400],
            };
            return <View key={index} style={dotStyle} />;
          })}
        </View>

        {/* Action Button */}
        <WBLButton
          title={currentStep === totalSteps - 1 ? "See Growth Charts 📈" : "Next →"}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleNext}
          style={{ ...styles.nextButton, backgroundColor: sectionColor }}
        />

        {/* Confidence Message */}
        <View style={styles.confidenceMessage}>
          <Text style={styles.confidenceIcon}>💪</Text>
          <Text style={styles.confidenceText}>
            {currentStep === 0 && "Let's begin your learning journey"}
            {currentStep > 0 && currentStep < totalSteps - 1 && "You're doing great! Keep going."}
            {currentStep === totalSteps - 1 && "You're ready to practice!"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DesignColors.neutral[50],
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DesignColors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: DesignColors.neutral[700],
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  sectionBadge: {
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.xs,
    borderRadius: DesignRadius.round,
  },
  sectionBadgeText: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '700',
  },
  skipButton: {
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
  },
  skipText: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[500],
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DesignSpacing.screenPadding,
    marginBottom: DesignSpacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: DesignSpacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    minWidth: 50,
    textAlign: 'right',
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: 20,
  },

  // Title
  titleSection: {
    alignItems: 'center',
    marginBottom: DesignSpacing.lg,
  },
  stepTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: DesignColors.neutral[900],
    textAlign: 'center',
    marginBottom: DesignSpacing.xs,
  },
  stepSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    textAlign: 'center',
  },

  // Step Content
  stepContent: {
    flex: 1,
  },
  visualArea: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.xl,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.lg,
    minHeight: 300,
  },

  // Key Points
  keyPointsContainer: {
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.lg,
  },
  keyPointsTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    marginBottom: DesignSpacing.sm,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.sm,
  },
  keyPointBullet: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.primary[500],
    marginRight: DesignSpacing.sm,
    fontWeight: '700',
  },
  keyPointText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[800],
    flex: 1,
    lineHeight: 22,
  },

  // Intro Visual
  introVisual: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.xl,
  },
  introEmoji: {
    fontSize: 80,
    marginBottom: DesignSpacing.xl,
  },
  introFeatures: {
    width: '100%',
  },
  introFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.sm,
  },
  introCheck: {
    fontSize: 18,
    color: DesignColors.primary[500],
    marginRight: DesignSpacing.md,
  },
  introFeatureText: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    flex: 1,
  },

  // Summary Visual
  summaryVisual: {
    alignItems: 'center',
    paddingVertical: DesignSpacing.lg,
  },
  summaryEmoji: {
    fontSize: 64,
    marginBottom: DesignSpacing.xl,
  },
  summaryPoints: {
    width: '100%',
  },
  summaryPoint: {
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.lg,
    marginBottom: DesignSpacing.md,
    borderLeftWidth: 4,
    borderLeftColor: DesignColors.primary[500],
  },
  summaryPointText: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    lineHeight: 22,
  },

  // Bottom Nav
  bottomNav: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingVertical: DesignSpacing.lg,
    backgroundColor: DesignColors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: DesignColors.neutral[200],
  },
  stepIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: DesignSpacing.lg,
    gap: 6,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepDotActive: {
    width: 24,
    borderRadius: 4,
  },
  stepDotCompleted: {
    opacity: 0.5,
  },
  nextButton: {
    marginBottom: DesignSpacing.md,
  },
  confidenceMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confidenceIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  confidenceText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
});
