import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Donor } from "common/Types";
import { decodeAuthToken } from "utils/authHelpers";
import DonationCard from "components/Card/Donation";
import Layout from "components/Layout";

const YouthProfile = () => {
  const account = decodeAuthToken();
  const [loading] = useState(true);
  const [donor] = useState<Donor | null>(null);

  useEffect(() => {}, [account?.username]);

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
              <DonationCard donations={donor.donations} />
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
