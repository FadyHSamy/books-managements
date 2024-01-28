import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authUtils from "../../utils/authUtils";
import Loading from "../common/Loading";
import { Box } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

const AppLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
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
      <Box
        sx={{
          // width: isSidebarOpen ? "calc(100% - 240px)" : "100%",
          marginLeft: isSidebarOpen ? "calc(240px)" : "calc(0)",
          transition: "width 225ms ease-in-out",
        }}
      >
        <Navbar openSidebar={handleSidebarToggle} />
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default AppLayout;
