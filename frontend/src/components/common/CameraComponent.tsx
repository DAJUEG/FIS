import { Box, Button, Flex } from "@chakra-ui/react";
import { FunctionalComponent } from "preact";
import React from "preact/compat";
import { useRef } from "preact/hooks";

interface CameraComponentProps {
  onCapture: (ImageData: string) => void;
}

const CameraComponent: FunctionalComponent<CameraComponentProps> = ({
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Box>
      <Box
        as={"video"}
        ref={videoRef}
        width={"100%"}
        maxW={"20rem"}
        margin={"0 auto"}
        mt={"2rem"}
      ></Box>
      <Flex w={"100%"} justifyContent={"space-around"} mt={"2rem"}>
        <Button
          onClick={() => {
            startCamera(videoRef);
          }}
        >
          open camera
        </Button>

        <Button
          onClick={() => {
            stopCamera(videoRef);
          }}
        >
          stopCamera
        </Button>

        <Button
          onClick={() => {
            capturePhoto(videoRef, canvasRef, onCapture);
          }}
        >
          take photo
        </Button>
      </Flex>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </Box>
  );
};

function stopCamera(videoRef: React.RefObject<HTMLVideoElement>) {
  if (videoRef.current && videoRef.current.srcObject) {
    const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    tracks.forEach((track) => track.stop());
  }
}

function startCamera(videoRef: React.RefObject<HTMLVideoElement>) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    })
    .catch((error) => {
      console.error("can't access the camera,", error);
    });
}

function capturePhoto(
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onCapture: (ImageData: string) => void
) {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (video && canvas) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // create image context
    const context = canvas.getContext("2d");
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      onCapture(imageData);
    }
  }
}

export default CameraComponent;
