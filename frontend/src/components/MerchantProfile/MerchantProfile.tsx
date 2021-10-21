import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout";

const MerchantProfile = () => {
  return (
    <Layout title="Merchant Profile">
      <Typography align="right">
        <Button size="small" href="/upload">
          Upload products
        </Button>
      </Typography>
      <h1>My products</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500/k%2FPhoto%2FRecipes%2F2019-10-recipe-brussels-sprouts-caesar-salad%2FBrusselsSproutCaesarSaladOption1"
          alt="caesar salad"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Caesar Salad
          </Typography>
          <Typography variant="body2" color="text.secondary">
            300 credits
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </Layout>
  );
};

export default MerchantProfile;
