export interface ChatMessage {
	id: string;
	text: string;
	imageUri?: string;
	timestamp: string;
	isSentByMe: boolean;
	isRead: boolean;
}
