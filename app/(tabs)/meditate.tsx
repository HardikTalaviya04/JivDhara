import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

export default function MeditateScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const meditations = [
    {
      id: 1,
      title: 'Morning Meditation',
      description: 'Start your day with calm',
      duration: '10 min',
      color: [COLORS.primary, COLORS.primaryDark],
    },
    {
      id: 2,
      title: 'Mindfulness',
      description: 'Present moment awareness',
      duration: '15 min',
      color: [COLORS.secondary, COLORS.secondaryDark],
    },
    {
      id: 3,
      title: 'Sleep Meditation',
      description: 'Peaceful rest tonight',
      duration: '20 min',
      color: [COLORS.gold, COLORS.saffron],
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meditation</Text>
          <Text style={styles.headerSubtitle}>Find inner peace</Text>
        </View>

        {/* Now Playing*/}
        <View style={styles.nowPlayingContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playerGradient}
          >
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.playerContent}>
              <View style={styles.waveform}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.waveBit,
                      {
                        height: isPlaying
                          ? Math.random() * 40 + 10
                          : 20,
                      },
                    ]}
                  />
                ))}
              </View>

              <Text style={styles.playingTitle}>Morning Meditation</Text>
              <Text style={styles.playingDuration}>{formatTime(progress)}</Text>

              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={32}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    { width: `${(progress / 600) * 100}%` },
                  ]}
                />
              </View>
              <View style={styles.timeLabels}>
                <Text style={styles.timeLabel}>{formatTime(progress)}</Text>
                <Text style={styles.timeLabel}>10:00</Text>
              </View>
            </Animated.View>
          </LinearGradient>
        </View>

        {/* Meditation List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guided Meditations</Text>
          {meditations.map((meditation) => (
            <TouchableOpacity
              key={meditation.id}
              style={styles.meditationCard}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={meditation.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.meditationGradient}
              >
                <View style={styles.meditationText}>
                  <Text style={styles.meditationTitle}>{meditation.title}</Text>
                  <Text style={styles.meditationDescription}>{meditation.description}</Text>
                </View>
                <View style={styles.meditationDuration}>
                  <Ionicons name="headset" size={20} color={COLORS.white} />
                  <Text style={styles.meditationDurationText}>{meditation.duration}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meditation Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={24} color={COLORS.primary} />
            <Text style={styles.tipText}>
              Find a quiet space, sit comfortably, and focus on your breath.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="heart" size={24} color={COLORS.primary} />
            <Text style={styles.tipText}>
              Regular meditation reduces stress and improves mental clarity.
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
    marginTop: 2,
  },
  nowPlayingContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  playerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  playerContent: {
    width: '100%',
  },
  waveform: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    marginBottom: 20,
    gap: 2,
  },
  waveBit: {
    width: 3,
    backgroundColor: COLORS.white,
    borderRadius: 2,
    opacity: 0.8,
  },
  playingTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  playingDuration: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
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
  meditationCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  meditationGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  meditationText: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  meditationDescription: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    opacity: 0.9,
  },
  meditationDuration: {
    alignItems: 'center',
    gap: 4,
  },
  meditationDurationText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.blue50,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    lineHeight: 20,
  },
});
