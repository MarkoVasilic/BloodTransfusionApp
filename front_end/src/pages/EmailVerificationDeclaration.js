import React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  let navigate = useNavigate();
  const [success, setSuccess] = React.useState(true);
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
                  navigate("/");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Please check your email for verification link, and after you verify you can log in!
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
}