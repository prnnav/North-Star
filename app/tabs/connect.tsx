import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Video, Crown } from 'lucide-react-native';

export default function ConnectScreen() {
  const users = [
    { id: 1, name: 'Sarah M.', status: 'Online' },
    { id: 2, name: 'David K.', status: 'Online' },
    { id: 3, name: 'Emma L.', status: 'Offline' },
  ];

  const handleCall = (userName: string, type: 'Voice' | 'Video') => {
    Alert.alert(`Start ${type} Call?`, `Connecting with ${userName} will use 10 credits per minute.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm', onPress: () => Alert.alert('Connecting...') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Connect</Text>
          <Text style={styles.subtitle}>Find your community and support network</Text>
        </View>

        <View style={styles.premiumBanner}>
          <Crown size={24} color="#FFFFFF" />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Premium Connections</Text>
            <Text style={styles.bannerSubtitle}>Unlock unlimited video calls and group sessions</Text>
          </View>
        </View>

        <View style={styles.usersSection}>
          <Text style={styles.sectionTitle}>Community Members</Text>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}><Text style={styles.avatarText}>{user.name.charAt(0)}</Text></View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: user.status === 'Online' ? '#10B981' : '#6B7280' }]} />
                    <Text style={[styles.statusText, { color: user.status === 'Online' ? '#10B981' : '#9CA3AF' }]}>
                      {user.status}
                    </Text>
                  </View>
                </View>
              </View>
              {user.status === 'Online' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.callButton} onPress={() => handleCall(user.name, 'Voice')}>
                    <Phone size={16} color="#F9FAFB" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.videoButton} onPress={() => handleCall(user.name, 'Video')}>
                    <Video size={16} color="#F9FAFB" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { marginTop: 16, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 16, color: '#6B7280' },
  premiumBanner: {
    borderRadius: 16, padding: 20, marginBottom: 24, flexDirection: 'row',
    alignItems: 'center', backgroundColor: '#60A5FA', elevation: 8,
  },
  bannerContent: { marginLeft: 16, flex: 1 },
  bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  bannerSubtitle: { fontSize: 14, color: '#E5E7EB' },
  usersSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  userCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  avatarText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  userDetails: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { fontSize: 12 },
  actionButtons: { flexDirection: 'row', gap: 8 },
  callButton: { backgroundColor: '#34D399', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  videoButton: { backgroundColor: '#34D399', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});