/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEALTH BUILDER LAB - MAIN INDEX (Redirect to Module Entry)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/module-entry" />;
}
