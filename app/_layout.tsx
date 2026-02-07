import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Wealth Builder Lab - Root Layout
 * Dark mode only for calm, focused wealth learning experience
 */
export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="module-entry" options={{ headerShown: false }} />
        <Stack.Screen name="learn-mode" options={{ headerShown: false }} />
        <Stack.Screen name="growth-chart" options={{ headerShown: false }} />
        <Stack.Screen name="sip-simulator" options={{ headerShown: false }} />
        <Stack.Screen name="fund-selection" options={{ headerShown: false }} />
        <Stack.Screen name="insights" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
