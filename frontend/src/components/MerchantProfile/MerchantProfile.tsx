import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProductCard from "components/ProductCard";
import axiosBase from "utils/axiosBase";
import { useEffect, useState } from "react";
import handleResponseError from "utils/handleResponseError";
import { Products } from "common/Types";
import { decodeAuthToken } from "utils/authHelpers";
import Layout from "components/Layout";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";

const MerchantProfile = () => {
  const account = decodeAuthToken();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    axiosBase
      .get("/user/merchant/products", {
        params: {
          store_owner_username: account?.username,
        },
      })
      .then((response) => {
        setProducts(
          response.data.map((data: any) => ({
            name: data.name,
            description: data.description,
            picture: data.picture,
            store_owner_username: data.store_owner_username,
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
      <Typography align="right">
        <Button size="small" href="/upload">
          Upload new product
        </Button>
      </Typography>
      <h1>My products</h1>
      <Grid container spacing={2}>
        {products.map((product, idx) => (
          <Grid key={`product-${idx}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default MerchantProfile;
