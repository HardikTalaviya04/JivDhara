import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { GITA_DATA } from '../../constants/gitaData';
import Card from '../../components/Card';
import GradientButton from '../../components/GradientButton';
import { useChatStore } from '../../store/chatStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [dailyShloka, setDailyShloka] = useState(GITA_DATA[0]);
  const [greeting, setGreeting] = useState('Good Morning');
  const { messageCount } = useChatStore();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // Random daily shloka
    const randomIndex = Math.floor(Math.random() * GITA_DATA.length);
    setDailyShloka(GITA_DATA[randomIndex]);
  }, []);

  const moods = [
    { id: 1, label: 'Stressed', emoji: '😞', icon: 'sad' },
    { id: 2, label: 'Anxious', emoji: '😰', icon: 'alert-circle' },
    { id: 3, label: 'Confused', emoji: '🤯', icon: 'help-circle' },
    { id: 4, label: 'Motivated', emoji: '🚀', icon: 'rocket' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}, Seeker 🙏</Text>
            <Text style={styles.subGreeting}>What\'s on your mind today?</Text>
          </View>
          <Ionicons name="notifications" size={28} color={COLORS.primary} />
        </View>

        {/* Daily Shloka Card */}
        <Card style={styles.shlokaCard}>
          <LinearGradient
            colors={[COLORS.saffron, COLORS.gold]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBg}
          >
            <View style={styles.shlokaContent}>
              <Text style={styles.shlokaLabel}>Today\'s Wisdom</Text>
              <Text style={styles.shlokaText}>{dailyShloka.meaning}</Text>
              <Text style={styles.shlokaReference}>
                Bhagavad Gita {dailyShloka.chapter}.{dailyShloka.verse}
              </Text>
            </View>
          </LinearGradient>
        </Card>

        {/* Mood Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity key={mood.id} style={styles.moodButton}>
                <View style={styles.moodEmoji}>{mood.emoji}</View>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <GradientButton
            title="💬 Ask Krishna"
            colors={[COLORS.primary, COLORS.primaryDark]}
            onPress={() => {}}
            style={styles.actionButton}
          />
          <GradientButton
            title="🎧 Listen to Wisdom"
            colors={[COLORS.gold, COLORS.saffron]}
            onPress={() => {}}
            style={styles.actionButton}
          />
          <GradientButton
            title="📿 Daily Karma Task"
            colors={[COLORS.secondary, COLORS.secondaryDark]}
            onPress={() => {}}
            style={styles.actionButton}
          />
        </View>

        {/* Message Count */}
        <View style={styles.messageCountCard}>
          <Text style={styles.messageCountText}>
            Messages today: {messageCount}/10 (Free Tier)
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
    marginTop: 4,
  },
  shlokaCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    overflow: 'hidden',
  },
  gradientBg: {
    padding: 20,
  },
  shlokaContent: {
    justifyContent: 'center',
  },
  shlokaLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  shlokaText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
    lineHeight: 24,
    marginBottom: 12,
  },
  shlokaReference: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    opacity: 0.8,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  moodButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: COLORS.gray100,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
    textAlign: 'center',
  },
  actionButton: {
    marginBottom: 12,
  },
  messageCountCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 12,
    backgroundColor: COLORS.blue50,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  messageCountText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
  },
});
