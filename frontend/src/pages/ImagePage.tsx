import { Box, Center, Heading, Input } from "@chakra-ui/react";
import { FunctionalComponent } from "preact";
import { RiImageAddLine } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";
import { useRef, useState } from "preact/hooks";
import React from "preact/compat";

interface ImagePageProp {
  path?: string;
}

const ImagePage: FunctionalComponent<ImagePageProp> = () => {
  
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <Box>
      <Center mt={"4rem"}>
        <Heading>Please press button for upload image</Heading>
      </Center>
      <Center mt={"4rem"} cursor={"pointer"}>
        <Icon
          fontSize="6rem"
          onClick={() => {
            handleClick();
          }}
        >
          <RiImageAddLine />
        </Icon>
        <Input
          display={"none"}
          type="file"
          accept={"image/*"}
          ref={fileInputRef}
          onChange={(e) => {
            handleFileChange(e);
          }}
        ></Input>
      </Center>
    </Box>
  );
};

export default ImagePage;
