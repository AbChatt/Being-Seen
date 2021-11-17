import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import SvgIcon from "@mui/material/SvgIcon";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import UserIcon from "@mui/icons-material/Person";

import Layout from "components/Layout";
import DonationCard from "components/Card/Donation";
import { PublicYouth } from "common/Types";

import UserRoles from "utils/UserRoles";
import { decodeAuthToken } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import axiosBase from "utils/axiosBase";

import styles from "./UserPage.module.scss";

// Renders page to view a user's page (currently only supports youths)
const UserPage = () => {
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [youth, setYouth] = useState<PublicYouth | null>(null);
  const { username } = useParams<{ username: string }>();

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
          followCount: response.data.follow_count,
          dateOfBirth: response.data.date_of_birth,
          profilePicture: response.data.profile_picture,
          savingPlan: response.data.saving_plan,
          story: response.data.story,
          donations: response.data.donations,
        });
      })
      .catch(({ response }) => {
        handleResponseError(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <Layout title="User page" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {youth ? (
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Avatar
                src={youth.profilePicture}
                sx={{ height: "auto", width: "100%" }}
                variant="rounded"
              />
              <div className={styles.chipContainer}>
                <Chip color="primary" label={`@${youth.username}`} />
                <Chip color="primary" label={youth.name} />
                <Chip color="primary" label={youth.dateOfBirth} />
              </div>
              <Typography variant="h5" sx={{ mt: 2.5 }}>
                {youth.name}'s Saving Plan
              </Typography>
              <Divider />
              <Typography sx={{ mt: 2.5 }} style={{ whiteSpace: "pre-wrap" }}>
                {youth.savingPlan}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box display="flex" alignItems="center">
                <SvgIcon
                  color="primary"
                  sx={{ height: "3rem", width: "3rem", mr: 2.5 }}
                >
                  <UserIcon />
                </SvgIcon>
                <Typography variant="h3">{youth.name}</Typography>
              </Box>
              <Divider />
              <Typography sx={{ mt: 2.5 }} style={{ whiteSpace: "pre-wrap" }}>
                {youth.story}
              </Typography>
              <Box sx={{ mt: 5 }}>
                {account && account.role === UserRoles.donor ? (
                  <DonationCard
                    youthUsername={username}
                    donations={youth.donations}
                    donorUsername={account.username}
                    followCount={youth.followCount}
                  />
                ) : (
                  <DonationCard
                    donations={youth.donations}
                    youthUsername={youth.username}
                    followCount={youth.followCount}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h3">Cannot find {username}</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default UserPage;
