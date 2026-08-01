import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getRandomVerse, getAIResponse, Verse } from './data/gita';

export default function App() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);

  useEffect(() => {
    setVerse(getRandomVerse());
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg = message.trim();
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');

    // Simulate AI delay
    setTimeout(() => {
      const response = getAIResponse(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    }, 800);
  };

  const renderHome = () => (
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
        onPress={() => setShowChat(true)}
      >
        <FontAwesome5 name="om" size={24} color="#1F2937" style={{marginRight: 10}} />
        <Text style={styles.aiButtonText}>Ask AI Krishna</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderChat = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setShowChat(false)} style={styles.backButton}>
          <FontAwesome5 name="arrow-left" size={20} color="#F59E0B" />
        </TouchableOpacity>
        <Text style={styles.chatTitle}>AI Krishna Guide</Text>
        <View style={{width: 20}} />
      </View>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        <View style={styles.aiMessageBubble}>
          <Text style={styles.aiMessageText}>Pranaam! What guidance do you seek today?</Text>
        </View>

        {chatHistory.map((msg, index) => (
          <View
            key={index}
            style={msg.role === 'user' ? styles.userMessageBubble : styles.aiMessageBubble}
          >
            <Text style={msg.role === 'user' ? styles.userMessageText : styles.aiMessageText}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask for guidance..."
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <FontAwesome5 name="paper-plane" size={18} color="#1F2937" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {showChat ? renderChat() : renderHome()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark blue/gray background
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
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
  // Chat Styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    padding: 20,
  },
  aiMessageBubble: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    marginBottom: 16,
    maxWidth: '85%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#374151',
  },
  aiMessageText: {
    color: '#E5E7EB',
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageBubble: {
    backgroundColor: '#F59E0B',
    padding: 16,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    marginBottom: 16,
    maxWidth: '85%',
    alignSelf: 'flex-end',
  },
  userMessageText: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1F2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#374151',
    color: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#F59E0B',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
  },
});