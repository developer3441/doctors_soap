import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  PermissionsAndroid,
} from "react-native";
import storage from "@react-native-firebase/storage";
import AudioRecord from "react-native-audio-record";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message:
            "This app needs access to your microphone for recording audio.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Microphone permission granted");
      } else {
        console.log("Microphone permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
  };

  useEffect(() => {
    AudioRecord.init(options);
  }, []);

  const startRecording = async () => {
    try {
      await requestMicrophonePermission();
      AudioRecord.start();
      setIsRecording(true);

      const intervalId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);

      clearInterval(intervalId);

      console.log("Recording started");
    } catch (error) {
      console.log("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      const filePath = await AudioRecord.stop();
      setIsRecording(false);
      setRecordingTime(0);

      // Store the recording in Firebase Storage
      const storageRef = storage().ref("recordings/test.mp3");
      await storageRef.putFile(filePath);

      const downloadURL = await storageRef.getDownloadURL();
      console.log("Download URL:", downloadURL);
    } catch (error) {
      console.log("Failed to stop recording", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title={isRecording ? "Stop Recording" : "Start Recording"}
          onPress={isRecording ? stopRecording : startRecording}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
