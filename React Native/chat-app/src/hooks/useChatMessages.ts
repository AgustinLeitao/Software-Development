import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { MOCK_CHATS } from '@/data/mockChats';
import { MOCK_MESSAGES } from '@/data/mockMessages';
import type { ChatMessage } from '@/types/ChatMessage';
import type { ChatSummary } from '@/types/ChatSummary';

function now(): string {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createLocalMessageId(): string {
	return Crypto.randomUUID();
}

function getInitialMessages(chat?: ChatSummary): ChatMessage[] {
	if (!chat) return [];

	return MOCK_MESSAGES[chat.id] ?? (
		chat.lastMessage.text
			? [{
				id: `${chat.id}-last-message`,
				...chat.lastMessage,
				isRead: chat.lastMessage.isRead ?? true,
			}]
			: []
	);
}

export function useChatMessages(chat?: ChatSummary) {
	const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(chat));
	const [text, setText] = useState('');
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		setMessages(getInitialMessages(chat));
		setText('');
		setSelectedImage(null);
	}, [chat?.id]);

	const handleSend = useCallback(() => {
		if (!chat) return;

		const trimmed = text.trim();
		if (!trimmed && !selectedImage) return;

		const timestamp = now();
		const newMessage: ChatMessage = {
			id: createLocalMessageId(),
			text: trimmed,
			imageUri: selectedImage ?? undefined,
			timestamp,
			isSentByMe: true,
			isRead: false,
		};

		setMessages((previousMessages) => [...previousMessages, newMessage]);
		setText('');
		setSelectedImage(null);

		if (!MOCK_MESSAGES[chat.id]) {
			MOCK_MESSAGES[chat.id] = [];
		}
        
		MOCK_MESSAGES[chat.id].push(newMessage);

		const previewText = trimmed || 'Photo';
		const chatIndex = MOCK_CHATS.findIndex((item) => item.id === chat.id);
		const updatedLastMessage = {
			text: previewText,
			timestamp,
			isSentByMe: true,
			isRead: true,
		};

		if (chatIndex !== -1) {
			MOCK_CHATS[chatIndex].lastMessage = updatedLastMessage;
			const [updatedChat] = MOCK_CHATS.splice(chatIndex, 1);
			MOCK_CHATS.unshift(updatedChat);
			return;
		}

		MOCK_CHATS.unshift({
			...chat,
			lastMessage: updatedLastMessage,
			unreadCount: 0,
		});
	}, [chat, selectedImage, text]);

	const handlePickImage = useCallback(async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission needed', 'Please allow access to your photo library.');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: false,
			quality: 0.85,
		});

		if (!result.canceled && result.assets.length > 0) {
			setSelectedImage(result.assets[0].uri);
		}
	}, []);

	const handleRemoveImage = useCallback(() => setSelectedImage(null), []);

	return {
		messages,
		text,
		selectedImage,
		onChangeText: setText,
		onPickImage: handlePickImage,
		onRemoveImage: handleRemoveImage,
		onSend: handleSend,
	};
}