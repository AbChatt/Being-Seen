import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import AdapterMoment from "@mui/lab/AdapterMoment";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import { setAuthToken } from "utils/checkAuth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosBase from "utils/axiosBase";

const DonorSignup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [organization, setOrganization] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [anonymize, setAnonymize] = useState(false);

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axiosBase
      .post("/user/donor/signup", {
        name: name,
        username: username,
        password: password,
        date_of_birth: dateOfBirth,
        organization: organization,
        profile_picture: pictureUrl,
        anonymize: anonymize,
        displayname: anonymize,
      })
      .then((response) => {
        setAuthToken(response.data.jwt);
        toast.success("Sign up succeed :)");
        history.push("/");
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

  const handleOrganization = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrganization(event.target.value);
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
        value={organization}
        onChange={handleOrganization}
        label="Organization"
        margin="normal"
      />
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
