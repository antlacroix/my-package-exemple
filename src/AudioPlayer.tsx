import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

interface iAudioPlayer {
  isPlaying: boolean;
  play: (path: string) => void;
  stop: () => void;
}

class AudioPlayer implements iAudioPlayer {
  isPlaying: boolean;
  constructor() {
    this.isPlaying = false;
  }
  play = (path: string) => {
    this.isPlaying = true;
    audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position >= e.duration) {
        this.stop();
      }
    });
  };

  stop = () => {
    audioRecorderPlayer
      .stopPlayer()
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        audioRecorderPlayer.removePlayBackListener();
      });
    this.isPlaying = false;
  };
}

export default AudioPlayer;
