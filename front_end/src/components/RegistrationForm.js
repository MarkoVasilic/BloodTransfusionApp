import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import InputTextField from "./InputTextField";
import InputTextFieldMultiline from "./InputTextFieldMultiline";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import sumbitRegistration from '../api/registration';

const RegistrationForm = ({ handleClose }) => {
  const { handleSubmit, control, getValues } = useForm();
  const onSubmit = async(data) => {
    await sumbitRegistration(data)
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidJMBG(jmbg) {
    const regex = new RegExp('^(\\d{13})?$');
    return regex.test(jmbg);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={1} sx={{padding:"100px 550px 0px 550px"}}>
        <Grid item xs={12}>
          <Grid item>
              <InputTextField name="first_name" control={control} label="First Name" rules={{ required: 'First name required' }}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="last_name" control={control} label="Last Name" rules={{ required: 'Last name required' }}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
          <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="Email"
                    variant="filled"
                    value={value}
                    fullWidth
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Email required',
                validate: {
                  validateEmail: v =>  isValidEmail(getValues("email")) || "Email form not correct"
                }
               }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="password" control={control} label="Password" type="password"
            rules={{ required: 'Password required', minLength: { value: 8,
              message: 'Password needs to be longer than 7' } }}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>    
            <Controller
                name="confirm_password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="Confirm Password"
                    variant="filled"
                    type={"password"}
                    value={value}
                    fullWidth
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Password confirmation required',
                validate: {
                  confirmPassword: v => v === getValues("password") || "Passwords doesn't match"
                },minLength: { value: 8,
                  message: 'Password needs to be longer than 7' }
               }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="address" control={control} label="Address"/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="city" control={control} label="City"/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="country" control={control} label="Country"/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="phone_number" control={control} label="Phone Number"/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="jmbg" control={control} label="JMBG"
            rules={{validate: {
              validateJMBG: v =>  isValidJMBG(getValues("jmbg")) || "JMBG must be numbers and length needs to be 13"
            }
            }}/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
          <Controller
                name="gender"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <FormControl variant="filled" fullWidth >
                      <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
                      <Select
                        fullWidth
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={value}
                        
                        onChange={onChange}
                      >
                        <MenuItem value={'M'}>Male</MenuItem>
                        <MenuItem value={'F'}>Female</MenuItem>
                        <MenuItem value={'N'}>Unknow</MenuItem>
                      </Select>
                  </FormControl>
                )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
            <InputTextField name="profession" control={control} label="Profession"/>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item>
          <InputTextFieldMultiline name="workplace" control={control} label="Workplace"/>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="success">
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleClose} color="error">
              Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationForm;