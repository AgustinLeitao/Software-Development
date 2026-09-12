import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { ChatListItem } from '@/components/ChatListItem';
import { MOCK_CHATS } from '@/data/mockChats';

export default function ChatsPage() {
  const router = useRouter();
  const [chats, setChats] = useState(() => [...MOCK_CHATS]);

  useFocusEffect(
    useCallback(() => {
      setChats([...MOCK_CHATS]);
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            onPress={() => router.push({ pathname: '../../chat/[id]', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 15,
    gap: 15,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 16,
  },
});

