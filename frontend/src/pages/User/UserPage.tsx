import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import SvgIcon from "@mui/material/SvgIcon";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import DonationsTable from "components/DonationsTable";
import Typography from "@mui/material/Typography";
import UserIcon from "@mui/icons-material/Person";

import Layout from "components/Layout";
import { getDonations, getPublicYouth } from "utils/getPlaceholders";

interface StatisticProps {
  stat: string | number;
  label: string;
}

// Renders a statistic followed by a label (used for donations card)
const Statistic = ({ stat, label }: StatisticProps) => (
  <div style={{ textAlign: "center" }}>
    <Typography sx={{ fontWeight: 700 }} variant="h6">
      {stat}
    </Typography>
    <Typography color="text.secondary">{label}</Typography>
  </div>
);

// Renders page to view a user's page (currently only supports youths)
const UserPage = () => {
  let donationTotal = 0;
  let youth = getPublicYouth(1);
  youth.donations.forEach((donation) => (donationTotal += donation.amount));

  return (
    <Layout title="User page">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Avatar
              src={youth.image}
              sx={{ height: "auto", width: "100%" }}
              variant="rounded"
            />
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
            <Card sx={{ mt: 5 }} style={{ background: "rgba(0 0 0 / 2%)" }}>
              <CardContent>
                <Grid container sx={{ mb: 2.5 }}>
                  <Grid item xs={4}>
                    <Statistic stat={`$${donationTotal}`} label="raised" />
                  </Grid>
                  <Grid item xs={4}>
                    <Statistic
                      stat={youth.donations.length}
                      label="donations"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Statistic stat={0} label="followers" />
                  </Grid>
                </Grid>
                <DonationsTable donations={getDonations()} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default UserPage;
