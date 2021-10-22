import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axiosBase from "utils/axiosBase";
import Grid from "@mui/material/Grid";

import { Product } from "common/Types";
import ProductCard from "components/ProductCard";
import { decodeAuthToken } from "utils/authHelpers";
import handleResponseError from "utils/handleResponseError";
import Layout from "components/Layout";

const MerchantProfile = () => {
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
        handleResponseError(response, toast);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account?.username]);

  return (
    <Layout title="Merchant Profile" loading={loading}>
      <ToastContainer theme="colored" />
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography align="right">
          <Button size="small" to="/upload" component={Link}>
            Upload new product
          </Button>
        </Typography>
        <h1>My products</h1>
        {products.length ? (
          <Grid container spacing={2}>
            {products.map((product, idx) => (
              <Grid
                key={`item-${idx}`}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              >
                <ProductCard {...product} showControls />
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

export default MerchantProfile;
