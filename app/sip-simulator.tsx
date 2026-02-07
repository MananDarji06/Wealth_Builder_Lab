/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - MUTUAL FUND & SIP SIMULATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * A hands-on simulator for learning mutual fund and SIP investing.
 * Features: Virtual wallet, SIP/Lump Sum investments, portfolio tracking,
 * educational insights, and compound growth calculations.
 * 
 * Educational Goals:
 * - Teach patience and consistency in investing
 * - Show power of compounding over time
 * - Demonstrate that market dips don't harm long-term growth
 * - Build confidence in systematic investing
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  WBLButton,
  WBLCard,
  WBLInfoBox,
  WBLHeader,
} from '@/components/design-system';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ═══════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

interface MutualFund {
  id: string;
  name: string;
  category: 'equity' | 'debt' | 'hybrid' | 'index';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number; // Annual return percentage
  icon: string;
  description: string;
}

interface Investment {
  id: string;
  fundId: string;
  type: 'sip' | 'lumpsum';
  amount: number; // Monthly SIP or one-time lump sum
  startDate: Date;
  durationMonths: number;
  isPaused: boolean;
  investedAmount: number;
  currentValue: number;
  monthsCompleted: number;
}

interface WalletState {
  balance: number;
  monthlyIncome: number;
  totalInvested: number;
  totalCurrentValue: number;
}

