import { useHistory } from "react-router-dom";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import Layout from "components/Layout";
import React, { useState } from "react";
import axiosBase from "utils/axiosBase";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { getAuthHeader } from "utils/authHelpers";

// Render the profile page of the application. If a user is not logged in (or
// is not a merchant), we redirect them to the homepage.
const UploadPage = () => {
  const history = useHistory();
  const account = decodeAuthToken();
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  if (!account || !(account.role === UserRoles.merchant)) {
    history.push("/");
  }

  // Sends a post request to backend API to signup a merchant
  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosBase
      .post(
        "/user/merchant/upload",
        {
          name: name,
          description: description,
          picture: pictureUrl,
          price: price,
        },
        getAuthHeader()
      )
      .then((response) => {
        // On success, we redirect the merchant to their profile page
        // to manage their store and items
        history.push("/profile");
      })
      .catch(({ response }) => {
        // On failure, we determine whether the request itself was made. If so,
        // we display the error message from the API to the merchant.
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

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPictureUrl(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <Layout title="Upload Page">
      <h1>Upload a new product</h1>
      <Box noValidate component="form" onSubmit={handleUpload} sx={{ mt: 1 }}>
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
          autoFocus
          required
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          autoComplete="description"
          label="Description"
          margin="normal"
        />
        <TextField
          autoFocus
          required
          fullWidth
          value={price}
          onChange={handlePriceChange}
          autoComplete="price"
          label="Price"
          margin="normal"
        />
        <TextField
          fullWidth
          value={pictureUrl}
          onChange={handlePictureChange}
          label="Product Picture URL"
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
          Upload
        </Button>
      </Box>
    </Layout>
  );
};

export default UploadPage;
