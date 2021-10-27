import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout";

const DonorProfile = () => {
  return (
    <Layout title="Donor Profile">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" mb={4}>
          Donor profile (where they can edit their account details)
        </Typography>
      </Container>
    </Layout>
  );
};

export default DonorProfile;
