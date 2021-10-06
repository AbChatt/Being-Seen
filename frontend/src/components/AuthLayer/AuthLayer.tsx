import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuthHeader, removeAuthToken } from "utils/checkAuth";
import axiosBase from "utils/axiosBase";

interface AuthLayerProps {
  children: React.ReactNode;
}

const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);

const AuthLayer = ({ children }: AuthLayerProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosBase
      .get("/user/validate", getAuthHeader())
      .catch(() => {
        removeAuthToken();
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 750);
      });
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};

export default AuthLayer;
