import { Box, Button, Container, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Example: Alphanumeric with underscore, 3 to 20 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: Minimum eight characters, at least one letter and one number

    if (name === "username") {
      setUserName(value);
      if (value === "") {
        setUsernameErrText("Please fill this field");
      } else if (!usernameRegex.test(value)) {
        setUsernameErrText("Alphanumeric with underscore, 3 to 20 characters");
      } else {
        setUsernameErrText("");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value === "") {
        setPasswordErrText("Please fill this field");
      } else if (!passwordRegex.test(value)) {
        setPasswordErrText("Minimum eight characters, at least one letter and one number");
      } else {
        setPasswordErrText("");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await authApi.login({
        username: username,
        password: password,
      });
      alert(res.message);
      localStorage.setItem("token", res.token);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      const error = err as string;
      alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <Container maxWidth={"sm"}>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            disabled={loading}
            error={usernameErrText !== ""}
            helperText={usernameErrText}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            disabled={loading}
            error={passwordErrText !== ""}
            helperText={passwordErrText}
            onChange={handleInputChange}
          />
          <LoadingButton sx={{ mt: 3, mb: 2 }} variant="outlined" fullWidth color="success" onClick={handleSubmit} loading={loading}>
            Login
          </LoadingButton>
        </Box>
      </Container>
      <Button component={Link} to="/signUp" sx={{ textTransform: "none" }}>
        Don't have an account? SignUp
      </Button>
    </>
  );
};

export default Login;
