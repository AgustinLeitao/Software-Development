import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
	Alert,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelHeader } from '@/components/ChannelHeader';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageInput } from '@/components/MessageInput';
import { MOCK_CHATS } from '@/data/mockChats';
import { MOCK_CONTACTS } from '@/data/mockContacts';
import { MOCK_MESSAGES, MockMessage } from '@/data/mockMessages';

function now(): string {
	return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChannelScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();

	const contact = MOCK_CONTACTS.find((item) => item.id === id);
	let chat = MOCK_CHATS.find((item) => item.id === id);

	if (!chat && contact) {
		chat = {
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

	const initialMessages: MockMessage[] = chat
		? (MOCK_MESSAGES[chat.id] ?? (
			chat.lastMessage.text
				? [
					{
						id: `${chat.id}-last-message`,
						...chat.lastMessage,
						isRead: chat.lastMessage.isRead ?? true,
					},
				]
				: []
		))
		: [];

	const [messages, setMessages] = useState<MockMessage[]>(initialMessages);
	const [text, setText] = useState('');
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const listRef = useRef<FlatList<MockMessage>>(null);

	const handleSend = useCallback(() => {
		const trimmed = text.trim();
		if (!trimmed && !selectedImage) return;

		const msgTimestamp = now();
		const newMsg: MockMessage = {
			id: `local-${Date.now()}`,
			text: trimmed,
			imageUri: selectedImage ?? undefined,
			timestamp: msgTimestamp,
			isSentByMe: true,
			isRead: false,
		};

		setMessages((prev) => [...prev, newMsg]);
		setText('');
		setSelectedImage(null);

		if (chat) {
			if (!MOCK_MESSAGES[chat.id]) {
				MOCK_MESSAGES[chat.id] = [];
			}
			MOCK_MESSAGES[chat.id].push(newMsg);

			const previewText = trimmed || '📷 Photo';
			const chatIndex = MOCK_CHATS.findIndex((c) => c.id === chat.id);

			if (chatIndex !== -1) {
				MOCK_CHATS[chatIndex].lastMessage = {
					text: previewText,
					timestamp: msgTimestamp,
					isSentByMe: true,
					isRead: true,
				};
				const [updated] = MOCK_CHATS.splice(chatIndex, 1);
				MOCK_CHATS.unshift(updated);
			} else {
				MOCK_CHATS.unshift({
					id: chat.id,
					name: chat.name,
					avatarUrl: chat.avatarUrl,
					isOnline: chat.isOnline,
					lastMessage: {
						text: previewText,
						timestamp: msgTimestamp,
						isSentByMe: true,
						isRead: true,
					},
					unreadCount: 0,
				});
			}
		}

		setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
	}, [text, selectedImage, chat]);

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

	if (!chat) {
		return (
			<SafeAreaView style={styles.centered}>
				<Text style={styles.notFoundText}>Chat not found</Text>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<Text style={styles.backButtonText}>Go back</Text>
				</Pressable>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<ChannelHeader chat={chat} onBack={() => router.back()} />

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={0}
			>
				<FlatList
					ref={listRef}
					data={messages}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.messages}
					onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
					renderItem={({ item }) => <MessageBubble item={item} />}
					ListEmptyComponent={
						<View style={styles.emptyMessagesContainer}>
							<View style={styles.emptyIconCircle}>
								<Ionicons name="chatbubble-ellipses" size={36} color="#25D366" />
							</View>
							<Text style={styles.emptyMessagesTitle}>No messages yet</Text>
							<Text style={styles.emptyMessagesSubtitle}>
								Send a message or photo to start chatting with {chat.name}!
							</Text>
						</View>
					}
				/>

				<MessageInput
					text={text}
					onChangeText={setText}
					selectedImage={selectedImage}
					onPickImage={handlePickImage}
					onRemoveImage={handleRemoveImage}
					onSend={handleSend}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	safeArea: { flex: 1, backgroundColor: '#f8fafc' },
	centered: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' },
	notFoundText: { color: '#111827', fontSize: 18, marginBottom: 16 },
	backButton: { backgroundColor: '#25D366', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
	backButtonText: { color: '#ffffff', fontWeight: '600' },
	messages: { flexGrow: 1, justifyContent: 'flex-end', padding: 16, gap: 10 },
	emptyMessagesContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 60,
		paddingHorizontal: 24,
	},
	emptyIconCircle: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: '#eafaf1',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},
	emptyMessagesTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#1f2937',
		marginBottom: 8,
	},
	emptyMessagesSubtitle: {
		fontSize: 14,
		color: '#6b7280',
		textAlign: 'center',
		lineHeight: 20,
	},
});