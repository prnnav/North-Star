import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Phone, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { askAI } from '../../services/aiService';

type Message = { id: string; text: string; sender: 'user' | 'ai'; time: string; };

export default function InteractScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm NorthernStar. Ready to talk, or would you prefer to type?",
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [message, setMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const getAIResponse = async (inputText: string) => {
    setIsAiTyping(true);
    const aiResponseData = await askAI(inputText);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseData.text,
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsAiTyping(false);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, userMessage]);
      getAIResponse(message.trim());
      setMessage('');
    }
  };
  
  const sendQuickAction = (text: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: text,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, userMessage]);
      getAIResponse(text);
  };
  
  const handleStartCall = () => {
      console.log("Call button pressed in interact.tsx. Navigating to /calling..."); // <-- DEBUGGING LOG
      router.push('/calling');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Star size={24} color="#60A5FA" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>NorthernStar</Text>
              <View style={styles.statusRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.statusText}>Always here for you</Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesContainer} 
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[
              styles.messageWrapper,
              msg.sender === 'user' ? styles.userMessageWrapper : styles.aiMessageWrapper
            ]}>
              <View style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userMessage : styles.aiMessage
              ]}>
                <Text style={styles.messageText}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  msg.sender === 'user' ? styles.userMessageTime : styles.aiMessageTime
                ]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
           {isAiTyping && (
            <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
                <View style={[styles.messageBubble, styles.aiMessage]}>
                    <Text style={styles.messageText}>Typing...</Text>
                </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.composerContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
              placeholder="Say something..."
              placeholderTextColor="#6B7280"
              multiline
            />
            <TouchableOpacity 
                style={styles.callButton}
                onPress={handleStartCall}
            >
              <Phone size={20} color={"#FFFFFF"} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => sendQuickAction("I'm feeling anxious")}>
              <Text style={styles.quickActionText}>I'm feeling anxious</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => sendQuickAction("Need motivation")}>
              <Text style={styles.quickActionText}>Need motivation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => sendQuickAction("Feeling grateful")}>
              <Text style={styles.quickActionText}>Feeling grateful</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionButton} onPress={() => sendQuickAction("Share a win")}>
              <Text style={styles.quickActionText}>Share a win</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  keyboardView: { flex: 1 },
  header: {
    padding: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  profileCard: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399', marginRight: 8 },
  statusText: { fontSize: 12, color: '#34D399' },
  messagesContainer: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  messageWrapper: { marginBottom: 16 },
  userMessageWrapper: { alignItems: 'flex-end' },
  aiMessageWrapper: { alignItems: 'flex-start' },
  messageBubble: { maxWidth: '80%', borderRadius: 20, padding: 16 },
  userMessage: { backgroundColor: '#E5E7EB', borderBottomRightRadius: 8 },
  aiMessage: {
    backgroundColor: '#FFFFFF', borderBottomLeftRadius: 8, borderWidth: 1, borderColor: '#E5E7EB',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1,
  },
  messageText: { fontSize: 16, lineHeight: 22, marginBottom: 6, color: '#1F2937' },
  messageTime: { fontSize: 11, color: '#6B7280' },
  userMessageTime: { textAlign: 'right' },
  aiMessageTime: { textAlign: 'left' },
  composerContainer: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#FFFFFF', borderRadius: 24,
    borderWidth: 1, borderColor: '#E5E7EB', padding: 8, marginBottom: 12,
  },
  textInput: { flex: 1, fontSize: 16, color: '#1F2937', maxHeight: 100, minHeight: 24, paddingHorizontal: 8 },
  callButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#34D399',
    justifyContent: 'center', alignItems: 'center', marginLeft: 12, marginRight: 8,
  },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center' },
  sendButtonActive: { backgroundColor: '#60A5FA' },
  quickActions: { flexDirection: 'row' },
  quickActionButton: { backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, marginRight: 12 },
  quickActionText: { fontSize: 14, color: '#6B7280' },
});