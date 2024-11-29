import { useState } from "preact/hooks";
import CameraComponent from "./components/common/CameraComponent";
import uploadPhoto from "./utils/uploadPhoto";
import { Box, Heading, Image, Spinner } from "@chakra-ui/react";

const App = () => {
  const [imageData, setImageData] = useState(null);

  const handleCapture = (data: any) => {
    setImageData(data);
    uploadPhoto(data);
  };

  return (
    <Box>
      <Heading textAlign={"center"} mt={"2rem"} size={"5xl"}>
        Camera Function Page
      </Heading>
      <CameraComponent onCapture={handleCapture} />

      <Box w={"100%"} h={".1rem"} bgColor={"black"} m={"2rem 0rem"} />

      {imageData == null ? (
        <Spinner />
      ) : (
        <Box>
          <Heading size={"3xl"} textAlign={"center"}>
            Analysis :
          </Heading>
          <Image
            src={imageData}
            alt="Captured"
            widows={"100%"}
            maxW={"20rem"}
            margin={"0 auto"}
            mt={"2rem"}
          />
        </Box>
      )}
    </Box>
  );
};

export default App;
