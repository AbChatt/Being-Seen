import { useHistory } from "react-router-dom";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import Layout from "components/Layout";

// Render the store page of the application. If a user is not logged in (or does
// not have the youth role), we redirect them to the homepage.
const StorePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();

  if (!account || account.role !== UserRoles.youth) {
    history.push("/");
  }

  return (
    <Layout title="Store">
      <h1>Store Page</h1>
    <Layout title="Store" loading={loading}>
      <ToastContainer theme="colored" />
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Products</Typography>
          <Button to="/upload" component={Link} variant="contained">
            Upload new product
          </Button>
        </Box>
        {products.length ? (
          <Grid container spacing={2}>
            {products.map((product, idx) => (
              <Grid key={`p-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard {...product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography> No products </Typography>
        )}
      </Container>
    </Layout>
  );
};

export default StorePage;
