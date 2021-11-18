import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import UpArrowIcon from "@mui/icons-material/ArrowUpward";
import DownArrowIcon from "@mui/icons-material/ArrowDownward";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Product } from "common/Types";
import Layout from "components/Layout";
import ProductCard from "components/Card/Product";

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
          category: data.category,
          merchant: data.merchant,
          price: data.price,
        }));

        setProducts(retrievedProducts);
        setRenderedProducts(retrievedProducts);
      })
      .catch(({ response }) => {
        handleResponseError(response);
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

  const sortProductsAscending = () =>
    [...products].sort((p1, p2) => p1.price - p2.price);

  const handleSortAscending = () => {
    setProducts(sortProductsAscending());
  };

  const handleSortDescending = () => {
    setProducts(sortProductsAscending().reverse());
  };

  // Handle sort by category

  const handleDisableFilter = () => {
    setRenderedProducts(products);
  };

  const handleSortFood = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Food";
      })
    );
  };

  const handleSortGoods = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Goods";
      })
    );
  };

  const handleSortService = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Services";
      })
    );
  };

  const handleSortEducation = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Education";
      })
    );
  };

  const handleSortHygiene = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Hygiene";
      })
    );
  };

  const handleSortEntertainment = () => {
    setRenderedProducts(
      products.filter((product) => {
        return product.category === "Entertainment";
      })
    );
  };

  // Handle sort button
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              id="sort-button"
              aria-controls="sort-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              sx={{ ml: 2 }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Filter By
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleDisableFilter}>All</MenuItem>
              <MenuItem onClick={handleSortFood}>Food</MenuItem>
              <MenuItem onClick={handleSortGoods}>Goods</MenuItem>
              <MenuItem onClick={handleSortService}>Services</MenuItem>
              <MenuItem onClick={handleSortEducation}>Education</MenuItem>
              <MenuItem onClick={handleSortHygiene}>Hygiene</MenuItem>
              <MenuItem onClick={handleSortEntertainment}>
                Entertainment
              </MenuItem>
            </Menu>
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
        {renderedProducts.length ? (
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
