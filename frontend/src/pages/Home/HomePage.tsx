import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import YouthCard from "components/Card/Youth";

import axiosBase from "utils/axiosBase";
import handleResponseError from "utils/handleResponseError";
import { PublicYouth } from "common/Types";

// Render the homepage of the application
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [youths, setYouths] = useState<PublicYouth[]>([]);

  useEffect(() => {
    axiosBase
      .get("/user/youth")
      .then((response) => {
        setYouths(
          response.data.map((data: any) => ({
            name: data.name,
            username: data.username,
            dob: data.dateOfBirth,
            image: data.profilePicture,
            savingPlan: data.savingPlan,
            story: data.story,
            donations: data.donations,
          }))
        );
      })
      .catch(({ response }) => {
        handleResponseError(response, toast);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Layout title="Home" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" align="center" sx={{ mb: 5 }}>
          Homeless Youths
        </Typography>
        <Grid container spacing={2}>
          {youths.map((youth, idx) => (
            <Grid key={`youth-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <YouthCard {...youth} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomePage;
