import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import RegistrationForm from "../components/RegistrationForm";


export default function DonorRegistration() {

    return (
    <Stack height={"170vh"} justifyContent={"center"}>
        <Typography variant="h3" component="h2" color={green[800]}>
            Welcome
        </Typography>
        <RegistrationForm userRole = {undefined}/>
    </Stack>
    );
  }