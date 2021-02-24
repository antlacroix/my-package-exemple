import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import * as RNFS from 'react-native-fs';

export enum audioRecorderState {
  readyToRecord,
  recording,
  stoppedRecording,
}

export interface audioRecorderProps {
  audioUUID: string;
  path?: string;
}

interface iAudioRecorder {
  audioUUID: string;
  path?: string;
  fullPath: string;
  recorderState: audioRecorderState;
  audioRecorderPlayer: AudioRecorderPlayer;
  startRecording: () => void;
  stopRecording: () => Promise<string>;
}

class AudioRecorder implements iAudioRecorder {
  recorderState: audioRecorderState;
  audioUUID: string;
  path?: string;
  fullPath: string;
  audioRecorderPlayer: AudioRecorderPlayer;

  constructor(props: audioRecorderProps) {
    this.recorderState = audioRecorderState.readyToRecord;
    this.audioUUID = props.audioUUID;
    if (props.path) {
      this.path = props.path;
    } else {
      this.path = RNFS.DocumentDirectoryPath;
    }
    this.fullPath = this.path + '/audios/' + this.audioUUID + '.mp3';
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  startRecording = async () => {
    this.setRecorderState(audioRecorderState.recording);
    await this.audioRecorderPlayer.startRecorder(this.fullPath);
    this.audioRecorderPlayer.addRecordBackListener((e: any) => {
      return;
    });
  };

  stopRecording = async () => {
    this.setRecorderState(audioRecorderState.stoppedRecording);
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setRecorderState(audioRecorderState.readyToRecord);
    return result;
  };

  private setRecorderState = (newState: audioRecorderState) => {
    this.recorderState = newState;
  };
}

export default AudioRecorder;
