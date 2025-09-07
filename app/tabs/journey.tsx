import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lightbulb, Phone, Star, Play } from 'lucide-react-native';

export default function JourneyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Journey</Text>
          <Text style={styles.subtitle}>Track your progress and milestones</Text>
        </View>

        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Today's Timeline</Text>
          
          <View style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <Lightbulb size={20} color="#F472B6" />
              <Text style={styles.eventTitle}>New Habit Suggestion</Text>
              <Text style={styles.eventTime}>2 hours ago</Text>
            </View>
            <Text style={styles.eventDescription}>Try a 5-minute gratitude practice before bed to improve sleep quality</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.acceptButton} onPress={() => Alert.alert('Habit Added!', 'Gratitude practice has been added to your daily habits.')}>
                <Text style={styles.acceptButtonText}>Accept Habit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.declineButton} onPress={() => Alert.alert('Suggestion Declined', 'No problem, we will suggest something else tomorrow!')}>
                <Text style={styles.declineButtonText}>Not for me</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.eventCard}>
             <View style={styles.eventHeader}>
                <Phone size={20} color="#60A5FA" />
                <Text style={styles.eventTitle}>AI Check-in Call</Text>
                <Text style={styles.eventTime}>4 hours ago</Text>
            </View>
            <Text style={styles.eventDescription}>NorthernStar called to check on your mood and progress</Text>
            <TouchableOpacity style={styles.playButton} onPress={() => Alert.alert('Playing Voicemail...')}>
              <Play size={16} color="#F9FAFB" />
              <Text style={styles.playButtonText}>Listen to Recording</Text>
            </TouchableOpacity>
          </View>
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
  timelineSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  eventCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
  },
  eventHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eventTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginLeft: 12, flex: 1 },
  eventTime: { fontSize: 12, color: '#6B7280' },
  eventDescription: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 16 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  acceptButton: { backgroundColor: '#34D399', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, flex: 1 },
  acceptButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF', textAlign: 'center' },
  declineButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', flex: 1 },
  declineButtonText: { fontSize: 14, fontWeight: '600', color: '#6B7280', textAlign: 'center' },
  playButton: {
    backgroundColor: '#60A5FA', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  playButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});