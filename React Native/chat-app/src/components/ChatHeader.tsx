import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ChatSummary } from '@/types/ChatSummary';

export interface ChatHeaderProps {
  chat: ChatSummary;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} hitSlop={12}>
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </Pressable>
      {
        chat.avatarUrl ? (
          <Image source={{ uri: chat.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.initialsAvatar]}>
            <Text style={styles.initialsText}>{chat.name.charAt(0).toUpperCase()}</Text>
          </View>
        )
      }
      <View style={styles.headerDetails}>
        <Text style={styles.name} numberOfLines={1}>
          {chat.name}
        </Text>
        <Text style={styles.status}>{chat.isOnline ? 'online' : 'offline'}</Text>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  initialsAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  headerDetails: {
    flex: 1,
    gap: 2
  },
  name: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    color: '#6b7280',
    fontSize: 12,
  },
});

export default ChatHeader;
