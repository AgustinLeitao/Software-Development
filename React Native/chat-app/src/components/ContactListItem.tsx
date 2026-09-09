import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Contact } from '@/types/Contact';

interface ContactListItemProps {
  contact: Contact;
  onPress: () => void;
}

export const ContactListItem: React.FC<ContactListItemProps> = ({ contact, onPress }) => {
  const { name, avatarUrl, status, phoneNumber, isOnline } = contact;

  return (
    <Pressable onPress={onPress} style={styles.container}>
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
          {isOnline && <Text style={styles.onlineText}>online</Text>}
        </View>

        <Text style={styles.status} numberOfLines={1}>
          {status || phoneNumber || 'Hey there! I am using ChatApp'}
        </Text>
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
  onlineText: {
    fontSize: 12,
    color: '#25D366',
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default ContactListItem;

