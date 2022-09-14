import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function MyFooter() {
  return (
    <Box
      sx={{ bgcolor: "background.paper", p: 6, bottom: 0 }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        URL Shortener
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        by Aliaksei Sidar
      </Typography>
      <Copyright />
    </Box>
  );
}

export default MyFooter;
