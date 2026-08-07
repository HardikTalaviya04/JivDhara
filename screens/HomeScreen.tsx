import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getRandomVerse, Verse } from '../data/gita';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<any, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    setVerse(getRandomVerse());
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>JivDhara</Text>
        <Text style={styles.headerSubtitle}>Divine Wisdom for Modern Life</Text>
      </View>

      {verse && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Verse of the Day</Text>
          <Text style={styles.chapterVerse}>Chapter {verse.chapter}, Verse {verse.verse}</Text>
          <Text style={styles.sanskrit}>{verse.sanskrit}</Text>
          <Text style={styles.translation}>{verse.translation}</Text>

          <View style={styles.meaningContainer}>
            <FontAwesome5 name="lightbulb" size={16} color="#F59E0B" style={{marginRight: 8}} />
            <Text style={styles.meaning}>{verse.meaning}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('Chat')}
      >
        <FontAwesome5 name="om" size={24} color="#1F2937" style={{marginRight: 10}} />
        <Text style={styles.aiButtonText}>Ask AI Krishna</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#111827',
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F59E0B', // Gold/Orange
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  chapterVerse: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
  },
  sanskrit: {
    fontSize: 18,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  translation: {
    fontSize: 16,
    color: '#D1D5DB',
    lineHeight: 24,
    marginBottom: 20,
  },
  meaningContainer: {
    flexDirection: 'row',
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  meaning: {
    fontSize: 14,
    color: '#F3F4F6',
    flex: 1,
    lineHeight: 20,
  },
  aiButton: {
    flexDirection: 'row',
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    marginTop: 40,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  aiButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});
