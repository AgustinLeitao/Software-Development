export interface ChatMessage {
  id: string;
  name: string;
  avatarUrl?: string;
  lastMessage: {
    text: string;
    timestamp: string;
    isSentByMe: boolean;
    isRead?: boolean;
  };
  unreadCount?: number;
  isOnline?: boolean;
}
