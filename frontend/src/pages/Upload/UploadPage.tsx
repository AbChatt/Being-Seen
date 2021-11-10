import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import { getAuthHeader } from "utils/authHelpers";
import { decodeAuthToken } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import UserRoles from "utils/UserRoles";
import axiosBase from "utils/axiosBase";

// Render the dashboard page of the application. If a user is not logged in (or
// is not a merchant), we redirect them to the homepage.
const UploadPage = () => {
  const history = useHistory();
  const account = decodeAuthToken();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");

  if (!account || account.role !== UserRoles.merchant) {
    history.push("/");
  }

  // Sends a post request to backend API to signup a merchant
  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axiosBase
      .post(
        "/user/merchant/products/upload",
        {
          name: name,
          description: description,
          picture: pictureUrl,
          price: price,
        },
        getAuthHeader()
      )
      .then((response) => {
        // On success, we redirect the merchant to their dashboard page
        // to manage their store and items
        history.push("/dashboard");
      })
      .catch(({ response }) => {
        handleResponseError(response);
      });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictureUrl(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <Layout title="Upload Page">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography gutterBottom variant="h4">
          Upload a new product
        </Typography>
        <Box noValidate component="form" onSubmit={handleUpload} sx={{ mt: 1 }}>
          <TextField
            autoFocus
            required
            fullWidth
            value={name}
            onChange={handleNameChange}
            label="Product Name"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            label="Description"
            margin="normal"
          />
          <TextField
            required
            fullWidth
            value={price}
            onChange={handlePriceChange}
            autoComplete="price"
            label="Price"
            margin="normal"
            type="number"
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
      </Container>
    </Layout>
  );
};

export default UploadPage;
