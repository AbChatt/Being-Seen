import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonorSignup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [anonymize, setAnonymize] = useState(false);

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      name,
      username,
      password,
      pictureUrl,
      anonymize,
      dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : dateOfBirth,
    });

    toast.success("A success message for later :)");
    toast.error("An error message for later :(");
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

  const handleAnonymizeChange = (event: any, checked: boolean) => {
    setAnonymize(checked);
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
        fullWidth
        value={pictureUrl}
        onChange={handlePictureChange}
        label="Profile Picture URL"
        margin="normal"
      />
      <FormControlLabel
        checked={anonymize}
        label="Anonymize my name"
        onChange={handleAnonymizeChange}
        control={<Checkbox />}
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

export default DonorSignup;