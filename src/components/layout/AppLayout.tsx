import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loading from "../common/Loading";
import { Box } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import { isMobile } from "react-device-detect";

const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const sidebarStyle = {
    marginLeft: isSidebarOpen && !isMobile ? "calc(240px)" : "calc(0)",
    transition: "width 225ms ease-in-out",
  };
  const navbarStyle = {
    marginLeft: isSidebarOpen && !isMobile ? "calc(240px)" : "calc(0)",
    transition: "width 225ms ease-in-out",
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <>
      <Box sx={navbarStyle}>
        <Navbar openSidebar={handleSidebarToggle} />
      </Box>
      <Box>
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <Box sx={{ ...sidebarStyle, flexGrow: 1, p: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default AppLayout;
