import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout";

const MerchantProfile = () => {
  return (
    <Layout title="Merchant Profile">
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" mb={4}>
          Merchant profile (where they can edit their account details)
        </Typography>
      </Container>
    </Layout>
  );
};

export default MerchantProfile;
