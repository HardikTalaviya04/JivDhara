import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

interface ChatBubbleProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'ai';
  };
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';

  return (
    <Animated.View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.aiContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            isUser ? styles.userText : styles.aiText,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  aiContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: width * 0.85,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: COLORS.gray100,
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  userText: {
    color: COLORS.white,
  },
  aiText: {
    color: COLORS.text,
  },
});
