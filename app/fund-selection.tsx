/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - FUND SELECTION SCREEN
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Educational fund explorer to understand different mutual fund types.
 * Not real trading - just learning about fund categories and characteristics.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  DesignColors,
  DesignSpacing,
  DesignTextStyles,
  DesignRadius,
  DesignShadows,
  WBLHeader,
  WBLCard,
  WBLButton,
  WBLInfoBox,
  WBLFundCard,
} from '@/components/design-system';

// Sample mutual funds data for education
const sampleFunds = [
  {
    id: 'equity-large',
    name: 'Nifty 50 Index Fund',
    shortName: 'Nifty 50 Index',
    category: 'index' as const,
    riskLevel: 'moderate' as const,
    nav: 152.34,
    returns1Y: 18.5,
    returns3Y: 14.2,
    returns5Y: 12.8,
    minSIP: 500,
    description: 'Tracks the Nifty 50 index. Great for beginners. Low cost.',
  },
  {
    id: 'equity-flexi',
    name: 'Flexi Cap Growth Fund',
    shortName: 'Flexi Cap Growth',
    category: 'equity' as const,
    riskLevel: 'high' as const,
    nav: 89.67,
    returns1Y: 22.3,
    returns3Y: 17.8,
    returns5Y: 15.2,
    minSIP: 1000,
    description: 'Invests across large, mid, and small cap stocks. Higher risk, higher potential.',
  },
  {
    id: 'hybrid-balanced',
    name: 'Balanced Advantage Fund',
    shortName: 'Balanced Advantage',
    category: 'hybrid' as const,
    riskLevel: 'moderate' as const,
    nav: 67.23,
    returns1Y: 12.5,
    returns3Y: 11.2,
    returns5Y: 10.5,
    minSIP: 500,
    description: 'Mix of equity and debt. Automatically adjusts based on market conditions.',
  },
  {
    id: 'debt-short',
    name: 'Short Duration Debt Fund',
    shortName: 'Short Duration Debt',
    category: 'debt' as const,
    riskLevel: 'low' as const,
    nav: 45.12,
    returns1Y: 7.2,
    returns3Y: 6.8,
    returns5Y: 7.0,
    minSIP: 500,
    description: 'Low risk, stable returns. Good for short-term goals or emergency funds.',
  },
  {
    id: 'liquid',
    name: 'Liquid Fund Ultra',
    shortName: 'Liquid Ultra',
    category: 'liquid' as const,
    riskLevel: 'low' as const,
    nav: 2456.78,
    returns1Y: 6.8,
    returns3Y: 6.2,
    returns5Y: 6.5,
    minSIP: 500,
    description: 'Very low risk. Can withdraw anytime. Good for parking money short-term.',
  },
];

const categoryFilters = [
  { id: 'all', label: 'All', icon: '🏦' },
  { id: 'equity', label: 'Equity', icon: '📈' },
  { id: 'index', label: 'Index', icon: '📊' },
  { id: 'hybrid', label: 'Hybrid', icon: '⚖️' },
  { id: 'debt', label: 'Debt', icon: '🛡️' },
  { id: 'liquid', label: 'Liquid', icon: '💧' },
];

interface FundDetailModalProps {
  fund: typeof sampleFunds[0] | null;
  visible: boolean;
  onClose: () => void;
  onStartSIP: () => void;
}

