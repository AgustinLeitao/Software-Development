import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';

export interface MessageComposerProps {
  text: string;
  onChangeText: (text: string) => void;
  selectedImage: string | null;
  onPickImage: () => void;
  onRemoveImage: () => void;
  onSend: () => void;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  text,
  onChangeText,
  selectedImage,
  onPickImage,
  onRemoveImage,
  onSend,
}) => {
  const canSend = text.trim().length > 0 || selectedImage !== null;

  return (
    <View>
      {selectedImage && (
        <View style={styles.imagePreviewStrip}>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} resizeMode="cover" />
          <Pressable style={styles.removeImageBtn} onPress={onRemoveImage} hitSlop={8}>
            <Ionicons name="close-circle" size={22} color="#ffffff" />
          </Pressable>
        </View>
      )}

      <View style={styles.composer}>
        <Pressable hitSlop={8} onPress={onPickImage} style={styles.iconBtn}>
          <Ionicons name="image-outline" size={26} color="#6b7280" />
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={onChangeText}
          multiline
          maxLength={2000}
          returnKeyType="default"
        />

        <Pressable
          hitSlop={8}
          onPress={onSend}
          disabled={!canSend}
          style={[styles.iconBtn, styles.sendBtn, !canSend && styles.sendBtnDisabled]}
        >
          <Ionicons name="send" size={20} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreviewStrip: {
    marginHorizontal: 12,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  imagePreview: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  removeImageBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  iconBtn: {},
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    color: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  sendBtnDisabled: {
    backgroundColor: '#a7f3d0',
  },
});

export default MessageComposer;
