import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { GITA_DATA } from '../../constants/gitaData';

export default function GitaScreen() {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  // Group verses by chapter
  const chapters = Array.from({ length: 18 }, (_, i) => {
    const chapterNum = i + 1;
    const verses = GITA_DATA.filter((v) => v.chapter === chapterNum);
    return {
      title: `Chapter ${chapterNum}`,
      data: verses,
    };
  });

  const renderChapterHeader = ({ section }: { section: any }) => (
    <View style={styles.chapterHeader}>
      <Text style={styles.chapterHeaderText}>{section.title}</Text>
      <Text style={styles.verseCount}>{section.data.length} verses</Text>
    </View>
  );

  const renderVerse = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.verseCard}>
      <View style={styles.verseNumber}>
        <Text style={styles.verseNumberText}>{item.verse}</Text>
      </View>
      <View style={styles.verseContent}>
        <Text style={styles.verseMeaning} numberOfLines={2}>
          {item.meaning}
        </Text>
        {item.transliteration && (
          <Text style={styles.verseTransliteration} numberOfLines={1}>
            {item.transliteration}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bhagavad Gita</Text>
        <Text style={styles.headerSubtitle}>Timeless wisdom in verses</Text>
      </View>

      <SectionList
        sections={chapters}
        keyExtractor={(item) => `${item.chapter}-${item.verse}`}
        renderItem={renderVerse}
        renderSectionHeader={renderChapterHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.saffron,
  },
  chapterHeaderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
  },
  verseCount: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
  },
  verseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  verseNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumberText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: COLORS.white,
  },
  verseContent: {
    flex: 1,
  },
  verseMeaning: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.text,
    lineHeight: 20,
  },
  verseTransliteration: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
    marginTop: 4,
    fontStyle: 'italic',
  },
});
