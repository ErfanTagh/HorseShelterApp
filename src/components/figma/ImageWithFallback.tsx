import React, { useState } from 'react';
import { Image, View, StyleSheet, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ImageWithFallbackProps {
  src?: string;
  alt?: string;
  style?: any;
  className?: string;
}

export function ImageWithFallback({ src, alt, style, className }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setDidError(true);
  };

  if (didError || !src) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <MaterialIcons name="image-not-supported" size={40} color="#9ca3af" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: src }}
      style={[styles.image, style]}
      onError={handleError}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
