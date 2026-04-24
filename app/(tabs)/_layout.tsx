import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const TabIcon = ({ name, color, size = 24 }: { name: any; color: string; size?: number }) => (
  <Ionicons name={name} color={color} size={size} />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray500,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabIcon name="chatbubble" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gita"
        options={{
          title: 'Gita',
          tabBarIcon: ({ color }) => <TabIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meditate"
        options={{
          title: 'Meditate',
          tabBarIcon: ({ color }) => <TabIcon name="headset" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.gray200,
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
  },
});
