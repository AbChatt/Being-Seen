import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axiosBase from "utils/axiosBase";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { Product } from "common/Types";
import ProductCard from "components/Card/Product";
import { decodeAuthToken } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import Layout from "components/Layout";

const MerchantDashboard = () => {
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosBase
      .get("/user/merchant/products", {
        params: {
          owner: account?.username,
        },
      })
      .then((response) => {
        setProducts(
          response.data.map((data: any) => ({
            name: data.name,
            description: data.description,
            picture: data.picture,
            owner: data.owner,
            price: String(data.price),
          }))
        );
      })
      .catch(({ response }) => {
        handleResponseError(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account?.username]);

  return (
    <Layout title="Merchant Dashboard" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box
          mb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">My products</Typography>
          <Button to="/upload" component={Link} variant="contained">
            Upload new product
          </Button>
        </Box>
        {products.length ? (
          <Grid container spacing={2}>
            {products.map((product, idx) => (
              <Grid key={`p-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard {...product} isMerchant />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No products uploaded yet</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default MerchantDashboard;
