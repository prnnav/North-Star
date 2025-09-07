// services/voiceService.ts
import * as Speech from "expo-speech";

export function speakWithEmotion(text: string, emotion: string = "neutral") {
  let pitch = 1.0;
  let rate = 1.0;

  switch (emotion) {
    case "happy": pitch = 1.3; rate = 1.1; break;
    case "sad": pitch = 0.8; rate = 0.9; break;
    case "excited": pitch = 1.4; rate = 1.2; break;
    case "calm": pitch = 0.9; rate = 1.0; break;
    default: pitch = 1.0; rate = 1.0;
  }

  Speech.speak(text, { language: "en-US", pitch, rate });
}