import { Box } from "@chakra-ui/react";
import { FunctionalComponent } from "preact";

interface HomePageProp {
  path?: string;
}

const HomePath: FunctionalComponent<HomePageProp> = () => {
  return <Box>This is a home page.</Box>;
};

export default HomePath;
