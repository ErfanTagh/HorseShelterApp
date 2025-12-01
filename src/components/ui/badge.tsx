import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
}

export function Badge({ children, style, className }: BadgeProps) {
  // Parse className for common patterns (simplified)
  const badgeStyle = className?.includes('bg-emerald')
    ? styles.emerald
    : className?.includes('bg-green')
    ? styles.green 
    : className?.includes('bg-red')
    ? styles.red
    : className?.includes('bg-amber')
    ? styles.amber
    : className?.includes('bg-blue')
    ? styles.blue
    : styles.default;

  // Handle custom style with text color
  const textStyle = style?.color ? { color: style.color } : badgeStyle.text;
  const viewStyle = style?.color ? { ...style, color: undefined } : style;

  return (
    <View style={[styles.badge, badgeStyle, viewStyle]}>
      <Text style={[styles.badgeText, textStyle]} numberOfLines={1}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  default: {
    backgroundColor: '#f3f4f6',
    text: { color: '#374151' },
  },
  green: {
    backgroundColor: '#d1fae5',
    text: { color: '#065f46' },
  },
  emerald: {
    backgroundColor: '#059669',
    text: { color: '#ffffff' },
  },
  red: {
    backgroundColor: '#fee2e2',
    text: { color: '#991b1b' },
  },
  amber: {
    backgroundColor: '#fef3c7',
    text: { color: '#92400e' },
  },
  blue: {
    backgroundColor: '#dbeafe',
    text: { color: '#1e40af' },
  },
});
