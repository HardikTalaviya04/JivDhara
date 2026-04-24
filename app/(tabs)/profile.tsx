import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const languages = ['English', 'Hindi', 'Gujarati'];

  const menuItems = [
    { id: 1, icon: 'settings', label: 'Settings', action: () => {} },
    { id: 2, icon: 'lock-open', label: 'Privacy', action: () => {} },
    { id: 3, icon: 'help-circle', label: 'Help & Support', action: () => {} },
    { id: 4, icon: 'star', label: 'Rate App', action: () => {} },
    { id: 5, icon: 'share-social', label: 'Share', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={40} color={COLORS.white} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Spiritual Seeker</Text>
              <Text style={styles.profileEmail}>seeker@gitaai.app</Text>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>142</Text>
                  <Text style={styles.statLabel}>Messages</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>28</Text>
                  <Text style={styles.statLabel}>Days</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>Premium</Text>
                  <Text style={styles.statLabel}>Status</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Subscription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <LinearGradient
            colors={[COLORS.gold, COLORS.saffron]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.subscriptionCard}
          >
            <View style={styles.subscriptionContent}>
              <Text style={styles.subscriptionTitle}>Premium Member</Text>
              <Text style={styles.subscriptionBenefits}>
                • Unlimited messages
                • Priority support
                • Exclusive content
              </Text>
            </View>
            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Language Setting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Language</Text>
          <View style={styles.languageContainer}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageButton,
                  language === lang && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage(lang)}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    language === lang && styles.languageButtonTextActive,
                  ]}
                >
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={20} color={COLORS.primary} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.gray300, true: COLORS.primary }}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.gray300, true: COLORS.primary }}
            />
          </View>
        </View>

        {/* Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index !== menuItems.length - 1 && styles.menuItemBorder,
              ]}
              onPress={item.action}
            >
              <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.gray400}
                style={styles.menuChevron}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>GitaAI v1.0.0</Text>
          <Text style={styles.footerText}>© 2024 All rights reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileHeader: {
    overflow: 'hidden',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'flex-start',
    gap: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  subscriptionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subscriptionBenefits: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    lineHeight: 18,
  },
  manageButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  manageButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: COLORS.primary,
  },
  languageButtonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: COLORS.gray600,
  },
  languageButtonTextActive: {
    color: COLORS.white,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
  },
  menuChevron: {
    marginLeft: 'auto',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
    marginBottom: 4,
  },
});
