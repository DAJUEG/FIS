import { Box, Flex, Image, Heading, Spacer } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "preact-router/match";
import { Icon } from "@chakra-ui/react";
import { IoHomeOutline } from "react-icons/io5";
import { CiCamera } from "react-icons/ci";
import { RiImageAddLine } from "react-icons/ri";
import logo from "../../assets/logo_black.png";

const Header = () => {
  return (
    <Flex align="center" justify="space-between" padding="1.6rem">
      <Box>
        <ChakraLink as={Link} href="/">
          <Image src={logo} alt="Logo" fit="contain" h="2rem" />
        </ChakraLink>
      </Box>
      <Spacer />
      <Box>
        <Heading size="md" textAlign={"center"}>
          Dajue Flower Identity System(v0.5)
        </Heading>
      </Box>
      <Spacer />
      <Flex>
        <ChakraLink as={Link} href="/">
          <Icon fontSize="2rem">
            <IoHomeOutline></IoHomeOutline>
          </Icon>
        </ChakraLink>
        <Box w={"2rem"}></Box>
        <ChakraLink as={Link} href="/photo">
          <Icon fontSize="2rem">
            <CiCamera />
          </Icon>
        </ChakraLink>
        <Box w={"2rem"}></Box>
        <ChakraLink as={Link} href="/image">
          <Icon fontSize="2rem">
            <RiImageAddLine />
          </Icon>
        </ChakraLink>
      </Flex>
    </Flex>
  );
};

export default Header;
