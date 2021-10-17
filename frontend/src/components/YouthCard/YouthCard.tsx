import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Grow from "@mui/material/Grow";

import styles from "./YouthCard.module.scss";

interface YouthCardProps {
  name: string;
  story: string;
  username: string;
  image: string;
  age: number;
}

const YouthCard = ({ name, story, username, image, age }: YouthCardProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Required when initial image onLoad does not fire
    setTimeout(() => setLoaded(true), 750);
  }, []);

  return (
    <Link to={`/u/${username}`} className={styles.linkOverrides}>
      <Grow in={loaded}>
        <Card>
          <CardActionArea>
            <Avatar
              src={image}
              variant="square"
              sx={{ height: 200, width: "100%" }}
              imgProps={{ onLoad: () => setLoaded(true) }}
            />
            <CardContent>
              <Typography variant="h6">
                {name} ({age})
              </Typography>
              <Typography variant="body2" color="primary">
                @{username}
              </Typography>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.lineOverflow}
              >
                {story}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </Link>
  );
};

export default YouthCard;
