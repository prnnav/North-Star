from flask import Flask, request, jsonify
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment
import wave, json, os

# Force pydub to use your ffmpeg binary
AudioSegment.converter = r"C:\ffmpeg\bin\ffmpeg.exe"

app = Flask(__name__)

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "alive 🚀"})

# Load models once
print("🔄 Loading Vosk models...")
model_en = Model("model-en")
print("✅ English model loaded")

# Convert to wav
def convert_to_wav(file_path):
    try:
        audio = AudioSegment.from_file(file_path)
        audio = audio.set_channels(1).set_sample_width(2).set_frame_rate(16000)
        wav_path = "temp.wav"
        audio.export(wav_path, format="wav")
        print(f"✅ Converted {file_path} → {wav_path}")
        return wav_path
    except Exception as e:
        print("❌ Conversion failed:", e)
        raise

# Transcribe
def transcribe_wav(wav_path):
    try:
        wf = wave.open(wav_path, "rb")
        rec = KaldiRecognizer(model_en, wf.getframerate())
        results = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                results.append(json.loads(rec.Result()))
        results.append(json.loads(rec.FinalResult()))
        text = " ".join([res.get("text", "") for res in results])
        print(f"📝 Transcription: {text}")
        return text
    except Exception as e:
        print("❌ Transcription failed:", e)
        return ""

@app.route("/transcribe", methods=["POST"])
def transcribe():
    print("\n🔔 New request from", request.remote_addr)
    print("Headers:", dict(request.headers))

    if "file" not in request.files:
        print("❌ No file in request")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = "upload_temp" + os.path.splitext(file.filename)[1]
    file.save(file_path)

    print(f"📥 Received file: {file.filename}")
    print(f"➡️ Saved to: {file_path}")
    print(f"📦 Content-Type: {file.content_type}")
    print(f"📏 File size: {os.path.getsize(file_path)} bytes")

    # Convert to WAV
    wav_path = convert_to_wav(file_path)

    # Transcribe
    text = transcribe_wav(wav_path)

    # Cleanup
    try:
        os.remove(file_path)
        os.remove(wav_path)
    except:
        pass

    return jsonify({"text": text.strip(), "language": "en"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
