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
import DonationCard from "components/DonationCard";

import UserRoles from "utils/UserRoles";
import { decodeAuthToken } from "utils/authHelpers";
import { getPublicYouth } from "utils/getPlaceholders";

import styles from "./UserPage.module.scss";

// Renders page to view a user's page (currently only supports youths)
const UserPage = () => {
  const account = decodeAuthToken();
  const youth = getPublicYouth(1);

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
            <div className={styles.chipContainer}>
              <Chip color="primary" label={`@${youth.username}`} />
              <Chip color="primary" label={youth.name} />
              <Chip color="primary" label={youth.dob} />
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
                  donations={youth.donations}
                  youthUsername={youth.username}
                  donorUsername={account.username}
                />
              ) : (
                <DonationCard
                  donations={youth.donations}
                  youthUsername={youth.username}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default UserPage;
