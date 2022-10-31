import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import RegistrationForm from "../components/RegistrationForm";
import Navbar from "../components/Navbar";

export default function DonorRegistration() {
    return (
        <div>
            <Navbar />
            <Stack height={"170vh"} justifyContent={"center"}>
                <Typography component="h1" variant="h4" color={green[800]}>
                    Welcome
                </Typography>
                <RegistrationForm userRole={undefined} />
            </Stack>
        </div>
    );
}