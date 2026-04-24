import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientButtonProps {
  title: string;
  colors: string[];
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function GradientButton({
  title,
  colors,
  onPress,
  style,
  disabled = false,
}: GradientButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={style}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, disabled && styles.disabled]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
});