interface SimulatorState {
  currentMonth: number;
  isSimulating: boolean;
  simulationSpeed: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// MOCK DATA - Available Mutual Funds
// ═══════════════════════════════════════════════════════════════════════════

const availableFunds: MutualFund[] = [
  {
    id: 'nifty50',
    name: 'Nifty 50 Index Fund',
    category: 'index',
    riskLevel: 'medium',
    expectedReturn: 12,
    icon: '📊',
    description: 'Tracks top 50 Indian companies. Great for beginners.',
  },
  {
    id: 'bluechip',
    name: 'Blue Chip Equity Fund',
    category: 'equity',
    riskLevel: 'medium',
    expectedReturn: 14,
    icon: '💎',
    description: 'Invests in well-established large-cap companies.',
  },
  {
    id: 'flexi',
    name: 'Flexi Cap Growth Fund',
    category: 'equity',
    riskLevel: 'high',
    expectedReturn: 16,
    icon: '🚀',
    description: 'Flexible allocation across market caps for growth.',
  },
  {
    id: 'hybrid',
    name: 'Balanced Advantage Fund',
    category: 'hybrid',
    riskLevel: 'medium',
    expectedReturn: 10,
    icon: '⚖️',
    description: 'Mix of equity and debt for balanced returns.',
  },
  {
    id: 'debt',
    name: 'Short Term Debt Fund',
    category: 'debt',
    riskLevel: 'low',
    expectedReturn: 7,
    icon: '🛡️',
    description: 'Lower risk with stable, modest returns.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// EDUCATIONAL INSIGHTS
// ═══════════════════════════════════════════════════════════════════════════

const educationalInsights = {
  compounding: [
    "💡 Longer duration increases compounding power!",
    "✨ Your returns are now earning returns - that's compounding!",
    "📈 Notice how growth accelerates in later years?",
  ],
  discipline: [
    "🔄 Regular SIP builds financial discipline",
    "💪 Consistency beats trying to time the market",
    "🎯 Monthly investing creates a healthy money habit",
  ],
  patience: [
    "⏰ Market dips did not harm your long-term growth",
    "🌱 Patience is the investor's greatest asset",
    "📊 Stay invested - time smooths out volatility",
  ],
  general: [
    "🏆 You're on track to build real wealth!",
    "💰 Small amounts add up to big wealth over time",
    "🎓 Every month invested is a step towards financial freedom",
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount.toFixed(0)}`;
};

const calculateSIPMaturity = (
  monthlyAmount: number,
  annualReturn: number,
  months: number
): number => {
  const monthlyRate = annualReturn / 100 / 12;
  if (monthlyRate === 0) return monthlyAmount * months;

  const maturity = monthlyAmount *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  return maturity;
};

const calculateLumpSumMaturity = (
  principal: number,
  annualReturn: number,
  months: number
): number => {
  const monthlyRate = annualReturn / 100 / 12;
  return principal * Math.pow(1 + monthlyRate, months);
};

const getRandomInsight = (category: keyof typeof educationalInsights): string => {
  const insights = educationalInsights[category];
  return insights[Math.floor(Math.random() * insights.length)];
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN SIMULATOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function SIPSimulatorScreen() {
  const router = useRouter();

  // Wallet State
  const [wallet, setWallet] = useState<WalletState>({
    balance: 500000, // Starting virtual wallet: ₹5L
    monthlyIncome: 50000, // Default monthly income: ₹50K
    totalInvested: 0,
    totalCurrentValue: 0,
  });

  // Investments
  const [investments, setInvestments] = useState<Investment[]>([]);

  // Simulator State
  const [simulator, setSimulator] = useState<SimulatorState>({
    currentMonth: 0,
    isSimulating: false,
    simulationSpeed: 1000, // ms per month
  });

  // UI State
  const [showSetupModal, setShowSetupModal] = useState(true);
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<string>('');
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(null);

  // Setup Form State
  const [setupMonthlyIncome, setSetupMonthlyIncome] = useState('50000');
  const [setupInvestmentAmount, setSetupInvestmentAmount] = useState('10000');
  const [setupDuration, setSetupDuration] = useState('60'); // months

  // New Investment Form State
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState('5000');
  const [investmentDuration, setInvestmentDuration] = useState('36');

  // Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // ═══════════════════════════════════════════════════════════════════════════
  // SIMULATION LOGIC
  // ═══════════════════════════════════════════════════════════════════════════

  // Update investments each month
  const simulateMonth = useCallback(() => {
    setSimulator(prev => ({ ...prev, currentMonth: prev.currentMonth + 1 }));

    // Add monthly income to wallet
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + prev.monthlyIncome,
    }));

    // Update each investment
    setInvestments(prev => prev.map(inv => {
      if (inv.isPaused || inv.monthsCompleted >= inv.durationMonths) {
        return inv;
      }

      const fund = availableFunds.find(f => f.id === inv.fundId);
      if (!fund) return inv;

      let newInvested = inv.investedAmount;
      let sipDeducted = 0;

      // For SIP, add monthly investment
      if (inv.type === 'sip') {
        newInvested += inv.amount;
        sipDeducted = inv.amount;
      }

      // Calculate current value with returns
      const monthsActive = inv.monthsCompleted + 1;
      let newCurrentValue: number;

      if (inv.type === 'sip') {
        newCurrentValue = calculateSIPMaturity(inv.amount, fund.expectedReturn, monthsActive);
      } else {
        newCurrentValue = calculateLumpSumMaturity(inv.investedAmount, fund.expectedReturn, monthsActive);
      }

      // Add some market volatility (±5%)
      const volatility = 1 + (Math.random() - 0.5) * 0.1;
      newCurrentValue *= volatility;

      return {
        ...inv,
        investedAmount: newInvested,
        currentValue: newCurrentValue,
        monthsCompleted: monthsActive,
      };
    }));

    // Deduct SIP amounts from wallet
    setWallet(prev => {
      let totalSIPDeduction = 0;
      investments.forEach(inv => {
        if (inv.type === 'sip' && !inv.isPaused && inv.monthsCompleted < inv.durationMonths) {
          totalSIPDeduction += inv.amount;
        }
      });

      return {
        ...prev,
        balance: Math.max(0, prev.balance - totalSIPDeduction),
      };
    });

    // Show random educational insight every few months
    if (simulator.currentMonth % 6 === 0) {
      const categories: (keyof typeof educationalInsights)[] = ['compounding', 'discipline', 'patience', 'general'];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setCurrentInsight(getRandomInsight(randomCategory));
    }
  }, [investments, simulator.currentMonth]);

  // Auto-simulation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (simulator.isSimulating) {
      interval = setInterval(simulateMonth, simulator.simulationSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [simulator.isSimulating, simulator.simulationSpeed, simulateMonth]);

  // Calculate totals
  useEffect(() => {
    const totalInvested = investments.reduce((sum, inv) => sum + inv.investedAmount, 0);
    const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

    setWallet(prev => ({
      ...prev,
      totalInvested,
      totalCurrentValue,
    }));
  }, [investments]);

  // Pulse animation for active simulation
  useEffect(() => {
    if (simulator.isSimulating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [simulator.isSimulating]);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  const handleSetupComplete = () => {
    const income = parseInt(setupMonthlyIncome) || 50000;
    const investAmt = parseInt(setupInvestmentAmount) || 10000;
    const duration = parseInt(setupDuration) || 60;

    setWallet(prev => ({
      ...prev,
      monthlyIncome: income,
    }));

    // Create initial investment
    const initialFund = availableFunds[0];
    const newInvestment: Investment = {
      id: Date.now().toString(),
      fundId: initialFund.id,
      type: 'sip',
      amount: investAmt,
      startDate: new Date(),
      durationMonths: duration,
      isPaused: false,
      investedAmount: investAmt, // First month invested
      currentValue: investAmt,
      monthsCompleted: 1,
    };

    setInvestments([newInvestment]);
    setWallet(prev => ({
      ...prev,
      balance: prev.balance - investAmt,
    }));

    setShowSetupModal(false);
    setCurrentInsight("🎉 Congratulations! Your first SIP has started. Let's watch your wealth grow!");
  };

  const handleAddInvestment = () => {
    if (!selectedFund) return;

    const amount = parseInt(investmentAmount) || 5000;
    const duration = parseInt(investmentDuration) || 36;

    if (investmentType === 'lumpsum' && amount > wallet.balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance for this lump sum investment.');
      return;
    }

    const newInvestment: Investment = {
      id: Date.now().toString(),
      fundId: selectedFund.id,
      type: investmentType,
      amount: amount,
      startDate: new Date(),
      durationMonths: duration,
      isPaused: false,
      investedAmount: investmentType === 'lumpsum' ? amount : amount,
      currentValue: amount,
      monthsCompleted: 1,
    };

    setInvestments(prev => [...prev, newInvestment]);

    // Deduct from wallet
    if (investmentType === 'lumpsum') {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - amount,
      }));
    } else {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance - amount, // First SIP deduction
      }));
    }

    setShowAddInvestmentModal(false);
    setSelectedFund(null);
    setCurrentInsight(
      investmentType === 'sip'
        ? "🔄 New SIP started! Regular SIP builds financial discipline."
        : "💰 Lump sum invested! Now let compounding work its magic."
    );
  };

  const handlePauseInvestment = (investmentId: string) => {
    setInvestments(prev => prev.map(inv =>
      inv.id === investmentId
        ? { ...inv, isPaused: !inv.isPaused }
        : inv
    ));
    setCurrentInsight("⏸️ Investment paused. Remember: consistency is key to wealth building!");
  };

  const handleRemoveInvestment = (investmentId: string) => {
    const investment = investments.find(inv => inv.id === investmentId);
    if (investment) {
      // Return current value to wallet
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + investment.currentValue,
      }));
      setInvestments(prev => prev.filter(inv => inv.id !== investmentId));
      setCurrentInsight("📤 Investment redeemed. The current value has been added to your wallet.");
    }
  };

  const toggleSimulation = () => {
    setSimulator(prev => ({ ...prev, isSimulating: !prev.isSimulating }));
  };

  const skipMonths = (months: number) => {
    for (let i = 0; i < months; i++) {
      simulateMonth();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATED VALUES
  // ═══════════════════════════════════════════════════════════════════════════

  const totalProfit = wallet.totalCurrentValue - wallet.totalInvested;
  const profitPercentage = wallet.totalInvested > 0
    ? ((totalProfit / wallet.totalInvested) * 100).toFixed(1)
    : '0.0';

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <SafeAreaView style={styles.container}>
      <WBLHeader
        title="MF & SIP Simulator"
        subtitle="Practice investing virtually"
        variant="default"
        leftIcon="←"
        onLeftAction={() => router.back()}
        rightIcon="+"
        onRightAction={() => setShowAddInvestmentModal(true)}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Virtual Wallet Card */}
        <Animated.View style={[styles.walletCard, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletIcon}>💰</Text>
            <View style={styles.walletInfo}>
              <Text style={styles.walletLabel}>Virtual Wallet</Text>
              <Text style={styles.walletBalance}>{formatCurrency(wallet.balance)}</Text>
            </View>
            <View style={styles.monthBadge}>
              <Text style={styles.monthBadgeText}>Month {simulator.currentMonth}</Text>
            </View>
          </View>

          <View style={styles.walletStats}>
            <View style={styles.walletStat}>
              <Text style={styles.walletStatLabel}>Monthly Income</Text>
              <Text style={styles.walletStatValue}>{formatCurrency(wallet.monthlyIncome)}</Text>
            </View>
            <View style={styles.walletStatDivider} />
            <View style={styles.walletStat}>
              <Text style={styles.walletStatLabel}>Total Invested</Text>
              <Text style={styles.walletStatValue}>{formatCurrency(wallet.totalInvested)}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Portfolio Summary */}
        <View style={styles.portfolioSection}>
          <Text style={styles.sectionTitle}>📊 Your Portfolio</Text>

          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryLabel}>Invested</Text>
              <Text style={styles.summaryValue}>{formatCurrency(wallet.totalInvested)}</Text>
            </View>
            <View style={styles.summaryArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
            <View style={[styles.summaryCard, styles.summaryCardHighlight]}>
              <Text style={styles.summaryLabel}>Current Value</Text>
              <Text style={[styles.summaryValue, styles.summaryValueHighlight]}>
                {formatCurrency(wallet.totalCurrentValue)}
              </Text>
            </View>
          </View>

          {/* Profit Display */}
          <View style={styles.profitCard}>
            <View style={styles.profitRow}>
              <Text style={styles.profitLabel}>Total Profit</Text>
              <Text style={[
                styles.profitValue,
                totalProfit >= 0 ? styles.profitPositive : styles.profitNegative
              ]}>
                {totalProfit >= 0 ? '+' : ''}{formatCurrency(totalProfit)}
              </Text>
            </View>
            <View style={styles.profitRow}>
              <Text style={styles.profitLabel}>Return %</Text>
              <Text style={[
                styles.profitPercentage,
                totalProfit >= 0 ? styles.profitPositive : styles.profitNegative
              ]}>
                {totalProfit >= 0 ? '+' : ''}{profitPercentage}%
              </Text>
            </View>
          </View>
        </View>

        {/* Educational Insight */}
        {currentInsight && (
          <View style={styles.insightCard}>
            <Text style={styles.insightText}>{currentInsight}</Text>
          </View>
        )}

        {/* Simulation Controls */}
        <View style={styles.controlsSection}>
          <Text style={styles.sectionTitle}>⏱️ Simulation Controls</Text>

          <View style={styles.controlsRow}>
            <WBLButton
              title={simulator.isSimulating ? "⏸️ Pause" : "▶️ Start"}
              variant={simulator.isSimulating ? "outline" : "primary"}
              size="medium"
              onPress={toggleSimulation}
              style={styles.controlButton}
            />
            <WBLButton
              title="+1 Month"
              variant="secondary"
              size="medium"
              onPress={() => skipMonths(1)}
              style={styles.controlButton}
            />
            <WBLButton
              title="+12 Months"
              variant="secondary"
              size="medium"
              onPress={() => skipMonths(12)}
              style={styles.controlButton}
            />
          </View>

          <Text style={styles.controlHint}>
            Watch your investments grow over time. Each month, your SIPs will auto-invest.
          </Text>
        </View>

        {/* Investment List */}
        <View style={styles.investmentsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📈 Your Investments</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddInvestmentModal(true)}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {investments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No investments yet</Text>
              <Text style={styles.emptySubtext}>Add your first mutual fund investment</Text>
            </View>
          ) : (
            investments.map(investment => {
              const fund = availableFunds.find(f => f.id === investment.fundId);
              if (!fund) return null;

              const profit = investment.currentValue - investment.investedAmount;
              const profitPct = ((profit / investment.investedAmount) * 100).toFixed(1);

              return (
                <View key={investment.id} style={[
                  styles.investmentCard,
                  investment.isPaused && styles.investmentCardPaused
                ]}>
                  <View style={styles.investmentHeader}>
                    <View style={styles.investmentFund}>
                      <Text style={styles.fundIcon}>{fund.icon}</Text>
                      <View>
                        <Text style={styles.fundName}>{fund.name}</Text>
                        <View style={styles.investmentBadges}>
                          <View style={[
                            styles.typeBadge,
                            investment.type === 'sip' ? styles.sipBadge : styles.lumpSumBadge
                          ]}>
                            <Text style={styles.typeBadgeText}>
                              {investment.type === 'sip' ? 'SIP' : 'Lump Sum'}
                            </Text>
                          </View>
                          {investment.isPaused && (
                            <View style={styles.pausedBadge}>
                              <Text style={styles.pausedBadgeText}>Paused</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.investmentDetails}>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>
                        {investment.type === 'sip' ? 'Monthly SIP' : 'Invested'}
                      </Text>
                      <Text style={styles.detailValue}>{formatCurrency(investment.amount)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Total Invested</Text>
                      <Text style={styles.detailValue}>{formatCurrency(investment.investedAmount)}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Current Value</Text>
                      <Text style={[styles.detailValue, styles.valueHighlight]}>
                        {formatCurrency(investment.currentValue)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Profit/Loss</Text>
                      <Text style={[
                        styles.detailValue,
                        profit >= 0 ? styles.profitPositive : styles.profitNegative
                      ]}>
                        {profit >= 0 ? '+' : ''}{formatCurrency(profit)} ({profitPct}%)
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>
                        {investment.monthsCompleted} / {investment.durationMonths} months
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={styles.progressContainer}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${(investment.monthsCompleted / investment.durationMonths) * 100}%` }
                        ]}
                      />
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.investmentActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handlePauseInvestment(investment.id)}
                    >
                      <Text style={styles.actionButtonText}>
                        {investment.isPaused ? '▶️ Resume' : '⏸️ Pause'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.redeemButton]}
                      onPress={() => handleRemoveInvestment(investment.id)}
                    >
                      <Text style={styles.actionButtonText}>📤 Redeem</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Key Learnings */}
        <WBLInfoBox
          variant="tip"
          icon="🏆"
          title="Remember This"
          message="Mutual Fund investing rewards patience and consistency. Stay invested, invest regularly, and let compounding work its magic over time!"
          style={styles.keyLearning}
        />

        {/* Educational Messages */}
        <View style={styles.educationSection}>
          <Text style={styles.sectionTitle}>📚 Lessons From Your Journey</Text>

          <View style={styles.lessonCard}>
            <Text style={styles.lessonIcon}>⏰</Text>
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>Longer Duration = More Compounding</Text>
              <Text style={styles.lessonText}>
                Notice how returns accelerate over time? That's compounding at work!
              </Text>
            </View>
          </View>

          <View style={styles.lessonCard}>
            <Text style={styles.lessonIcon}>💪</Text>
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>Regular SIP Builds Discipline</Text>
              <Text style={styles.lessonText}>
                Monthly investing creates a healthy savings habit that pays off big.
              </Text>
            </View>
          </View>

          <View style={styles.lessonCard}>
            <Text style={styles.lessonIcon}>📈</Text>
            <View style={styles.lessonContent}>
              <Text style={styles.lessonTitle}>Market Dips Don't Harm Long-Term</Text>
              <Text style={styles.lessonText}>
                Short-term volatility smooths out over years. Stay patient!
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.navigationSection}>
          <WBLButton
            title="View Growth Charts"
            variant="outline"
            size="medium"
            fullWidth
            onPress={() => router.push('/growth-chart')}
          />
          <WBLButton
            title="Back to Learning"
            variant="secondary"
            size="medium"
            fullWidth
            onPress={() => router.push('/learn-mode')}
            style={{ marginTop: DesignSpacing.md }}
          />
        </View>
      </ScrollView>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* SETUP MODAL */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <Modal
        visible={showSetupModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🎯 Set Up Your Simulator</Text>
            <Text style={styles.modalSubtitle}>
              Enter your details to start the virtual investing journey
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Monthly Income (₹)</Text>
              <TextInput
                style={styles.textInput}
                value={setupMonthlyIncome}
                onChangeText={setSetupMonthlyIncome}
                keyboardType="numeric"
                placeholder="50000"
                placeholderTextColor={DesignColors.neutral[400]}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Monthly Investment (₹)</Text>
              <TextInput
                style={styles.textInput}
                value={setupInvestmentAmount}
                onChangeText={setSetupInvestmentAmount}
                keyboardType="numeric"
                placeholder="10000"
                placeholderTextColor={DesignColors.neutral[400]}
              />
              <Text style={styles.inputHint}>
                Recommended: 20-30% of your income
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Investment Duration (months)</Text>
              <TextInput
                style={styles.textInput}
                value={setupDuration}
                onChangeText={setSetupDuration}
                keyboardType="numeric"
                placeholder="60"
                placeholderTextColor={DesignColors.neutral[400]}
              />
              <Text style={styles.inputHint}>
                Longer duration = more compounding power!
              </Text>
            </View>

            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>📊 Quick Preview</Text>
              <Text style={styles.previewText}>
                {`If you invest ${formatCurrency(parseInt(setupInvestmentAmount) || 10000)}/month for ${setupDuration || 60} months at ~12% return:`}
              </Text>
              <Text style={styles.previewValue}>
                Estimated Value: {formatCurrency(
                  calculateSIPMaturity(
                    parseInt(setupInvestmentAmount) || 10000,
                    12,
                    parseInt(setupDuration) || 60
                  )
                )}
              </Text>
            </View>

            <WBLButton
              title="Start Simulator"
              variant="primary"
              size="large"
              fullWidth
              onPress={handleSetupComplete}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ADD INVESTMENT MODAL */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <Modal
        visible={showAddInvestmentModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>➕ Add Investment</Text>
              <TouchableOpacity onPress={() => setShowAddInvestmentModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Fund Selection */}
            <Text style={styles.inputLabel}>Select Mutual Fund</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.fundSelector}
            >
              {availableFunds.map(fund => (
                <TouchableOpacity
                  key={fund.id}
                  style={[
                    styles.fundOption,
                    selectedFund?.id === fund.id && styles.fundOptionSelected
                  ]}
                  onPress={() => setSelectedFund(fund)}
                >
                  <Text style={styles.fundOptionIcon}>{fund.icon}</Text>
                  <Text style={styles.fundOptionName}>{fund.name}</Text>
                  <Text style={styles.fundOptionReturn}>{fund.expectedReturn}% p.a.</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Investment Type */}
            <Text style={styles.inputLabel}>Investment Type</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  investmentType === 'sip' && styles.typeOptionSelected
                ]}
                onPress={() => setInvestmentType('sip')}
              >
                <Text style={styles.typeIcon}>🔄</Text>
                <Text style={styles.typeName}>SIP</Text>
                <Text style={styles.typeDesc}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeOption,
                  investmentType === 'lumpsum' && styles.typeOptionSelected
                ]}
                onPress={() => setInvestmentType('lumpsum')}
              >
                <Text style={styles.typeIcon}>💰</Text>
                <Text style={styles.typeName}>Lump Sum</Text>
                <Text style={styles.typeDesc}>One-time</Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                {investmentType === 'sip' ? 'Monthly Amount (₹)' : 'One-time Amount (₹)'}
              </Text>
              <TextInput
                style={styles.textInput}
                value={investmentAmount}
                onChangeText={setInvestmentAmount}
                keyboardType="numeric"
                placeholder="5000"
                placeholderTextColor={DesignColors.neutral[400]}
              />
            </View>

            {/* Duration Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (months)</Text>
              <TextInput
                style={styles.textInput}
                value={investmentDuration}
                onChangeText={setInvestmentDuration}
                keyboardType="numeric"
                placeholder="36"
                placeholderTextColor={DesignColors.neutral[400]}
              />
            </View>

            {/* Maturity Preview */}
            {selectedFund && (
              <View style={styles.previewBox}>
                <Text style={styles.previewTitle}>📊 Expected Maturity</Text>
                <Text style={styles.previewValue}>
                  {formatCurrency(
                    investmentType === 'sip'
                      ? calculateSIPMaturity(
                        parseInt(investmentAmount) || 5000,
                        selectedFund.expectedReturn,
                        parseInt(investmentDuration) || 36
                      )
                      : calculateLumpSumMaturity(
                        parseInt(investmentAmount) || 5000,
                        selectedFund.expectedReturn,
                        parseInt(investmentDuration) || 36
                      )
                  )}
                </Text>
              </View>
            )}

            <WBLButton
              title="Add Investment"
              variant="primary"
              size="large"
              fullWidth
              onPress={handleAddInvestment}
              style={styles.modalButton}
              disabled={!selectedFund}
            />
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingBottom: 100,
  },

  // Wallet Card
  walletCard: {
    backgroundColor: DesignColors.primary[500],
    borderRadius: DesignRadius.xl,
    padding: DesignSpacing.lg,
    marginTop: DesignSpacing.md,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  walletIcon: {
    fontSize: 32,
    marginRight: DesignSpacing.md,
  },
  walletInfo: {
    flex: 1,
  },
  walletLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[900],
    opacity: 0.8,
  },
  walletBalance: {
    fontSize: 28,
    fontWeight: '700',
    color: DesignColors.neutral[900],
  },
  monthBadge: {
    backgroundColor: DesignColors.neutral[900] + '30',
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.round,
  },
  monthBadgeText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[900],
    fontWeight: '600',
  },
  walletStats: {
    flexDirection: 'row',
    backgroundColor: DesignColors.neutral[900] + '20',
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
  },
  walletStat: {
    flex: 1,
    alignItems: 'center',
  },
  walletStatDivider: {
    width: 1,
    backgroundColor: DesignColors.neutral[900] + '30',
    marginHorizontal: DesignSpacing.md,
  },
  walletStatLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[900],
    opacity: 0.7,
    marginBottom: 4,
  },
  walletStatValue: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '700',
  },

  // Section Titles
  sectionTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },

  // Portfolio Section
  portfolioSection: {
    marginTop: DesignSpacing.xl,
  },
  summaryCards: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    alignItems: 'center',
  },
  summaryCardHighlight: {
    backgroundColor: DesignColors.primary[50],
    borderWidth: 1,
    borderColor: DesignColors.primary[400],
  },
  summaryLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 4,
  },
  summaryValue: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.neutral[900],
  },
  summaryValueHighlight: {
    color: DesignColors.primary[500],
  },
  summaryArrow: {
    paddingHorizontal: DesignSpacing.sm,
  },
  arrowIcon: {
    fontSize: 20,
    color: DesignColors.neutral[400],
  },
  profitCard: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
  },
  profitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.xs,
  },
  profitLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[600],
  },
  profitValue: {
    ...DesignTextStyles.titleMedium,
    fontWeight: '700',
  },
  profitPercentage: {
    ...DesignTextStyles.labelLarge,
    fontWeight: '700',
  },
  profitPositive: {
    color: DesignColors.semantic.positive.main,
  },
  profitNegative: {
    color: DesignColors.semantic.negative.main,
  },

  // Insight Card
  insightCard: {
    backgroundColor: DesignColors.accent.gold + '20',
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginTop: DesignSpacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: DesignColors.accent.gold,
  },
  insightText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[800],
    lineHeight: 22,
  },

  // Controls Section
  controlsSection: {
    marginTop: DesignSpacing.xl,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: DesignSpacing.sm,
  },
  controlButton: {
    flex: 1,
  },
  controlHint: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    textAlign: 'center',
    marginTop: DesignSpacing.sm,
  },

  // Investments Section
  investmentsSection: {
    marginTop: DesignSpacing.xl,
  },
  addButton: {
    backgroundColor: DesignColors.primary[500],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
  },
  addButtonText: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: DesignSpacing.xxl,
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: DesignSpacing.md,
  },
  emptyText: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[600],
  },
  emptySubtext: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginTop: 4,
  },

  // Investment Card
  investmentCard: {
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.md,
  },
  investmentCardPaused: {
    opacity: 0.7,
    borderWidth: 1,
    borderColor: DesignColors.semantic.warning.main,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  investmentFund: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fundIcon: {
    fontSize: 32,
    marginRight: DesignSpacing.md,
  },
  fundName: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '600',
  },
  investmentBadges: {
    flexDirection: 'row',
    marginTop: 4,
    gap: DesignSpacing.xs,
  },
  typeBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.round,
  },
  sipBadge: {
    backgroundColor: DesignColors.primary[500] + '30',
  },
  lumpSumBadge: {
    backgroundColor: DesignColors.accent.gold + '30',
  },
  typeBadgeText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[800],
    fontWeight: '600',
    fontSize: 10,
  },
  pausedBadge: {
    backgroundColor: DesignColors.semantic.warning.light,
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 2,
    borderRadius: DesignRadius.round,
  },
  pausedBadgeText: {
    ...DesignTextStyles.caption,
    color: DesignColors.semantic.warning.main,
    fontWeight: '600',
    fontSize: 10,
  },
  investmentDetails: {
    gap: DesignSpacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  detailValue: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
  },
  valueHighlight: {
    color: DesignColors.primary[500],
    fontWeight: '700',
  },
  progressContainer: {
    marginVertical: DesignSpacing.md,
  },
  progressTrack: {
    height: 6,
    backgroundColor: DesignColors.neutral[300],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: DesignColors.primary[500],
    borderRadius: 3,
  },
  investmentActions: {
    flexDirection: 'row',
    gap: DesignSpacing.sm,
    marginTop: DesignSpacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: DesignColors.neutral[200],
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.md,
    alignItems: 'center',
  },
  redeemButton: {
    backgroundColor: DesignColors.semantic.negative.light,
  },
  actionButtonText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[700],
  },

  // Key Learning
  keyLearning: {
    marginTop: DesignSpacing.xl,
  },

  // Education Section
  educationSection: {
    marginTop: DesignSpacing.xl,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: DesignColors.neutral[100],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.md,
  },
  lessonIcon: {
    fontSize: 28,
    marginRight: DesignSpacing.md,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[900],
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
    lineHeight: 18,
  },

  // Navigation Section
  navigationSection: {
    marginTop: DesignSpacing.xl,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: DesignColors.neutral[100],
    borderTopLeftRadius: DesignRadius.xxl,
    borderTopRightRadius: DesignRadius.xxl,
    padding: DesignSpacing.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  modalTitle: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.xs,
  },
  modalSubtitle: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    marginBottom: DesignSpacing.lg,
  },
  closeButton: {
    fontSize: 24,
    color: DesignColors.neutral[500],
  },
  inputGroup: {
    marginBottom: DesignSpacing.md,
  },
  inputLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    marginBottom: DesignSpacing.xs,
  },
  textInput: {
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.md,
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[900],
  },
  inputHint: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginTop: 4,
  },
  previewBox: {
    backgroundColor: DesignColors.primary[50],
    borderRadius: DesignRadius.md,
    padding: DesignSpacing.md,
    marginBottom: DesignSpacing.lg,
    borderWidth: 1,
    borderColor: DesignColors.primary[300],
  },
  previewTitle: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[600],
    marginBottom: DesignSpacing.xs,
  },
  previewText: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[600],
    marginBottom: DesignSpacing.xs,
  },
  previewValue: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.primary[600],
    fontWeight: '700',
  },
  modalButton: {
    marginTop: DesignSpacing.md,
  },

  // Fund Selector
  fundSelector: {
    marginBottom: DesignSpacing.md,
  },
  fundOption: {
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    marginRight: DesignSpacing.sm,
    width: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fundOptionSelected: {
    borderColor: DesignColors.primary[500],
    backgroundColor: DesignColors.primary[50],
  },
  fundOptionIcon: {
    fontSize: 28,
    marginBottom: DesignSpacing.xs,
  },
  fundOptionName: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[800],
    textAlign: 'center',
    marginBottom: 4,
  },
  fundOptionReturn: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.primary[500],
    fontWeight: '600',
  },

  // Type Selector
  typeSelector: {
    flexDirection: 'row',
    gap: DesignSpacing.md,
    marginBottom: DesignSpacing.md,
  },
  typeOption: {
    flex: 1,
    backgroundColor: DesignColors.neutral[200],
    borderRadius: DesignRadius.lg,
    padding: DesignSpacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeOptionSelected: {
    borderColor: DesignColors.primary[500],
    backgroundColor: DesignColors.primary[50],
  },
  typeIcon: {
    fontSize: 24,
    marginBottom: DesignSpacing.xs,
  },
  typeName: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    fontWeight: '600',
  },
  typeDesc: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
});
