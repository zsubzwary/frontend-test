export const LightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#e7463f",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#F7F8FA",
      customBox: "#ffffff",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          border: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          "*::-webkit-scrollbar": {
            width: "0.2em",
          },
          "*::-webkit-scrollbar-track": {
            // '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.',
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.4)",
            outline: "1px solid slategrey",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          background: "radial-gradient(84.88% 84.88% at 50% 15.12%, #E7463F 0%, #EF8439 100%)",
          border: 0,
          borderRadius: 30,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 15px",
          fontWeight: 700,
        },
        outlined: {
          border: "1px solid #E9513E",
          borderRadius: 30,
          fontWeight: 700,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background:
              "radial-gradient(84.88% 84.88% at 50% 15.12%, #E7463F 0%, #EF8439 100%)",
            color: "white",
          },
          "&.Mui-selected > .MuiListItemIcon-root": {
            color: "white",
          },
          "& .MuiListItemIcon-root": {
            color: "#E7463F",
          },
          "&:hover": {
            background:
              "radial-gradient(84.88% 84.88% at 50% 15.12%, rgba(231, 70, 63, 0.2) 0%, rgba(239, 132, 57, 0.2) 100%)",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontSize: "1rem",
    fontWeightRegular: 400,
    h4: {
      fontSize: "1.13rem",
      fontWeight: 600,
      color: "#E9513E",
    },
    h5: {
      fontSize: "0.88rem",
      color: "#898787",
    },
  },
};
