import CenterDetailsCard from "../components/CenterDetailsCard";
import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";

export default function CreateCenter(props) {
    return (
        <div>
            <Navbar />
            <Stack marginTop={"10px"} justifyContent={"center"}>
            <Typography align="center"  marginBottom={"30px"}  component="h1" variant="h4" color={green[800]}>
                Details
            </Typography>
            <CenterDetailsCard props></CenterDetailsCard>
        </Stack>
        </div>
    );
}