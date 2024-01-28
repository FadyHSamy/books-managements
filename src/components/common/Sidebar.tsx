import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const drawerWidth: number = 240;

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const menuLists = [
    {
      name: "Homepage",
      icon: <HomeIcon />,
      navigateTo: () => navigate("/"),
    },
    {
      name: "Books",
      icon: <BookIcon />,
      navigateTo: () => navigate("/edit-books"),
    },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isSidebarOpen}
        onClose={closeSidebar}
      >
        <List>
          {menuLists.map((menuItem) => (
            <ListItemButton key={menuItem.name} onClick={menuItem.navigateTo}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
export default Sidebar;
