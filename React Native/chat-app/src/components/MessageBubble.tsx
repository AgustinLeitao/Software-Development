import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { ChatMessage } from '@/types/ChatMessage';

export interface MessageBubbleProps {
  item: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({ item }) => {
  const isMine = item.isSentByMe;
  return (
    <View style={[styles.messageBubble, isMine ? styles.sentBubble : styles.receivedBubble]}>
      {item.imageUri ? (
        <Image
          source={{ uri: item.imageUri }}
          style={styles.bubbleImage}
          resizeMode="cover"
        />
      ) : null}
      {item.text ? (
        <Text style={[styles.messageText, isMine && styles.sentMessageText]}>
          {item.text}
        </Text>
      ) : null}
      <Text style={[styles.timestamp, isMine && styles.sentTimestamp]}>{item.timestamp}</Text>
    </View>
  );
});

MessageBubble.displayName = 'MessageBubble';

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '82%',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    borderBottomRightRadius: 4,
  },
  bubbleImage: {
    width: 220,
    height: 160,
    borderRadius: 8,
    marginBottom: 6,
  },
  messageText: {
    color: '#111827',
    fontSize: 15,
    lineHeight: 21,
  },
  sentMessageText: {
    color: '#102a13',
  },
  timestamp: {
    alignSelf: 'flex-end',
    color: '#9ca3af',
    fontSize: 10,
    marginTop: 4,
  },
  sentTimestamp: {
    color: '#5b7d5d',
  },
});

export default MessageBubble;
