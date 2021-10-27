import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Donor } from "common/Types";
import axiosBase from "utils/axiosBase";
import { decodeAuthToken, getAuthHeader } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import DonationCard from "components/Card/Donation";
import Layout from "components/Layout";

const YouthProfile = () => {
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [donor, setDonor] = useState<Donor | null>(null);

  useEffect(() => {
    axiosBase
      .post("/user/donor/private", {}, getAuthHeader())
      .then((response) => {
        setDonor({
          name: response.data.name,
          username: response.data.username,
          organization: response.data.organization,
          image: response.data.profilePicture,
          dob: response.data.dateOfBirth,
          anonymize: response.data.anonymize,
          donations: response.data.donations,
        });
      })
      .catch(({ response }) => {
        handleResponseError(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account?.username]);

  return (
    <Layout title="Donor Profile" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {donor ? (
          <>
            <Typography variant="h4" mb={4}>
              Welcome {donor.name}!
            </Typography>
            {donor.donations.length === 0 ? (
              <Typography>No donations yet!</Typography>
            ) : (
              <DonationCard isDonating donations={donor.donations} />
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
