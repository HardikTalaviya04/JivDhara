import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Modal, ScrollView } from 'react-native';
import { chapters, Chapter, getVersesByChapter, Verse } from '../data/gita';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LibraryScreen() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterVerses, setChapterVerses] = useState<Verse[]>([]);

  const handleChapterPress = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setChapterVerses(getVersesByChapter(chapter.id));
  };

  const renderChapterItem = ({ item }: { item: Chapter }) => (
    <TouchableOpacity style={styles.chapterCard} onPress={() => handleChapterPress(item)}>
      <View style={styles.chapterHeaderRow}>
        <Text style={styles.chapterId}>Chapter {item.id}</Text>
        <Text style={styles.verseCount}>{item.verseCount} Verses</Text>
      </View>
      <Text style={styles.chapterTitle}>{item.title}</Text>
      <Text style={styles.chapterSanskrit}>{item.sanskritTitle}</Text>
      <Text style={styles.chapterDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gita Library</Text>
        <Text style={styles.headerSubtitle}>All 18 Chapters</Text>
      </View>

      <FlatList
        data={chapters}
        renderItem={renderChapterItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      {/* Modal for viewing verses of a selected chapter */}
      <Modal
        visible={selectedChapter !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedChapter(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedChapter(null)} style={styles.closeButton}>
              <FontAwesome5 name="times" size={24} color="#F59E0B" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Chapter {selectedChapter?.id}</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={styles.versesContainer}>
            {chapterVerses.length > 0 ? (
              chapterVerses.map((verse, index) => (
                <View key={index} style={styles.verseCard}>
                  <Text style={styles.verseNumber}>Verse {verse.verse}</Text>
                  <Text style={styles.sanskrit}>{verse.sanskrit}</Text>
                  <Text style={styles.translation}>{verse.translation}</Text>
                  <View style={styles.meaningContainer}>
                    <FontAwesome5 name="lightbulb" size={16} color="#F59E0B" style={{marginRight: 8}} />
                    <Text style={styles.meaning}>{verse.meaning}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <FontAwesome5 name="book-open" size={48} color="#374151" style={{marginBottom: 16}} />
                <Text style={styles.emptyText}>Verses for this chapter are not yet loaded in this demo version.</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  chapterCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chapterHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chapterId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F59E0B',
    textTransform: 'uppercase',
  },
  verseCount: {
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 4,
  },
  chapterSanskrit: {
    fontSize: 16,
    color: '#D1D5DB',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  chapterDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#111827',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  versesContainer: {
    padding: 16,
  },
  verseCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  verseNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 12,
    textAlign: 'center',
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
    marginBottom: 16,
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  }
});
