import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import useToken from "../../hooks/useToken";
import useToast from "../../hooks/useToast";
import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import moneyImage from "../../assets/moneyfinance-1.jpg";
import RegisterForm from "./RegisterForm";

function RegisterContainer() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [tmpToken, setTmpToken] = useState("");

  const { open, error, setError, showToast, hideToast } = useToast();
  // login
  const { setToken, setRefreshToken } = useToken();

  const steps = ["Cadastro"];
  const forms = [
    <>
      <RegisterForm
        onColectData={colectData}
        endpoint={{ method: "post", name: "user", generateToken: true }}
      />
    </>,
  ];

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await axios.get(`/recipe`);
        setRecipes(response.data);
      } catch (error) {
        setError(error?.response?.data);
      }
    }

    getRecipes();
  }, []);

  useEffect(() => {
    const formsLength = forms.length;
    if (step === formsLength) {
      loginUser(formData);
    }
  }, [step]);

  async function loginUser(credentials) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { ...credentials }
      );

      setToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      window.location.href = "/";
    } catch (error) {
      showToast();
      setError(error?.response?.data);
    }
  }

  async function loginUserTemporary(credentials) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        { ...credentials }
      );

      setTmpToken(response.data.accessToken);
    } catch (error) {
      showToast();
      setError(error?.response?.data);
    }
  }

  async function saveEndpoint(endpoint, data = {}) {
    try {
      const { method, name, generateToken } = endpoint;

      const authHeader =
        tmpToken && tmpToken !== null
          ? { Authorization: `Bearer ${tmpToken}` }
          : "";

      await axios[method](`${process.env.REACT_APP_API_URL}/${name}`, data, {
        headers: authHeader,
      });

      if (generateToken) {
        await loginUserTemporary(data);
      }

      hideToast();
      setError("");
    } catch (error) {
      const error_message = error?.response?.data?.errors[0]?.message;
      showToast();
      setError(error_message);
      return { error: error_message };
    }
  }

  async function colectData(data, endpoint = false) {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (endpoint) {
      const result = await saveEndpoint(endpoint, data);
      if (result?.error) return;
    }

    next();
  }

  function next() {
    setStep(step + 1);
  }

  return (
    <Grid
      display="flex"
      flexDirection="column"
      flexGrow={5}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${moneyImage})`,
        overflow: "hidden",
      }}
    >
      >
      <Snackbar
        anchorOrigin={SNACKBAR_DIRECTION}
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <Alert onClose={hideToast} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Card sx={{ width: "50%" }}>
        <CardContent>
          <>
            <Stepper activeStep={step}>
              {[...steps].map((item, key) => (
                <Step key={key} role="custom-step">
                  <StepLabel>{item}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {forms[step]}
          </>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RegisterContainer;
