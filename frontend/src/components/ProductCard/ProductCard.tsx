import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import { Product } from "common/Types";
import { getAuthHeader } from "utils/authHelpers";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ProductCardProps extends Product {
  isMerchant?: boolean;
}

const ProductCard = ({
  name,
  description,
  picture,
  price,
  isMerchant,
}: ProductCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBuy = () => {
    console.log(`Purchase product: ${name}`);
    console.log(`Header to pass to server JWT token`);
    console.log(getAuthHeader());
  };

  return (
    <Card>
      <Avatar
        src={picture}
        variant="square"
        sx={{ height: 200, width: "100%" }}
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isMerchant ? `$${price}` : `${+price / 5} credits`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isMerchant ? (
          <>
            <Button size="small" variant="contained" sx={{ mr: 1 }}>
              Edit
            </Button>
            <Button size="small" variant="contained" color="error">
              Delete
            </Button>
          </>
        ) : (
          <Button size="small" variant="contained" onClick={handleBuy}>
            Buy
          </Button>
        )}
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;
