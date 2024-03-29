import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

interface NavbarProps {
  openSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openSidebar }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={openSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Toolbar
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
