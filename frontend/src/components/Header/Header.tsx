import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";

import styles from "./Header.module.scss";

const Header = () => (
  <AppBar position="sticky">
    <Toolbar className={styles.wrapper}>
      <MuiLink to="/" component={Link} className={styles.logoLink}>
        <img src="https://dummyimage.com/128x128&text=Logo" alt="Being Seen" />
      </MuiLink>
      <div>
        <Button
          to="/login"
          component={Link}
          variant="outlined"
          color="inherit"
          className={styles.button}
        >
          Login
        </Button>
        <Button
          to="/signup"
          component={Link}
          variant="outlined"
          color="inherit"
          className={styles.button}
        >
          Signup
        </Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;
