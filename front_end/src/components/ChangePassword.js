import { Stack,Button} from "@mui/material";
import React from "react";
import InputTextField from "./InputTextField";
import { green, red } from "@mui/material/colors";
import { useForm } from "react-hook-form";


function ChangePassword() {
    const { handleSubmit, control, getValues, setError } = useForm();
    return (
        <div>
            <Stack spacing={2}>
                <InputTextField
                    name="password"
                    label="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                />

                <InputTextField
                    name="password"
                    label="confirm password"
                    control={control}
                    rules={{ required: "Confirmed passsword is  required" }}
                />

                <Stack direction={"row"} justifyContent={"end"}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: "#6fbf73",
                            height: "30",
                            "&.MuiButtonBase-root": {
                            "&:hover": {
                                backgroundColor: green[600]
                            }
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
}

export default ChangePassword;
