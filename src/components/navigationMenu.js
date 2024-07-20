import React, { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Speed } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faExclamationCircle,
  faGaugeSimpleHigh,
  faListAlt,
  faListCheck,
  faMap,
  faCog,
  faMoon,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../App";
import DarkModeSwitch from "../components/common/DarkModeSwitch";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export default function NavigationMenu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const menuItems = [
    {
      key: "dashboard",
      displayName: "Dashboard",
      icon: <FontAwesomeIcon icon={faGaugeSimpleHigh} />,
      selectedIndex: 0,
      route: "/",
    },
    {
      key: "projects",
      displayName: "Projects",
      icon: <FontAwesomeIcon icon={faListCheck} />,
      selectedIndex: 1,
      route: "/projects",
    },
    {
      key: "issues",
      displayName: "Issues",
      icon: <FontAwesomeIcon icon={faExclamationCircle} />,
      selectedIndex: 2,
      route: "/issues",
    },
    {
      key: "map",
      displayName: "Map",
      icon: <FontAwesomeIcon icon={faMap} />,
      selectedIndex: 3,
      route: "/map",
    },
    {
      key: "planning",
      displayName: "Planning",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      selectedIndex: 4,
      route: "/planning",
      divider: true,
    },
    {
      key: "ganttChart",
      displayName: "Gantt Chart",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 5,
      route: "/gantt-chart",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "calendar",
      displayName: "Calendar",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 6,
      route: "/calendar",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "checklists",
      displayName: "Checklists",
      icon: <FontAwesomeIcon icon={faListAlt} />,
      selectedIndex: 7,
      route: "/checklists",
      divider: true,
    },
    {
      key: "checklistsChild",
      displayName: "Checklists",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 8,
      route: "/checklists-child",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "createChecklists",
      displayName: "Create Checklists",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 9,
      route: "/create-checklists",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "resources",
      displayName: "Resources",
      icon: <FontAwesomeIcon icon={faUsers} />,
      selectedIndex: 10,
      route: "/resources",
      divider: true,
    },
    {
      key: "teams",
      displayName: "Teams",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 11,
      route: "/teams",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "employees",
      displayName: "Employees",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 12,
      route: "/employees",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "settings",
      displayName: "Settings",
      icon: <FontAwesomeIcon icon={faCog} />,
      selectedIndex: 13,
      route: "/settings",
      divider: true,
    },
    {
      key: "partnerSettings",
      displayName: "Partner Settings",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 14,
      route: "/partner-settings",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "emailSettings",
      displayName: "Email Settings",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 15,
      route: "/email-settings",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "users",
      displayName: "Users",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 16,
      route: "/users",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "productSettings",
      displayName: "Product Settings",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      selectedIndex: 17,
      route: "/product-settings",
      primaryTypographyProps: { fontSize: "0.88em" },
    },
    {
      key: "appearance",
      displayName: "Appearance",
      icon: <FontAwesomeIcon icon={faMoon} />,
      // selectedIndex: 18,
      // route: "/appearance",
      divider: true,
    },
    {
      key: "darkModeSwitch",
      displayName: "",
      icon: <Box sx={{ width: "0.9em", height: "0.9em" }} />,
      component: <DarkModeSwitch handleThemeChange={colorMode.toggleColorMode} />,
    },
    {
      key: "offer",
      displayName: "Offer",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
      selectedIndex: 19,
      route: "/offer",
      divider: true,
    },
  ];

  console.log('string', selectedIndex);

  const handleListItemClick = (event, index) => {
    if (index === 0 || index) {
      setSelectedIndex(index);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => handleDrawerOpen()}
        onMouseLeave={() => handleDrawerClose()}
      >
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List style={{ marginTop: "1rem" }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.route}>
              {item.divider && <Divider />}
              <ListItem
                key={item.key}
                disablePadding
                sx={{ display: "block" }}
                onClick={item.route && (() => navigate(item.route))}
              >
                <ListItemButton
                  selected={selectedIndex === item.selectedIndex}
                  onClick={(event) => handleListItemClick(event, item.selectedIndex)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {item.key === "darkModeSwitch" && open ? (
                    <Box>
                      <DarkModeSwitch handleThemeChange={colorMode.toggleColorMode} />
                    </Box>
                  ) : (
                    <ListItemText
                      primary={item.displayName}
                      sx={{ opacity: open ? 1 : 0 }}
                      primaryTypographyProps={item.primaryTypographyProps || {}}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </React.Fragment>
          ))}
        </List>

        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
