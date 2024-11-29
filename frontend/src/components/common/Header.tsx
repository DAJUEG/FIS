import { Box, Flex, Image, Heading, Spacer } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";
import logo from "../../assets/logo_black.png";

const Header = () => {
  return (
    <Flex align="center" justify="space-between" padding="1.6rem">
      <Box>
        <Image src={logo} alt="Logo" fit="contain" h="2rem" />
      </Box>
      <Spacer />
      <Box>
        <Heading size="md" textAlign={"center"}>
          Dajue Flower Identity System(v0.5)
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Icon fontSize="2rem">
          <IoHomeOutline></IoHomeOutline>
        </Icon>
      </Box>
    </Flex>
  );
};

export default Header;
