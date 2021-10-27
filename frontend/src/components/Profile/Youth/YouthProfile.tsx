import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

import { PrivateYouth } from "common/Types";
import { decodeAuthToken } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import DonationCard from "components/Card/Donation";
import axiosBase from "utils/axiosBase";
import Layout from "components/Layout";

const YouthProfile = () => {
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [youth, setYouth] = useState<PrivateYouth | null>(null);

  useEffect(() => {
    axiosBase
      .get("/user/youth", {
        params: {
          username: account?.username,
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
          donations: response.data.donations,
          credits: response.data.credits || 20,
        });
      })
      .catch(({ response }) => {
        handleResponseError(response, toast);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account?.username]);

  return (
    <Layout title="Youth Profile" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {youth ? (
          <>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography variant="h4">Welcome {youth.name}!</Typography>
              <Chip
                icon={<MoneyIcon />}
                label={`Balance: ${youth.credits} CR`}
                color="primary"
                style={{
                  height: "2.5rem",
                  fontSize: "1.25rem",
                  borderRadius: "999px",
                }}
              />
            </Box>

            {youth.donations.length === 0 ? (
              <Typography>No donations yet!</Typography>
            ) : (
              <DonationCard inCredits donations={youth.donations} />
            )}
          </>
        ) : (
          <Typography variant="h4">
            Issue loading {account?.username}
          </Typography>
        )}
      </Container>
    </Layout>
  );
};

export default YouthProfile;
