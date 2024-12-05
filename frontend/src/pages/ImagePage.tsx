import { FunctionalComponent } from "preact";
import { Box, Center, Heading, Input, Image, Flex, Badge, List } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { RiImageAddLine } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";
import { useRef, useState } from "preact/hooks";
import React from "preact/compat";
import { submitData } from "../utils/uploadPhoto";
import CopyToClipboard from "react-copy-to-clipboard";
import { toaster } from "@/components/ui/toaster";

interface ImagePageProp {
  path?: string;
}

interface ResultData {
  query: {
    project: string;
    images: string[];
    organs: string[];
    includeRelatedImages: boolean;
    noReject: boolean;
  };
  language: string;
  preferedReferential: string;
  bestMatch: string;
  results: Array<{
    score: number;
    species: {
      scientificNameWithoutAuthor: string;
      scientificNameAuthorship: string;
      genus: {
        scientificNameWithoutAuthor: string;
        scientificNameAuthorship: string;
        scientificName: string;
      };
      family: {
        scientificNameWithoutAuthor: string;
        scientificNameAuthorship: string;
        scientificName: string;
      };
      commonNames: string[];
      scientificName: string;
    };
    gbif: {
      id: string;
    };
    powo: {
      id: string;
    };
  }>;
  version: string;
  remainingIdentificationRequests: number;
}

const ImagePage: FunctionalComponent<ImagePageProp> = () => {
  const [preview, setPreview] = useState<string>("");
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitButtonstatus, setSubmitButtonstatus] = useState<boolean>(false);
  const [, setCopied] = useState(false);

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      <Center mt={"6rem"}>
        <Box>
          {preview && (
            <Image
              src={preview}
              w={"20rem"}
              h={"20rem"}
              objectFit={"contain"}
            />
          )}
        </Box>
      </Center>

      <Box >
        {preview && (
          <Box>
            <Box w={"100%"} h={".1rem"} bgColor={"black"} m={"2rem 0rem"} />

            {/* submmit   */}
            <Box>
              <Center>
                {/* <SelectConponent setOrgan={setOrgan}></SelectConponent> */}
              </Center>
              <Center mt={"1.2rem"}>
                <Button
                  colorPalette={"green"}
                  w={"100%"}
                  loading={submitButtonstatus}
                  loadingText="Please wait"
                  onClick={() => {
                    submitData(
                      setSubmitButtonstatus,
                      preview,
                      "leaf",
                      setResultData
                    );
                  }}
                >
                  Submit
                </Button>
              </Center>
            </Box>
          </Box>
        )}
      </Box>

      <Box mt={"3rem"}>
        {resultData && resultData.results.length > 0 && (
          <Box mb={"2rem"}>
            <Heading textAlign={"center"}>Analysis:</Heading>
            <Flex justifyContent={"center"} mt={"2rem"}>
              <Box>
                {/* Scientific Name */}
                <br />
                <strong>Scientific Name:</strong>{" "}
                {resultData?.results[0]?.species?.scientificName}
                <CopyToClipboard
                  text={resultData?.results[0]?.species?.scientificName}
                  onCopy={() => setCopied(true)}
                >
                  <Badge
                    ml={"1rem"}
                    colorPalette="green"
                    onClick={() => {
                      toaster.create({
                        title: `Copy Success!`,
                        type: "success",
                      });
                    }}
                    _hover={{
                      backgroundColor: "green.500",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </Badge>
                </CopyToClipboard>
                {/* Genus & Family Name */}
                <br />
                <strong>Genus:</strong>
                {resultData?.results[0]?.species?.genus?.scientificName}
                <CopyToClipboard
                  text={resultData?.results[0]?.species?.genus?.scientificName}
                  onCopy={() => setCopied(true)}
                >
                  <Badge
                    ml={"1rem"}
                    colorPalette="green"
                    onClick={() => {
                      toaster.create({
                        title: `Copy Success!`,
                        type: "success",
                      });
                    }}
                    _hover={{
                      backgroundColor: "green.500",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </Badge>
                </CopyToClipboard>
                <br />
                <strong>Family:</strong>{" "}
                {resultData?.results[0]?.species?.family?.scientificName}
                <CopyToClipboard
                  text={resultData?.results[0]?.species?.family?.scientificName}
                  onCopy={() => setCopied(true)}
                >
                  <Badge
                    ml={"1rem"}
                    colorPalette="green"
                    onClick={() => {
                      toaster.create({
                        title: `Copy Success!`,
                        type: "success",
                      });
                    }}
                    _hover={{
                      backgroundColor: "green.500",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </Badge>
                </CopyToClipboard>
                {/* 常见名称 */}
                <br />
                <strong>Common Names:</strong>{" "}
                <List.Root>
                  {resultData?.results[0]?.species?.commonNames?.length > 0
                    ? resultData?.results[0]?.species?.commonNames.map(
                        (name, idx) => (
                          <List.Item key={idx}>
                            {name}
                            <CopyToClipboard
                              text={name}
                              onCopy={() => setCopied(true)}
                            >
                              <Badge
                                ml={"1rem"}
                                colorPalette="green"
                                onClick={() => {
                                  toaster.create({
                                    title: `Copy Success!`,
                                    type: "success",
                                  });
                                }}
                                _hover={{
                                  backgroundColor: "green.500",
                                  color: "white",
                                  cursor: "pointer",
                                }}
                              >
                                Copy
                              </Badge>
                            </CopyToClipboard>
                          </List.Item>
                        )
                      )
                    : "No common names available"}
                </List.Root>
                <br />
                <strong>Image details （GBIF:）</strong>{" "}
                <a
                  href={`https://www.gbif.org/species/${resultData?.results[0]?.gbif?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resultData?.results[0]?.gbif?.id}
                </a>
                <br />
                <strong>Image details （POWO:）</strong>{" "}
                <a
                  href={`http://powo.science.kew.org/taxon/${resultData?.results[0]?.powo?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resultData?.results[0]?.powo?.id}
                </a>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImagePage;
