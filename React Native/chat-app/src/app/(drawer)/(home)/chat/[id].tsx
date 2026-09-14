import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatHeader } from '@/components/ChatHeader';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageComposer } from '@/components/MessageComposer';
import { useChatMessages } from '@/hooks/useChatMessages';
import type { ChatMessage } from '@/types/ChatMessage';
import { getChatForId } from '@/utils/chatUtils';

export default function ChatScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const listRef = useRef<FlatList<ChatMessage>>(null);

	const chat = getChatForId(id);

	const {
		messages,
		text,
		selectedImage,
		onChangeText,
		onPickImage,
		onRemoveImage,
		onSend,
	} = useChatMessages(chat);

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
			<ChatHeader chat={chat} onBack={() => router.back()} />

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

				<MessageComposer
					text={text}
					onChangeText={onChangeText}
					selectedImage={selectedImage}
					onPickImage={onPickImage}
					onRemoveImage={onRemoveImage}
					onSend={onSend}
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