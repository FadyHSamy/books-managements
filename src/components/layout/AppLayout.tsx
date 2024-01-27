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
      <Navbar />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            width: "max-content",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default AppLayout;
