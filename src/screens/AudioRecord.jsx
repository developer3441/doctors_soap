// import React, { useState } from "react";
// import { View, Text, Button } from "react-native";
// import AudioRecorderPlayer from "react-native-audio-recorder-player";

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const AudioRecord = () => {
//   const [isRecording, setIsRecording] = useState(false);

//   const startRecording = async () => {
//     const result = await audioRecorderPlayer.startRecorder();
//     if (result === "OK") {
//       setIsRecording(true);
//     }
//   };

//   const stopRecording = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     if (result === "OK") {
//       setIsRecording(false);
//     }
//   };

//   const startPlaying = async () => {
//     const result = await audioRecorderPlayer.startPlayer();
//     if (result === "OK") {
//       // You can specify the audio file path to play here.
//     }
//   };

//   const stopPlaying = async () => {
//     const result = await audioRecorderPlayer.stopPlayer();
//     if (result === "OK") {
//       // Handle stopping audio playback.
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Audio Recorder and Player</Text>
//       {isRecording ? (
//         <Button title="Stop Recording" onPress={stopRecording} />
//       ) : (
//         <Button title="Start Recording" onPress={startRecording} />
//       )}
//       <Button title="Start Playing" onPress={startPlaying} />
//       <Button title="Stop Playing" onPress={stopPlaying} />
//     </View>
//   );
// };

// export default AudioRecord;
