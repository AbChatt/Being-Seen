import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Header from "components/Header";

interface DefaultTemplateProps {
  title: string;
  children: React.ReactNode;
}

// Render header followed by the passed children (also sets document title)
const Layout = ({ title, children }: DefaultTemplateProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Header />
      <Box p={{ xs: 2, sm: 3 }} component="main">
        {children}
      </Box>
    </>
  );
};

export default Layout;
