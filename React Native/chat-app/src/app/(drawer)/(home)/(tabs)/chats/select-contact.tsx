import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ContactListItem } from '@/components/ContactListItem';
import { MOCK_CHATS } from '@/data/mockChats';
import { MOCK_CONTACTS } from '@/data/mockContacts';
import type { Contact } from '@/types/Contact';
import type { ChatSummary } from '@/types/ChatSummary';

export default function SelectContactScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const sortedContacts = useMemo(() => {
    return [...MOCK_CONTACTS].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return sortedContacts;

    return sortedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        (contact.phoneNumber && contact.phoneNumber.toLowerCase().includes(query)) ||
        (contact.status && contact.status.toLowerCase().includes(query))
    );
  }, [searchQuery, sortedContacts]);

  const handleSelectContact = (contact: Contact) => {
    
    const existing = MOCK_CHATS.find((c) => c.id === contact.id);
    if (!existing) {
      const newChat: ChatSummary = {
        id: contact.id,
        name: contact.name,
        avatarUrl: contact.avatarUrl,
        isOnline: contact.isOnline,
        lastMessage: {
          text: '',
          timestamp: '',
          isSentByMe: false,
        },
        unreadCount: 0,
      };
      MOCK_CHATS.unshift(newChat);
    }

    router.push({
      pathname: '/chat/[id]',
      params: { id: contact.id },
    });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color="#9ca3af"
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            onPress={() => handleSelectContact(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery.trim() ? 'No contacts found' : 'No contacts available'}
            </Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  listContent: {
    padding: 15,
    gap: 15,
    flexGrow: 1,
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
