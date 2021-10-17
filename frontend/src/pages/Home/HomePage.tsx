import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import Layout from "components/Layout";
import YouthCard from "components/YouthCard";

// Render the homepage of the application
const HomePage = () => (
  <Layout title="Home">
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 5 }}>
        Homeless Youths
      </Typography>
      <Grid container spacing={2}>
        {[...Array(30)].map((x, i) => (
          <Grid key={`youth-${i}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <YouthCard
              age={60}
              name="Barack Obama"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/President_Barack_Obama%2C_2012_portrait_crop.jpg/800px-President_Barack_Obama%2C_2012_portrait_crop.jpg"
              story="Barack Hussein Obama II is an American politician, author, and retired attorney who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, Obama was the first African-American president of the United States."
              username="BarackObama"
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Layout>
);

export default HomePage;
