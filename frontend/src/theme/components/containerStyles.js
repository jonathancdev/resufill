const containerStyles = {
  baseStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: { base: "20px", md: "30px", lg: "30px" },
    maxW: "100vw",
    minH: "100vh",
    pt: { base: "0px", xs: "50px", md: "80px" },
  },
  sizes: {},
  variants: {
    base: {},
    account: {
      minH: "0",
    },
    preview: { padding: "0" },
  },
  defaultProps: {
    variant: "base",
  },
};
export { containerStyles };