const FundDetailModal: React.FC<FundDetailModalProps> = ({ fund, visible, onClose, onStartSIP }) => {
  if (!fund) return null;

  const getCategoryInfo = (category: string) => {
    const info = {
      equity: { title: 'Equity Funds', desc: 'Invest primarily in stocks. Higher risk, higher potential returns over long term.' },
      index: { title: 'Index Funds', desc: 'Track market indices like Nifty 50. Low cost, passive investment.' },
      hybrid: { title: 'Hybrid Funds', desc: 'Mix of stocks and bonds. Balanced risk and return.' },
      debt: { title: 'Debt Funds', desc: 'Invest in bonds and fixed income. Lower risk, stable returns.' },
      liquid: { title: 'Liquid Funds', desc: 'Very short-term debt. Almost like savings, easy withdrawal.' },
    };
    return info[category as keyof typeof info] || { title: '', desc: '' };
  };

  const catInfo = getCategoryInfo(fund.category);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{fund.name}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Category Info */}
            <WBLCard variant="learning" style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>{catInfo.title}</Text>
              <Text style={styles.categoryDesc}>{catInfo.desc}</Text>
            </WBLCard>

            {/* Fund Stats */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>NAV</Text>
                <Text style={styles.statValue}>₹{fund.nav}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>1Y Return</Text>
                <Text style={[styles.statValue, { color: DesignColors.primary[500] }]}>
                  +{fund.returns1Y}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>3Y Return</Text>
                <Text style={[styles.statValue, { color: DesignColors.primary[500] }]}>
                  +{fund.returns3Y}%
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Min SIP</Text>
                <Text style={styles.statValue}>₹{fund.minSIP}</Text>
              </View>
            </View>

            {/* Description */}
            <WBLCard variant="outlined" style={styles.descCard}>
              <Text style={styles.descTitle}>About This Fund</Text>
              <Text style={styles.descText}>{fund.description}</Text>
            </WBLCard>

            {/* Educational Note */}
            <WBLInfoBox
              variant="tip"
              icon="🎓"
              title="Learning Note"
              message="This is a sample fund for education. In real life, research thoroughly and consider your goals before investing."
              style={styles.eduNote}
            />

            {/* Actions */}
            <View style={styles.modalActions}>
              <WBLButton
                title="Try SIP Simulation"
                variant="primary"
                size="large"
                fullWidth
                onPress={onStartSIP}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function FundSelectionScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFund, setSelectedFund] = useState<typeof sampleFunds[0] | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredFunds = selectedCategory === 'all'
    ? sampleFunds
    : sampleFunds.filter(f => f.category === selectedCategory);

  const handleFundPress = (fund: typeof sampleFunds[0]) => {
    setSelectedFund(fund);
    setShowDetail(true);
  };

  const handleStartSIP = () => {
    setShowDetail(false);
    router.push('/sip-simulator');
  };

  return (
    <SafeAreaView style={styles.container}>
      <WBLHeader
        title="Explore Funds"
        subtitle="Learn Fund Types"
        variant="default"
        onLeftAction={() => router.back()}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Intro Card */}
        <WBLInfoBox
          variant="info"
          icon="🏦"
          title="Understanding Mutual Funds"
          message="Explore different fund types below. Each has unique characteristics, risk levels, and return potential. Tap any fund to learn more!"
          style={styles.introCard}
        />

        {/* Category Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.filterLabel}>Filter by Type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {categoryFilters.map(filter => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip,
                  selectedCategory === filter.id && styles.filterChipActive,
                ]}
                onPress={() => setSelectedCategory(filter.id)}
              >
                <Text style={styles.filterIcon}>{filter.icon}</Text>
                <Text style={[
                  styles.filterText,
                  selectedCategory === filter.id && styles.filterTextActive,
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Funds List */}
        <View style={styles.fundsSection}>
          <View style={styles.fundsHeader}>
            <Text style={styles.fundsTitle}>
              {selectedCategory === 'all' ? 'All Funds' : categoryFilters.find(f => f.id === selectedCategory)?.label + ' Funds'}
            </Text>
            <Text style={styles.fundsCount}>{filteredFunds.length} funds</Text>
          </View>

          {filteredFunds.map(fund => (
            <WBLFundCard
              key={fund.id}
              name={fund.name}
              shortName={fund.shortName}
              category={fund.category}
              riskLevel={fund.riskLevel}
              nav={fund.nav}
              returns1Y={fund.returns1Y}
              returns3Y={fund.returns3Y}
              returns5Y={fund.returns5Y}
              minSIP={fund.minSIP}
              onPress={() => handleFundPress(fund)}
              style={styles.fundCard}
            />
          ))}
        </View>

        {/* Comparison Reminder */}
        <WBLInfoBox
          variant="compare"
          icon="⚖️"
          title="MF vs Stocks: Key Difference"
          message="With mutual funds, professional managers pick stocks for you. You don't need to analyze individual companies - just choose the right fund type for your goals."
          style={styles.compareBox}
        />

        {/* Risk Levels Explanation */}
        <WBLCard variant="outlined" style={styles.riskCard}>
          <Text style={styles.riskTitle}>Understanding Risk Levels</Text>

          <View style={styles.riskItem}>
            <View style={[styles.riskBadge, { backgroundColor: DesignColors.primary[50] }]}>
              <Text style={[styles.riskBadgeText, { color: DesignColors.primary[500] }]}>Low</Text>
            </View>
            <Text style={styles.riskDesc}>Stable returns, lower growth. Good for short-term goals.</Text>
          </View>

          <View style={styles.riskItem}>
            <View style={[styles.riskBadge, { backgroundColor: DesignColors.semantic.warning.light }]}>
              <Text style={[styles.riskBadgeText, { color: DesignColors.semantic.warning.main }]}>Moderate</Text>
            </View>
            <Text style={styles.riskDesc}>Balanced approach. Medium-term goals (5-10 years).</Text>
          </View>

          <View style={styles.riskItem}>
            <View style={[styles.riskBadge, { backgroundColor: DesignColors.semantic.negative.light }]}>
              <Text style={[styles.riskBadgeText, { color: DesignColors.semantic.negative.main }]}>High</Text>
            </View>
            <Text style={styles.riskDesc}>Higher potential returns, more volatility. Long-term (10+ years).</Text>
          </View>
        </WBLCard>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <WBLButton
            title="Try SIP Simulator"
            variant="primary"
            size="large"
            fullWidth
            onPress={() => router.push('/sip-simulator')}
            leftIcon={<Text style={styles.btnIcon}>🎮</Text>}
          />
        </View>
      </ScrollView>

      {/* Fund Detail Modal */}
      <FundDetailModal
        fund={selectedFund}
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        onStartSIP={handleStartSIP}
      />
    </SafeAreaView>
  );
}

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

  // Intro
  introCard: {
    marginTop: DesignSpacing.md,
  },

  // Filters
  filtersSection: {
    marginTop: DesignSpacing.lg,
  },
  filterLabel: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[700],
    marginBottom: DesignSpacing.sm,
  },
  filtersScroll: {
    paddingRight: DesignSpacing.lg,
    gap: DesignSpacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DesignColors.neutral[200],
    paddingHorizontal: DesignSpacing.md,
    paddingVertical: DesignSpacing.sm,
    borderRadius: DesignRadius.round,
    marginRight: DesignSpacing.sm,
  },
  filterChipActive: {
    backgroundColor: DesignColors.primary[500],
  },
  filterIcon: {
    fontSize: 14,
    marginRight: DesignSpacing.xs,
  },
  filterText: {
    ...DesignTextStyles.labelSmall,
    color: DesignColors.neutral[700],
  },
  filterTextActive: {
    color: DesignColors.neutral[900],
    fontWeight: '700',
  },

  // Funds Section
  fundsSection: {
    marginTop: DesignSpacing.xl,
  },
  fundsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DesignSpacing.md,
  },
  fundsTitle: {
    ...DesignTextStyles.titleMedium,
    color: DesignColors.neutral[900],
  },
  fundsCount: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
  },
  fundCard: {
    marginBottom: DesignSpacing.md,
  },

  // Compare Box
  compareBox: {
    marginTop: DesignSpacing.lg,
  },

  // Risk Card
  riskCard: {
    marginTop: DesignSpacing.lg,
  },
  riskTitle: {
    ...DesignTextStyles.titleSmall,
    color: DesignColors.neutral[900],
    marginBottom: DesignSpacing.md,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.md,
  },
  riskBadge: {
    paddingHorizontal: DesignSpacing.sm,
    paddingVertical: 4,
    borderRadius: DesignRadius.xs,
    marginRight: DesignSpacing.md,
    minWidth: 70,
    alignItems: 'center',
  },
  riskBadgeText: {
    ...DesignTextStyles.labelSmall,
    fontWeight: '700',
  },
  riskDesc: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    flex: 1,
  },

  // Bottom Action
  bottomAction: {
    marginTop: DesignSpacing.xl,
  },
  btnIcon: {
    fontSize: 18,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: DesignColors.neutral[50],
    borderTopLeftRadius: DesignRadius.xl,
    borderTopRightRadius: DesignRadius.xl,
    maxHeight: '85%',
    paddingHorizontal: DesignSpacing.screenPadding,
    paddingTop: DesignSpacing.lg,
    paddingBottom: DesignSpacing.xxxl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: DesignSpacing.lg,
  },
  modalTitle: {
    ...DesignTextStyles.titleLarge,
    color: DesignColors.neutral[900],
    flex: 1,
    marginRight: DesignSpacing.md,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: DesignColors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: DesignColors.neutral[700],
  },
  categoryCard: {
    marginBottom: DesignSpacing.lg,
  },
  categoryTitle: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.accent.purple,
    marginBottom: DesignSpacing.xs,
  },
  categoryDesc: {
    ...DesignTextStyles.bodySmall,
    color: DesignColors.neutral[600],
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: DesignSpacing.lg,
  },
  statItem: {
    width: '50%',
    paddingVertical: DesignSpacing.sm,
  },
  statLabel: {
    ...DesignTextStyles.caption,
    color: DesignColors.neutral[500],
    marginBottom: 2,
  },
  statValue: {
    ...DesignTextStyles.labelLarge,
    color: DesignColors.neutral[900],
  },
  descCard: {
    marginBottom: DesignSpacing.lg,
  },
  descTitle: {
    ...DesignTextStyles.labelMedium,
    color: DesignColors.neutral[800],
    marginBottom: DesignSpacing.xs,
  },
  descText: {
    ...DesignTextStyles.bodyMedium,
    color: DesignColors.neutral[600],
    lineHeight: 22,
  },
  eduNote: {
    marginBottom: DesignSpacing.lg,
  },
  modalActions: {
    marginTop: DesignSpacing.md,
  },
});
