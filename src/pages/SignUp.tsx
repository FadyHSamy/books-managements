import { Box, Button, TextField, FormControl, Container } from "@mui/material";
import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";
import axios, { AxiosResponse } from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let notValid = false;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Example: Alphanumeric with underscore, 3 to 20 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: Minimum eight characters, at least one letter and one number

    if (name === "username") {
      setUserName(value);
      if (value === "") {
        notValid = true;
        setUsernameErrText("Please fill this field");
      } else if (!usernameRegex.test(value)) {
        notValid = true;
        setUsernameErrText("Alphanumeric with underscore, 3 to 20 characters");
      } else {
        notValid = false;
        setUsernameErrText("");
      }
    } else if (name === "password") {
      setPassword(value);
      if (value === "") {
        notValid = true;
        setPasswordErrText("Please fill this field");
      } else if (!passwordRegex.test(value)) {
        notValid = true;
        setPasswordErrText("Minimum eight characters, at least one letter and one number");
      } else {
        notValid = false;
        setPasswordErrText("");
      }
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (value === "") {
        notValid = true;
        setConfirmPasswordErrText("Please fill this field");
      } else if (value !== password) {
        notValid = true;
        setConfirmPasswordErrText("Confirm password not match");
      } else {
        notValid = false;
        setConfirmPasswordErrText("");
      }
    }
  };

  const handleSubmit = async () => {
    if (false) return;

    try {
      setLoading(true);
      const res = await authApi.signUp({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      });
      alert(res.message);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      const error = err as string;
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            disabled={loading}
            error={confirmPasswordErrText !== ""}
            helperText={confirmPasswordErrText}
            onChange={handleInputChange}
          />
          <LoadingButton sx={{ mt: 3, mb: 2 }} variant="outlined" fullWidth color="success" onClick={handleSubmit} loading={loading}>
            SignUp
          </LoadingButton>
        </Box>
      </Container>
      <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
        Already have an account? Login
      </Button>
    </>
  );
};

export default SignUp;
