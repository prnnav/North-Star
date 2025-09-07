// components/VoiceButton.tsx
import { Audio } from "expo-av";
import React, { useState } from "react";
import { ActivityIndicator, Platform, Text, TouchableOpacity } from "react-native";
import { useAIChat } from "../hooks/useAIchat";
import axios from "axios";

export default function VoiceButton() {
  const { sendMessage } = useAIChat(true);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 🚀 Use your PC IPv4 here
  const SERVER_URL =
    Platform.OS === "android"
      ? "http://10.170.106.158:5000/transcribe"
      : "http://127.0.0.1:5000/transcribe";

  // Recording options
  const recordingOptions: Audio.RecordingOptions = {
    android: {
      extension: ".3gp",
      outputFormat: 6, // THREE_GPP
      audioEncoder: 3, // AMR_NB
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".caf",
      audioQuality: 0,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: "audio/webm",
      bitsPerSecond: 128000,
    },
  };

  // Upload to Flask
  const uploadRecording = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: Platform.OS === "ios" ? "audio/x-caf" : "audio/3gpp",
        name: Platform.OS === "ios" ? "recording.caf" : "recording.3gp",
      } as any);

      console.log("📤 Uploading to:", SERVER_URL, "file:", uri);

      const response = await axios.post(SERVER_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 15000,
      });

      console.log("✅ STT Response:", response.data);

      if (response.data?.text?.trim()) {
        await sendMessage(response.data.text);
      }
    } catch (err: any) {
      console.error("❌ Upload error:", err.message || err);
    }
  };

  // Start recording
  const handlePressIn = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Microphone permission denied");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(recordingOptions);
      await newRecording.startAsync();
      setRecording(newRecording);
      console.log("🎙️ Recording started");
    } catch (err) {
      console.error("❌ Recording start failed:", err);
    }
  };

  // Stop recording + upload
  const handlePressOut = async () => {
    if (!recording) return;
    try {
      setIsProcessing(true);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("⏹️ Recording stopped at:", uri);
      setRecording(null);

      if (uri) await uploadRecording(uri);
    } catch (err) {
      console.error("❌ Voice chat error:", err);
      setRecording(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isProcessing}
      style={{
        padding: 16,
        backgroundColor: recording ? "#ef4444" : "#2563eb",
        borderRadius: 12,
        alignItems: "center",
      }}
    >
      {isProcessing ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {recording ? "Release to send" : "Hold to talk"}
        </Text>
      )}
    </TouchableOpacity>
  );
}
