import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAIResponse } from '../data/gita';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type Props = BottomTabScreenProps<any, 'Chat'>;

export default function ChatScreen({ navigation }: Props) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>AI Krishna Guide</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  chatHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
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
});
