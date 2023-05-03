import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./components/buttonStyles";
import { headingStyles as Heading } from "./components/headingStyles";
import { linkStyles as Link } from "./components/linkStyles";
import {
  formStyles as Form,
  formError as FormError,
  inputStyles as Input,
  labelStyles as FormLabel,
  textAreaStyles as Textarea,
} from "./components/formStyles";
import { containerStyles as Container } from "./components/containerStyles";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = {
  styles: {
    global: {
      body: {
        color: "gray.700",
      },
    },
  },
  breakpoints: {
    xs: "350px",
    sm: "475px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },

  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",

    grey: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
  fonts: {
    //waiting to agree on fonts
    body: "Source Sans Pro",
    heading: "Source Serif Pro",
  },

  components: {
    Heading,
    Form,
    FormError,
    Input,
    FormLabel,
    Textarea,
    Container,
    Button,
    Link,
  },
  textStyles: {
    logo: {
      fontSize: "30px",
      fontFamily: "Josefin Slab",
      fontWeight: "700",
    },
  },
};

export default extendTheme(theme, config);
