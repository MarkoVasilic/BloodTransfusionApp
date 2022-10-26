import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import RegistrationForm from "../components/RegistrationForm";

export default function Dashboard() {
    return (
    <Stack height={"170vh"} justifyContent={"center"}>
        <Typography variant="h4" component="h2">
            Welcome
        </Typography>
        <RegistrationForm/>
    </Stack>
    );
  }