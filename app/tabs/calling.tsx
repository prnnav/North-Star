import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react-native';
import { elevenLabsCallService } from '../../services/elevenLabsCallService';

export default function CallingScreen() {
  const router = useRouter();
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    elevenLabsCallService.initiateCall();
    setStatus('Connected');

    const timerInterval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // This return function is the cleanup that runs when the screen is closed
    return () => {
      clearInterval(timerInterval);
      elevenLabsCallService.endCall();
    };
  }, []); // The empty dependency array means this effect runs only once when the screen mounts

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    router.back(); // Navigates back, which triggers the cleanup in useEffect
  };

  const handleToggleMute = () => {
    setIsMuted(current => {
      const newMutedState = !current;
      if (newMutedState) {
        elevenLabsCallService.muteMicrophone();
      } else {
        elevenLabsCallService.unmuteMicrophone();
      }
      return newMutedState;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.agentName}>NorthernStar AI</Text>
        <Text style={styles.timerText}>{formatTime(callDuration)}</Text>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>NS</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={handleToggleMute}>
          {isMuted ? <MicOff size={30} color="#F472B6" /> : <Mic size={30} color="#FFFFFF" />}
          <Text style={[styles.controlLabel, isMuted && { color: "#F472B6" }]}>
            {isMuted ? 'Muted' : 'Mute'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => setIsSpeaker(!isSpeaker)}>
          <Volume2 size={30} color={isSpeaker ? "#60A5FA" : "#FFFFFF"} />
          <Text style={[styles.controlLabel, isSpeaker && { color: "#60A5FA" }]}>Speaker</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlButton, styles.endCallButton]} onPress={handleEndCall}>
          <PhoneOff size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F2937', justifyContent: 'space-between' },
  infoContainer: { alignItems: 'center', paddingTop: 60 },
  statusText: { color: '#9CA3AF', fontSize: 18, marginBottom: 8 },
  agentName: { color: '#FFFFFF', fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  timerText: { color: '#FFFFFF', fontSize: 20 },
  avatarContainer: { alignItems: 'center', justifyContent: 'center' },
  avatar: {
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#60A5FA',
  },
  avatarText: { color: '#FFFFFF', fontSize: 60, fontWeight: 'bold' },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 60,
  },
  controlButton: { alignItems: 'center', width: 80 },
  controlLabel: { color: '#FFFFFF', marginTop: 10, fontSize: 14 },
  endCallButton: {
    backgroundColor: '#EF4444',
    width: 70, height: 70, borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

