import Typography from '@mui/material/Typography';
import Image from 'mui-image'
import { Stack } from '@mui/system';

export default function Dashboard() {
    return (
        <Stack height={"80vh"} justifyContent={"center"}>
        <Typography variant="h2" component="h2">
            Be the reason for someone's heartbeat.
        </Typography>
        <Stack  alignItems={"center"}>
            <Image src="blood_drop.png" width={200} height={150} />
        </Stack>
    </Stack>
    );
  }