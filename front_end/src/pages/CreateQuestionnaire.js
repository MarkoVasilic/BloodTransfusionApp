import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import QuestionnaireForm from "../components/QuestionnaireForm";


export default function CreateQuestionnaire() {

    return (
    <Stack height={"170vh"} justifyContent={"center"}>
        <Typography component="h1" variant="h4" color={green[800]}>
            Fill In
        </Typography>
        <QuestionnaireForm userRole = {undefined}/>
    </Stack>
    );
  }