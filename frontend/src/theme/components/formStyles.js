const formStyles = {
  baseStyle: {
    container: {
      width: "auto",
      padding: { base: "0 10px", md: "0 20px", lg: "0 20px" },
    },
    helperText: {
      color: "gray.600",
      padding: "3px",
      fontSize: "12px",
    },
  },
  sizes: {},
  variants: {
    base: {},
  },
  defaultProps: {
    variant: "base",
  },
};
const formError = {
  baseStyle: {
    text: {
      color: "red",
    },
  },
  sizes: {},
  variants: {
    base: {},
  },
  defaultProps: {
    variant: "base",
  },
};
const inputStyles = {
  baseStyle: {
    addon: {},
    field: {
      width: { base: "280px", sm: "380px", md: "400px", lg: "450px" },
      border: "1px solid",
      borderColor: "gray.300",
      _focusVisible: {
        border: "3px solid",
        borderColor: "blue.300",
      },
      _invalid: {
        border: "3px solid",
        borderColor: "red.300",
      },
      transition: "all .1s ease-in-out",
    },
    element: {},
  },
  sizes: {},
  variants: {
    base: {},
    long: {
      field: {
        maxWidth: { base: "90%", md: "80%", lg: "70%" },
      },
    },
    withElement: {
      field: {
        maxWidth: "100%",
      },
    },
  },
  defaultProps: {
    variant: "base",
  },
};
const labelStyles = {
  baseStyle: {
    margin: { base: "0 0", md: "4px 0" },
    fontSize: "14px",
  },
  sizes: {},
  variants: {
    base: {},
  },
  defaultProps: {
    variant: "base",
  },
};
const textAreaStyles = {
  baseStyle: {
    width: { base: "280px", sm: "380px", md: "400px", lg: "450px" },
    border: "1px solid",
    borderColor: "gray.300",
    _focusVisible: {
      border: "3px solid",
      borderColor: "blue.300",
    },
  },
  sizes: {},
  variants: {
    base: {},
  },
  defaultProps: {
    variant: "base",
  },
};
export { formStyles, formError, inputStyles, labelStyles, textAreaStyles };
