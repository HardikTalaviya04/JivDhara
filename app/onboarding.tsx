import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  emoji: string;
  colors: string[];
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Ask Krishna Anything',
    description: 'Get spiritual guidance inspired by the Bhagavad Gita for any life challenge',
    emoji: '🙏',
    colors: [COLORS.primary, COLORS.primaryDark],
  },
  {
    id: 2,
    title: 'Wisdom from Gita',
    description: 'Explore 700 verses of timeless wisdom with beautiful translations',
    emoji: '📖',
    colors: [COLORS.gold, COLORS.saffron],
  },
  {
    id: 3,
    title: 'Choose Your Language',
    description: 'Available in English, Hindi, and Gujarati for better understanding',
    emoji: '🌍',
    colors: [COLORS.secondary, COLORS.secondaryDark],
  },
];

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = React.useRef<FlatList>(null);

  const handleNext = () => {
    if (currentPage < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentPage + 1,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace('(tabs)/home');
  };

  const handleMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentPage(index);
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      >
        <View style={styles.slideContent}>
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        scrollEnabled
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      />

      {/* Language Selection - Last Slide */}
      {currentPage === SLIDES.length - 1 && (
        <View style={styles.languageContainer}>
          <Text style={styles.languageTitle}>Select Language</Text>
          {['English', 'Hindi', 'Gujarati'].map((lang) => (
            <TouchableOpacity key={lang} style={styles.languageButton}>
              <Text style={styles.languageText}>{lang}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.dotActive : {},
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {currentPage < SLIDES.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={styles.nextButton}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => router.replace('(tabs)/home')}
              style={styles.startButton}
            >
              <Text style={styles.startText}>Start Your Journey</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height * 0.65,
  gradientBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  languageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  languageTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  languageButton: {
    paddingVertical: 12,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray300,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: COLORS.primary,
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
  startButton: {
    flex: 2,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  startText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
});
