import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Target } from 'lucide-react-native';

export default function HabitScreen() {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Morning Meditation', completed: true, streak: 7 },
    { id: 2, title: 'Daily Exercise', completed: false, streak: 3 },
    { id: 3, title: 'Read for 30 minutes', completed: true, streak: 12 },
    { id: 4, title: 'Drink 8 glasses of water', completed: false, streak: 5 },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const completedCount = habits.filter(habit => habit.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Daily Habits</Text>
          <Text style={styles.subtitle}>Build consistency, one day at a time</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Text style={styles.progressCount}>{completedCount}/{habits.length}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${(completedCount / habits.length) * 100}%` 
            }]} />
          </View>
        </View>

        <View style={styles.habitsSection}>
          <Text style={styles.sectionTitle}>Your Habits</Text>
          {habits.map((habit) => (
            <View key={habit.id} style={styles.habitCard}>
              <View style={styles.habitContent}>
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitTitle, habit.completed && styles.completedText]}>
                    {habit.title}
                  </Text>
                  <View style={styles.streakContainer}>
                    <Target size={16} color="#60A5FA" />
                    <Text style={styles.streakText}>{habit.streak} day streak</Text>
                  </View>
                </View>
                <Switch
                  value={habit.completed}
                  onValueChange={() => toggleHabit(habit.id)}
                  trackColor={{ false: '#E5E7EB', true: '#60A5FA' }}
                  thumbColor={'#FFFFFF'}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => Alert.alert('Add New Habit', 'This would open a screen to create a new habit.')}>
        <Plus size={24} color="#F9FAFB" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  header: { marginTop: 16, marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937' },
  subtitle: { fontSize: 16, color: '#6B7280' },
  progressCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 24,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
  },
  progressInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  progressTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937' },
  progressCount: { fontSize: 18, fontWeight: 'bold', color: '#60A5FA' },
  progressBar: { height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#60A5FA', borderRadius: 4 },
  habitsSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 },
  habitCard: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
  },
  habitContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  habitInfo: { flex: 1 },
  habitTitle: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8 },
  completedText: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  streakContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  streakText: { fontSize: 12, color: '#6B7280' },
  fab: {
    position: 'absolute', bottom: 24, right: 24, width: 56, height: 56,
    borderRadius: 28, backgroundColor: '#EC4899', justifyContent: 'center',
    alignItems: 'center', elevation: 8,
  },
});