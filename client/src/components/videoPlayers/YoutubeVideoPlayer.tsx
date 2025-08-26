import { extractYouTubeID } from "@/src/utils/video/video";
import React from "react";
import { StyleSheet } from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";

const YoutubeVideoPlayer = ({
  videoId,
  videoLink,
  onStateChange,
  playerRef,
}: {
  videoId?: string;
  videoLink?: string;
  onStateChange?: (state: string) => void;
  playerRef?: React.RefObject<YoutubeIframeRef>;
}) => {
  //   const [playing, setPlaying] = useState(false);
  //   const [currentTime, setCurrentTime] = useState(0);
  //   const playerRef = useRef<YoutubeIframeRef | null>(null);

  //   const onStateChange = useCallback((state: string) => {
  //     if (state === "ended") {
  //       setPlaying(false);
  //     }
  //   }, []);

  return (
    <YoutubePlayer
      ref={playerRef}
      height={"100%"}
      //   play={true}
      preventFullScreen={true}
      videoId={videoId ?? extractYouTubeID(videoLink || "")}
      onChangeState={onStateChange}
    />
  );
};

const styles = StyleSheet.create({});

export default YoutubeVideoPlayer;
