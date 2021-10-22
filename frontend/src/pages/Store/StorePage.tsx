import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import UpArrowIcon from "@mui/icons-material/ArrowUpward";
import DownArrowIcon from "@mui/icons-material/ArrowDownward";
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
import Button from "@mui/material/Button";

// Render the store page of the application. If a user is not logged in (or does
// not have the youth role), we redirect them to the homepage.
const StorePage = () => {
  const history = useHistory();
  const account = decodeAuthToken();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [renderedProducts, setRenderedProducts] = useState<Product[]>([]);

  if (!account || account.role !== UserRoles.youth) {
    history.push("/");
  }

  useEffect(() => {
    axiosBase
      .get("/user/merchant/products")
      .then((response) => {
        const retrievedProducts = response.data.map((data: any) => ({
          name: data.name,
          description: data.description,
          picture: data.picture,
          owner: data.owner,
          price: String(data.price),
        }));

        setProducts(retrievedProducts);
        setRenderedProducts(retrievedProducts);
      })
      .catch(({ response }) => {
        handleResponseError(response, toast);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [account?.username]);

  useEffect(() => {
    setRenderedProducts(
      products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [products, search]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSortAscending = () => {
    console.log("Need to sort products here ascending");
  };

  const handleSortDescending = () => {
    console.log("Need to sort products here descending");
  };

  return (
    <Layout title="Store" loading={loading}>
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box mb={3}>
          <Typography variant="h4">Store</Typography>

          <Box display="flex" alignItems="flex-end" mt={3}>
            <SearchIcon sx={{ mr: 1, my: 0.5 }} />
            <TextField
              label="Search"
              variant="standard"
              value={search}
              onChange={handleSearchChange}
            />
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleSortAscending}
              endIcon={<UpArrowIcon />}
            >
              Sort Price
            </Button>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={handleSortDescending}
              endIcon={<DownArrowIcon />}
            >
              Sort Price
            </Button>
          </Box>
        </Box>
        {products.length ? (
          <Grid container spacing={2}>
            {renderedProducts.map((product, idx) => (
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
