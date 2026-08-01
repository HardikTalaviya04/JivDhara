## 2024-08-01 - SafeAreaView and Text Accessibility in Expo Apps
**Learning:** React Native views by default can overlap with system UI (notches, status bar) making them inaccessible, and basic Text components are not treated as headers by screen readers by default.
**Action:** Always wrap main screen content in `SafeAreaView` on mobile, and apply `accessibilityRole="header"` to primary screen titles.
