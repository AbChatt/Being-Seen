import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import YouthCard from "components/YouthCard";
import { getPublicYouths } from "utils/getPlaceholders";

// Render the homepage of the application
const HomePage = () => (
  <Layout title="Home">
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 5 }}>
        Homeless Youths
      </Typography>
      <Grid container spacing={2}>
        {getPublicYouths().map((youth, idx) => (
          <Grid key={`youth-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <YouthCard {...youth} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Layout>
);

export default HomePage;
