import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Crown, Zap, Users, Video } from 'lucide-react-native';

export default function PremiumScreen() {
    const [credits, setCredits] = useState(150);
    
    const features = [
        { id: 1, icon: Video, title: 'Live 3D Companion', description: 'Interactive 3D avatar for conversations', cost: 100 },
        { id: 2, icon: Users, title: 'Premium Community', description: 'Access exclusive support groups', cost: 75 },
        { id: 3, icon: Zap, title: 'Priority Support', description: '24/7 instant AI responses', cost: 50 },
    ];

    const handleUnlock = (cost: number, title: string) => {
        if (credits >= cost) {
            setCredits(prev => prev - cost);
            Alert.alert('Success!', `You have unlocked "${title}".`);
        } else {
            Alert.alert('Insufficient Credits', 'You can earn more credits by completing daily habits.');
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Crown size={32} color="#F472B6" />
          <Text style={styles.title}>Premium Features</Text>
          <Text style={styles.subtitle}>Unlock your full potential with NorthernStar</Text>
        </View>

        <View style={styles.creditsDisplay}>
          <Text style={styles.creditsLabel}>Your Credits</Text>
          <Text style={styles.creditsAmount}>{credits} 💎</Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Premium Experiences</Text>
          {features.map((feature) => (
            <View key={feature.id} style={styles.featureCard}>
              <View style={styles.featureHeader}>
                <feature.icon size={24} color="#60A5FA" />
                <View style={styles.featureInfo}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
              <View style={styles.featureFooter}>
                <Text style={styles.creditsCost}>{feature.cost} credits to unlock</Text>
                <TouchableOpacity style={styles.unlockButton} onPress={() => handleUnlock(feature.cost, feature.title)}>
                  <Text style={styles.unlockButtonText}>Unlock</Text>
                </TouchableOpacity>
              </View>
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
  header: { alignItems: 'center', marginTop: 16, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginTop: 12 },
  subtitle: { fontSize: 16, color: '#9CA3AF', textAlign: 'center' },
  creditsDisplay: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20,
    alignItems: 'center', marginBottom: 24, elevation: 2,
  },
  creditsLabel: { fontSize: 14, color: '#9CA3AF', marginBottom: 8 },
  creditsAmount: { fontSize: 32, fontWeight: 'bold', color: '#EC4899' },
  featuresSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  featureCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 2 },
  featureHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  featureInfo: { marginLeft: 16, flex: 1 },
  featureTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 4 },
  featureDescription: { fontSize: 14, color: '#9CA3AF', lineHeight: 20 },
  featureFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  creditsCost: { fontSize: 14, color: '#9CA3AF' },
  unlockButton: { backgroundColor: '#60A5FA', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  unlockButtonText: { fontSize: 14, fontWeight: '600', color: '#F9FAFB' },
});