/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - TABS LAYOUT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Tab-based navigation for the Wealth Builder Lab module.
 * Dark mode, calm emerald theme throughout.
 */

import { Tabs } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { DesignColors } from '@/components/design-system';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: DesignColors.primary[500],
        tabBarInactiveTintColor: DesignColors.neutral[500],
        tabBarStyle: {
          backgroundColor: DesignColors.neutral[100],
          borderTopColor: DesignColors.neutral[300],
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>📚</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
  },
});
