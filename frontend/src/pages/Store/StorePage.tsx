import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { Product } from "common/Types";
import Layout from "components/Layout";
import ProductCard from "components/ProductCard";

import handleResponseError from "utils/handleResponseError";
import { decodeAuthToken } from "utils/authHelpers";
import UserRoles from "utils/UserRoles";
import axiosBase from "utils/axiosBase";

// Render the store page of the application. If a user is not logged in (or does
// not have the youth role), we redirect them to the homepage.
const StorePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  if (!account || account.role !== UserRoles.youth) {
    history.push("/");
  }

  useEffect(() => {
    axiosBase
      .get("/user/merchant/products")
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
    <Layout title="Store" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box mb={3}>
          <Typography variant="h4">Store</Typography>
          <Box display="flex" alignItems="flex-end">
            <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField label="Search" variant="standard" />
          </Box>
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
          <Typography>Sorry, no product is offered</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default StorePage;
