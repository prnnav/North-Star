import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Users, Bot, Brain, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  console.log("--- DASHBOARD SCREEN LOADED --- THIS IS A TEST LOG ---"); 
  
  const router = useRouter();
  const progressPercentage = 65;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Alex!</Text>
          <Text style={styles.subGreeting}>Ready to shine today? ⭐</Text>
        </View>

        <View style={styles.creditsCard}>
          <View style={styles.creditsInfo}>
            <Text style={styles.creditsCount}>150 💎</Text>
            <Text style={styles.creditsLabel}>Credits</Text>
          </View>
          <TouchableOpacity style={styles.earnMoreButton} onPress={() => router.push('/premium')}>
            <Text style={styles.earnMoreText}>Earn More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.focusSection}>
          <Text style={styles.sectionTitle}>Today's Focus</Text>
          <View style={styles.progressContainer}>
            <View style={styles.circularProgress}>
              <Text style={styles.progressText}>{progressPercentage}%</Text>
            </View>
            <View style={styles.habitInfo}>
              <Text style={styles.habitText}>Morning Meditation</Text>
              <Text style={styles.habitSubtext}>15 min daily practice</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <View style={styles.cardsRow}>
            <TouchableOpacity style={styles.navCard} onPress={() => router.push('/journey')}>
              <TrendingUp size={24} color="#60A5FA" />
              <Text style={styles.cardTitle}>My Journey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navCard} onPress={() => router.push('/connect')}>
              <Users size={24} color="#60A5FA" />
              <Text style={styles.cardTitle}>Community</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.fullWidthCard} onPress={() => router.push('/interact')}>
            <Bot size={24} color="#60A5FA" />
            <View style={{marginLeft: 15}}>
              <Text style={styles.cardTitleFull}>AI Companion</Text>
              <Text style={styles.cardSubtitle}>Chat with NorthernStar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { marginTop: 16, marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#1F2937' },
  subGreeting: { fontSize: 16, color: '#6B7280' },
  creditsCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
  },
  creditsInfo: { flex: 1 },
  creditsCount: { fontSize: 24, fontWeight: 'bold', color: '#F472B6', marginBottom: 4 },
  creditsLabel: { fontSize: 14, color: '#1F2937' },
  earnMoreButton: { backgroundColor: '#60A5FA', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  earnMoreText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
  focusSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  progressContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
  },
  circularProgress: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', marginRight: 20,
    backgroundColor: '#F3F4F6'
  },
  progressText: { fontSize: 18, fontWeight: 'bold', color: '#60A5FA' },
  habitInfo: { flex: 1 },
  habitText: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  habitSubtext: { fontSize: 14, color: '#6B7280' },
  cardsSection: { marginBottom: 32 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  navCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20,
    flex: 1, marginHorizontal: 4, alignItems: 'center', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
  },
  fullWidthCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginTop: 8 },
  cardTitleFull: { fontSize: 18, fontWeight: '600', color: '#1F2937' },
  cardSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});