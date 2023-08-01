import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeartIconProps {
  onPress: () => void;
  isLiked: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({ onPress, isLiked }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons
        name={isLiked ? 'heart' : 'heart-outline'}
        size={24}
        color={isLiked ? 'red' : 'black'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // top: 10,
    // right: 10,
    // zIndex: 1,
    bottom: 10,
  },
});

export default HeartIcon;
