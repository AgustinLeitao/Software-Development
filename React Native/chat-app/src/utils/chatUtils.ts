import { MOCK_CHATS } from '@/data/mockChats';
import { MOCK_CONTACTS } from '@/data/mockContacts';
import type { ChatSummary } from '@/types/ChatSummary';

export function getChatForId(id?: string): ChatSummary | undefined {
	const chat = MOCK_CHATS.find((item) => item.id === id);
	if (chat) return chat;

	const contact = MOCK_CONTACTS.find((item) => item.id === id);
	if (!contact) return undefined;

	return {
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
}