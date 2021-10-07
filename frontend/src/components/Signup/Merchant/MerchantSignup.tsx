import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuthToken } from "utils/checkAuth";
import axiosBase from "utils/axiosBase";

const MerchantSignup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axiosBase
      .post("/user/merchant/signup", {
        name: name,
        username: username,
        password: password,
        date_of_birth: dateOfBirth,
        store_name: storeName,
        location: location,
        email: email,
        profile_picture: pictureUrl,
      })
      .then((response) => {
        setAuthToken(response.data.jwt);
        history.push("/profile");
      })
      .catch(({ response }) => {
        if (response) {
          toast.error(response.data.message || "Unknown error");
        } else {
          toast.error("Request could not be made");
        }
      });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPictureUrl(event.target.value);
  };

  const handleStoreNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleDateChange = (newDate: Date | null) => {
    setDateOfBirth(newDate);
  };

  return (
    <Box noValidate component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
      <ToastContainer theme="colored" />
      <TextField
        autoFocus
        required
        fullWidth
        value={name}
        onChange={handleNameChange}
        autoComplete="name"
        label="Name"
        margin="normal"
      />
      <TextField
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
        autoComplete="new-password"
        label="Password"
        type="password"
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          value={dateOfBirth}
          onChange={handleDateChange}
          label="Date of Birth"
          renderInput={(params) => (
            <TextField {...params} required fullWidth margin="normal" />
          )}
        />
      </LocalizationProvider>
      <TextField
        required
        fullWidth
        value={storeName}
        onChange={handleStoreNameChange}
        label="Store Name"
        margin="normal"
      />
      <TextField
        required
        fullWidth
        value={location}
        onChange={handleLocationChange}
        label="Store Location"
        margin="normal"
      />
      <TextField
        required
        fullWidth
        value={email}
        onChange={handleEmailChange}
        label="PayPal Email"
        margin="normal"
        type="email"
        placeholder="example@example.com"
      />
      <TextField
        fullWidth
        value={pictureUrl}
        onChange={handlePictureChange}
        label="Profile Picture URL"
        margin="normal"
      />
      {pictureUrl && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Avatar src={pictureUrl} sx={{ width: 64, height: 64 }} />
        </Box>
      )}
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Signup
      </Button>
    </Box>
  );
};

export default MerchantSignup;
