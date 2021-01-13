import { Link } from "@reach/router";
import { logOut } from "../../services/ApiClientService";
import { MdHome } from "react-icons/md";
import UserIcon from "../../assets/user.svg";
import {
  useColorMode,
  Box,
  IconButton,
  Icon,
  Button,
  Heading,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import "./NavBar.css";
import { Flex } from "@chakra-ui/react";
import UserForm from "../UserForm/UserForm";
import { useScrollDirection } from "@hermanwikner/react-scroll-direction";

export default function NavBar({ user, setUser, setIsAuth, isAuth }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorScheme = useColorModeValue("button", "yellow");

  const handleClick = (e) => {
    if (
      e.target.classList.contains("form.wrapper") ||
      e.target.classList.contains("show")
    ) {
      document.querySelector(".form-wrapper").classList.remove("show");
    }
  };

  const direction = useScrollDirection();

  window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".nav-wrapper");
    if (window.scrollY > navbar.clientHeight) {
      navbar.classList.add("scrolled");
      direction === "DOWN" && window.scrollY > navbar.clientHeight
        ? navbar.classList.add("down")
        : navbar.classList.remove("down");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  const handleLogOut = () => {
    logOut();
    setIsAuth(false);
  };

  return (
    <>
      <div className="form-wrapper" onClick={handleClick}>
        <UserForm setUser={setUser} setIsAuth={setIsAuth} isAuth={isAuth} />
      </div>
      <Flex p={3} className="nav-wrapper">
        <Flex flexDir="column" justifyContent="center">
          <Heading as="h2" size="md">
            Codagora
          </Heading>
        </Flex>
        {isAuth ? (
          <Button onClick={handleLogOut}>Logout</Button>
        ) : (
          <Flex>
            <Box>
              <Link to="/">
                <Button p={3} boxShadow="lg" mx={2} colorScheme={colorScheme}>
                  <Icon as={MdHome} />
                </Button>
              </Link>
            </Box>
            <Box textAlign="right" mr={3} ml={3}>
              {colorMode === "light" ? (
                <IconButton icon={<SunIcon />} onClick={toggleColorMode} />
              ) : (
                <IconButton icon={<MoonIcon />} onClick={toggleColorMode} />
              )}
            </Box>

            <Tooltip label="Register" arrowSize={3} hasArrow>
              <Button
                p={3}
                boxShadow="lg"
                mx={2}
                borderRadius="50%"
                onClick={() =>
                  document.querySelector(".form-wrapper").classList.add("show")
                }
              >
                <img src={UserIcon} alt="" />
              </Button>
            </Tooltip>
          </Flex>
        )}
      </Flex>
    </>
  );
}
