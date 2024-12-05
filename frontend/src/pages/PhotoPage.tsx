import { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CameraComponent from "../components/common/CameraComponent";
import { submitData } from "../utils/uploadPhoto";
import {
  Box,
  Heading,
  Image,
  Center,
  Stack,
  createListCollection,
  List,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Toaster, toaster } from "@/components/ui/toaster";

interface SelectComponentProps {
  setOrgan: (organ: string) => void;
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

interface PhotoPageProp {
  path?: string;
}

const PhotoPage: FunctionalComponent<PhotoPageProp> = () => {
  const [imageData, setImageData] = useState(null);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const [submitButtonstatus, setSubmitButtonstatus] = useState<boolean>(false);
  const [organ, setOrgan] = useState("flower");

  const [, setCopied] = useState(false);

  const handleCapture = (data: any) => {
    setImageData(data);
  };

  return (
    <Box>
      <Heading textAlign={"center"} mt={"2rem"} size={"5xl"}>
        Please Open Camera <Toaster />
      </Heading>

      <CameraComponent onCapture={handleCapture} />

      <Box w={"100%"} h={".1rem"} bgColor={"black"} m={"2rem 0rem"} />

      {imageData == null ? (
        <Box>
          <Heading textAlign={"center"}>Result:</Heading>
        </Box>
      ) : (
        <Box mb={"2rem"}>
          <Heading size={"5xl"} textAlign={"center"}>
            Photo Result
          </Heading>

          <Image
            src={imageData}
            alt="Captured"
            widows={"100%"}
            maxW={"20rem"}
            margin={"0 auto"}
            mt={"2rem"}
            mb={"2rem"}
          />

          <Box>
            <Center>
              <SelectConponent setOrgan={setOrgan}></SelectConponent>
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
                    imageData,
                    organ,
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

      <Box w={"100%"} h={".1rem"} bgColor={"black"} m={"2rem 0rem"} />

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
  );
};

const frameworks = createListCollection({
  items: [
    { label: "🌷 Flower", value: "flower" },
    { label: "🍀 Leaf", value: "leaf" },
    { label: "🍓 Fruit", value: "fruit" },
    { label: "🌴 Bark", value: "bark" },
  ],
});

const SelectConponent: FunctionalComponent<SelectComponentProps> = ({
  setOrgan,
}) => {
  return (
    <Stack gap="5" width="320px">
      <SelectRoot collection={frameworks} size={"xs"}>
        <SelectLabel fontSize={"sm"}>Choose an organ </SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="🌷 Flower" />
        </SelectTrigger>
        <SelectContent>
          {frameworks.items.map((plant) => (
            <SelectItem
              item={plant}
              key={plant.value}
              onClick={() => {
                setOrgan(plant.value);
              }}
            >
              {plant.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  );
};

export default PhotoPage;
