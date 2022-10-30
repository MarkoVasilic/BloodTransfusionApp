import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import QuestionnaireForm from "../components/QuestionnaireForm";
import Navbar from "../components/Navbar";

export default function CreateQuestionnaire() {

    return (
        <div>
            <Navbar />
            <Stack height={"200vh"} justifyContent={"center"}>
                <Typography component="h1" variant="h4" color={green[800]} margin={"150px 0px 0px 0px"}>
                    Fill In Questionnaire
                </Typography>
                <QuestionnaireForm />
            </Stack>
        </div>

    );
}