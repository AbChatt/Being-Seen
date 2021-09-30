import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createTheme,
} from "@mui/material/styles";

import theme from "styles/theme";

interface DefaultTemplateProps {
  title: string;
  children: React.ReactNode;
}

const DefaultTemplate = ({ title, children }: DefaultTemplateProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <Box p={{ xs: 2, sm: 3 }}>{children}</Box>
    </ThemeProvider>
  );
};

export default DefaultTemplate;
