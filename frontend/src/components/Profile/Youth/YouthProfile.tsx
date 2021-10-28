import { Avatar, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/system";

import Layout from "components/Layout";
import { useState, useEffect } from "react";
import handleResponseError from "utils/handleResponseError";
import { decodeAuthToken, getAuthHeader } from "utils/authHelpers";
import axiosBase from "utils/axiosBase";
import { toast } from "react-toastify";

const YouthProfile = () => {
  const account = decodeAuthToken();
  const username = account?.username;
  const [loading, setLoading] = useState(true);
  const [youth, setYouth] = useState({
    name: "",
    username: "",
    dob: "",
    image: "",
    savingPlan: "",
    story: "",
  });
  const [name, setName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [story, setStory] = useState("");
  const [savingPlan, setSavingPlan] = useState("");

  useEffect(() => {
    axiosBase
      .get("/user/youth", {
        params: {
          username: username,
        },
      })
      .then((response) => {
        setYouth({
          name: response.data.name,
          username: response.data.username,
          dob: response.data.dateOfBirth,
          image: response.data.profilePicture,
          savingPlan: response.data.savingPlan,
          story: response.data.story,
        });
        setName(response.data.name);
        setPictureUrl(response.data.profilePicture);
        setSavingPlan(response.data.savingPlan);
        setStory(response.data.story);
        console.log(youth);
      })
      .catch(({ response }) => {
        handleResponseError(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setName(event.target.value);
    }
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPictureUrl(event.target.value);
      // setYouth({ ...youth, image: event.target.value });
    }
  };

  const handleStoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setStory(event.target.value);
    }
  };

  const handleSavingPlanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      setSavingPlan(event.target.value);
    }
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name);

    axiosBase
      .put(
        "/user/youth/update",
        {
          name: name,
          profile_picture: pictureUrl,
          story: story,
          saving_plan: savingPlan,
        },
        getAuthHeader()
      )
      .then((response) => {
        toast.success(response.data.message);
        setYouth({
          ...youth,
          name: name,
          image: pictureUrl,
          story: story,
          savingPlan: savingPlan,
        });
      })
      .catch(({ response }) => {
        handleResponseError(response);
      });
  };

  return (
    <Layout title="Youth Profile" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {youth ? (
          <Box
            noValidate
            component="form"
            onSubmit={handleUpdate}
            sx={{ mt: 1 }}
          >
            <Avatar src={youth.image} sx={{ width: 64, height: 64 }} />
            <Typography mt={2} ml={2}>
              Hello {youth.username}
            </Typography>
            <TextField
              autoFocus
              // value={name}
              label="name"
              margin="normal"
              onChange={handleNameChange}
              placeholder={youth.name}
            />
            {pictureUrl && (
              <TextField
                fullWidth
                // value={pictureUrl}
                label="Profile Picture URL"
                margin="normal"
                onChange={handlePictureChange}
                placeholder={youth.image}
              />
            )}
            <TextField
              fullWidth
              label="story"
              multiline
              rows={4}
              margin="normal"
              onChange={handleStoryChange}
              placeholder={youth.story}
            />
            <TextField
              fullWidth
              label="saving plan"
              multiline
              rows={4}
              margin="normal"
              onChange={handleSavingPlanChange}
              placeholder={youth.savingPlan}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
          </Box>
        ) : (
          <Typography variant="h3">Cannot find</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default YouthProfile;
