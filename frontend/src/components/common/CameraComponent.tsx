import { Box, Button, Flex } from "@chakra-ui/react";
import { FunctionalComponent } from "preact";
import {
  stopCamera,
  startCamera,
  capturePhoto,
} from "../../utils/cameraFunctions";
import { useRef, useState } from "preact/hooks";

interface CameraComponentProps {
  onCapture: (ImageData: string) => void;
}

const CameraComponent: FunctionalComponent<CameraComponentProps> = ({
  onCapture,
}) => {
  const [isCameraOn, setIsCameraOn] = useState(false);

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
      <Flex w={"100%"} justifyContent={"center"} mt={"2rem"}>
        <Button
          onClick={() => {
            if (isCameraOn) {
              stopCamera(videoRef);
            } else {
              startCamera(videoRef);
            }
            setIsCameraOn(!isCameraOn);
          }}
        >
          {isCameraOn ? "Stop Camera" : "Star Camera"}
        </Button>
        <Box width={"2rem"}></Box>
        <Button
          onClick={() => {
            capturePhoto(videoRef, canvasRef, onCapture);
          }}
          colorPalette={"blue"}
        >
          take photo
        </Button>
      </Flex>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </Box>
  );
};

export default CameraComponent;
