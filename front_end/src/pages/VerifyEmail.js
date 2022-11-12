import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Navbar from "../components/Navbar";
import axiosApi from "../api/axios";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const currentURL = window.location.href
  let navigate = useNavigate();
  const [success, setSuccess] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const getData = async () =>
    axiosApi
      .get(`send-email/get/${currentURL.split('/')[4]}/${currentURL.split('/')[5]}`)
      .then((response) => {
        axiosApi
          .get(`/account/users/activate/${response.data.user}/`).then((response) => {
            axiosApi.put(`/account/users/activate/${response.data.id}/`, response.data).then((response) => {
              setSuccess(true)
            }).catch(function (error) {
              setFail(true)
            });
          }).catch(function (error) {
            setFail(true)
          });
      })
      .catch(function (error) {
        setFail(true)
      });
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Navbar />
      <Box sx={{ width: "100%", margin: '100px 0px 0px 0px' }}>
        <Collapse in={success}>
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false);
                  navigate("/login");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Email verification successfull!
          </Alert>
        </Collapse>
      </Box>
      <Box sx={{ width: "100%", margin: '100px 0px 0px 0px' }}>
        <Collapse in={fail}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setFail(false);
                  navigate("/register-donor");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Email verification failed!
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
}