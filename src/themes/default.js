export const DefaultTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#e7463f",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "radial-gradient(84.88% 84.88% at 50% 15.12%, #E7463F 0%, #EF8439 100%)",
          border: 0,
          borderRadius: 30,
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          color: "white",
          height: 48,
          padding: "0 30px",
          fontWeight: 700,
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontSize: 16,
    fontWeightRegular: 400,
  },
};
