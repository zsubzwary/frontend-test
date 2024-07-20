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
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
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
          <ListItem key={"Dashboard"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
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
                {<FontAwesomeIcon icon={faGaugeSimpleHigh} />}
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Projects"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
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
                {<FontAwesomeIcon icon={faListCheck} />}
              </ListItemIcon>
              <ListItemText primary={"Projects"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem
            onClick={() => navigate("/issues")}
            key={"Issues"}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
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
                {<FontAwesomeIcon icon={faExclamationCircle} />}
              </ListItemIcon>
              <ListItemText primary={"Issues"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Map"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
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
                <FontAwesomeIcon icon={faMap} />
              </ListItemIcon>
              <ListItemText primary={"Map"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Planing"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 4}
              onClick={(event) => handleListItemClick(event, 4)}
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
                {<FontAwesomeIcon icon={faCalendarCheck} />}
              </ListItemIcon>
              <ListItemText primary={"Planning"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"Gantt Chart"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
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
                {
                  <Box
                    sx={{ width: "0.9em", height: "0.9em" }}
                  /> /* { <FontAwesomeIcon style={{ visibility: "hidden" }} icon={faCog} />} */
                }
              </ListItemIcon>
              <ListItemText
                primary={"Gantt Chart"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0, fontSize: "6px !important" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Calendar"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Calendar"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Checklists"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 7}
              onClick={(event) => handleListItemClick(event, 7)}
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
                {<FontAwesomeIcon icon={faListAlt} />}
              </ListItemIcon>
              <ListItemText primary={"Checklists"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"ChecklistsChild"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 8}
              onClick={(event) => handleListItemClick(event, 8)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Checklists"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Create Checklists"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 9}
              onClick={(event) => handleListItemClick(event, 9)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Create Checklists"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Resources"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 10}
              onClick={(event) => handleListItemClick(event, 10)}
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
                {<FontAwesomeIcon icon={faUsers} />}
              </ListItemIcon>
              <ListItemText primary={"Resources"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Teams"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 11}
              onClick={(event) => handleListItemClick(event, 11)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Teams"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Employees"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 12}
              onClick={(event) => handleListItemClick(event, 12)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Employees"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Settings"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 13}
              onClick={(event) => handleListItemClick(event, 13)}
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
                {<FontAwesomeIcon icon={faCog} />}
              </ListItemIcon>
              <ListItemText primary={"Settings"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Partner Settings"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 14}
              onClick={(event) => handleListItemClick(event, 14)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Partner Settings"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Email Settings"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 15}
              onClick={(event) => handleListItemClick(event, 15)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Email Settings"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Users"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 16}
              onClick={(event) => handleListItemClick(event, 16)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Users"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Product Settings"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 17}
              onClick={(event) => handleListItemClick(event, 17)}
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <ListItemText
                primary={"Product Settings"}
                primaryTypographyProps={{ fontSize: "0.88rem" }}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Appearance"} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={selectedIndex === 18}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {<FontAwesomeIcon icon={faMoon} />}
              </ListItemIcon>
              <ListItemText primary={"Appearance"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Dark Mode Switch"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
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
                {<Box sx={{ width: "0.9em", height: "0.9em" }} />}
              </ListItemIcon>
              <Box>
                <DarkModeSwitch handleThemeChange={colorMode.toggleColorMode} />
              </Box>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key={"Offer"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === 19}
              onClick={(event) => handleListItemClick(event, 19)}
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
                {<FontAwesomeIcon icon={faCalendarCheck} />}
              </ListItemIcon>
              <ListItemText primary={"Offer"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
