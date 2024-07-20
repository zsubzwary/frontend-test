export const DarkTheme = {
  palette: {
    mode: "dark",
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
          border: '1px solid #E9513E',
          borderRadius: 30,
          fontWeight: 700,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            background: "radial-gradient(84.88% 84.88% at 50% 15.12%, #E7463F 0%, #EF8439 100%)",
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
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontSize: 16,
    fontWeightRegular: 400,
  },
};
