import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useChatStore } from '../../store/chatStore';
import { sendMessageToAIMock } from '../../services/apiService';
import ChatBubble from '../../components/ChatBubble';

const SUGGESTED_PROMPTS = [
  'I feel lost in life',
  'How to handle failure?',
  'How to control anger?',
  'Find inner peace',
];

export default function ChatScreen() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const { messages, addMessage, messageCount } = useChatStore();

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    if (messageCount >= 10) {
      alert('You\'ve reached the daily message limit. Upgrade to Premium!');
      return;
    }

    setInputText('');
    addMessage({ id: Date.now().toString(), text, sender: 'user' });

    setLoading(true);
    try {
      const response = await sendMessageToAIMock(text);
      addMessage({ id: Date.now().toString(), text: response, sender: 'ai' });
      scrollToBottom();
    } catch (error) {
      addMessage({
        id: Date.now().toString(),
        text: 'I apologize, but I encountered an issue. Please try again.',
        sender: 'ai',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <ChatBubble message={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Krishna Wisdom</Text>
        <Text style={styles.headerSubtitle}>Ask anything spiritual</Text>
      </View>

      {messages.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Welcome to Krishna Wisdom</Text>
          <Text style={styles.emptyStateSubtitle}>
            Ask me anything about life, spirituality, or the Bhagavad Gita
          </Text>
          <View style={styles.suggestedPromptsContainer}>
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedPrompt}
                onPress={() => handleSendMessage(prompt)}
              >
                <Text style={styles.suggestedPromptText}>{prompt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask Krishna..."
            placeholderTextColor={COLORS.gray500}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxHeight={100}
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]}
            onPress={() => handleSendMessage(inputText)}
            disabled={loading || !inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gray600,
    textAlign: 'center',
    marginBottom: 24,
  },
  suggestedPromptsContainer: {
    width: '100%',
  },
  suggestedPrompt: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  suggestedPromptText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: COLORS.primary,
  },
  loadingContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
