import React, { useState } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import LoginIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Layout from "components/Layout";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      username,
      password,
      rememberMe,
    });
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleRememberChange = (event: React.SyntheticEvent, state: boolean) =>
    setRememberMe(state);

  return (
    <Layout title="Login">
      <Container maxWidth="xs">
        <div className={styles.loginContainer}>
          <Avatar sx={{ mb: 2, bgcolor: "primary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            noValidate
            component="form"
            onSubmit={handleLogin}
            sx={{ mt: 1 }}
          >
            <TextField
              autoFocus
              required
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              autoComplete="username"
              label="Username"
              margin="normal"
            />
            <TextField
              required
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              checked={rememberMe}
              onChange={handleRememberChange}
              label="Remember me"
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Typography align="center" variant="body2">
              Don't have an account?
              <MuiLink to="/signup" component={Link} sx={{ ml: 1 }}>
                Signup
              </MuiLink>
            </Typography>
          </Box>
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
