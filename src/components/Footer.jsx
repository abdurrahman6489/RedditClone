import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
const Footer = () => {
  return (
    <footer>
      <Grid
        container
        spacing={2}
        sx={{ maxHeight: "20vh", minHeight: "15vh", mb: "3vh" }}
      >
        <Grid item lg={3} md={3}>
          <List>
            <ListItem disablePadding>About</ListItem>
            <ListItem disablePadding>Contacts</ListItem>
            <ListItem disablePadding>Services</ListItem>
            <ListItem disablePadding>Hosting</ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={3}>
          <List>
            <ListItem disablePadding>About</ListItem>
            <ListItem disablePadding>Contacts</ListItem>
            <ListItem disablePadding>Services</ListItem>
            <ListItem disablePadding>Hosting</ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={3}>
          <List>
            <ListItem disablePadding>About</ListItem>
            <ListItem disablePadding>Contacts</ListItem>
            <ListItem disablePadding>Services</ListItem>
            <ListItem disablePadding>Hosting</ListItem>
          </List>
        </Grid>
        <Grid item lg={3} md={3}>
          <List>
            <ListItem disablePadding>About</ListItem>
            <ListItem disablePadding>Contacts</ListItem>
            <ListItem disablePadding>Services</ListItem>
            <ListItem disablePadding>Hosting</ListItem>
          </List>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        textAlign="center"
        sx={{ margin: "auto", mb: "3vh" }}
      >
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
        <WhatsAppIcon />
      </Stack>
    </footer>
  );
};

export default Footer;
