import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage } from '@/types/ChatMessage';

interface ChatListItemProps {
  chat: ChatMessage;
  onPress?: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
  const { name, avatarUrl, lastMessage, unreadCount, isOnline } = chat;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.initialsAvatar]}>
            <Text style={styles.initialsText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        {isOnline && <View style={styles.onlineBadge} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.timestamp, unreadCount ? styles.timestampUnread : null]}>
            {lastMessage.timestamp}
          </Text>
        </View>

        <View style={styles.messageRow}>
          <View style={styles.messagePreviewContainer}>
            {lastMessage.isSentByMe && (
              <Ionicons
                name="checkmark-done"
                size={16}
                color={lastMessage.isRead ? '#34b7f1' : '#8696a0'}
                style={styles.checkIcon}
              />
            )}
            <Text
              style={[
                styles.messageText,
                unreadCount ? styles.messageTextUnread : null,
              ]}
              numberOfLines={1}
            >
              {lastMessage.isSentByMe ? `You: ${lastMessage.text}` : lastMessage.text}
            </Text>
          </View>

          {unreadCount && unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  pressed: {
    backgroundColor: '#f3f4f6',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e5e7eb',
  },
  initialsAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#25D366',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  timestampUnread: {
    color: '#25D366',
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  checkIcon: {
    marginRight: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  messageTextUnread: {
    color: '#111827',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
