import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import YouthIcon from "@mui/icons-material/Face";

import { decodeAuthToken, UserRoles } from "utils/checkAuth";

interface DrawerProps {
  open: boolean;
  onClose: () => any;
  onLogout: () => any;
}

interface DrawerRowProps {
  text: string;
  path: string;
  icon: JSX.Element;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const DrawerRow = ({ text, path, icon }: DrawerRowProps) => (
  <ListItem button component={Link} to={path}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const Drawer = ({ open, onClose, onLogout }: DrawerProps) => {
  const account = decodeAuthToken();

  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        <DrawerHeader>
          <IconButton onClick={onClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {account ? (
          <>
            {account.role === UserRoles.donor && (
              <DrawerRow text="Youths" path="/" icon={<YouthIcon />} />
            )}
            {account.role === UserRoles.youth && (
              <DrawerRow text="Store" path="/store" icon={<StoreIcon />} />
            )}
            <DrawerRow text="Profile" path="/profile" icon={<ProfileIcon />} />
            <Divider />
            <ListItem button onClick={onLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <DrawerRow text="Login" path="/login" icon={<LoginIcon />} />
            <DrawerRow text="Signup" path="/signup" icon={<SignupIcon />} />
          </>
        )}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
