import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import RadioButtonField from "./RadioButtonField";
import { sumbitRegistration } from '../api/signInOn';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom';


const RegistrationForm = (props) => {
  const { handleSubmit, control, getValues, setError } = useForm();
  const [alert, setAlert] = React.useState(false);
  let navigate = useNavigate();

  const onSubmit = async(data) => {
    try{
      await sumbitRegistration(data, props.userRole)
      setAlert(true)
    }
    catch(err){
      const errMes = err.response.data
      for (let key in errMes){
        setError(key, {message : errMes[key]})
        console.log(key)
        console.log(errMes[key])
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} sx={{padding:"55px 550px 0px 550px"}}>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="flu" control={control} label="Do you have flu?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="other_sickness" control={control} label="Do you have some other sickness" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="feel_good" control={control} label="Are you feeling good?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="changes_on_skin" control={control} label="Do you have some changes on skin?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="blood_preasure_high" control={control} label="Do you have high blood preasure?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="blood_preasure_low" control={control} label="Do you have low blood preasure?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="using_medicine" control={control} label="Are you currently using some medicine?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="last_medicine_in_last_7_days" control={control} label="Did you take some medicine in last 7 days?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="on_menstruation_period" control={control} label="Are you currently on menstrual period?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="dental_interventions_in_last_7_days" control={control} label="Did you have some dental inteventions in last 7 days?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="tattoo_piercing_in_last_6_months" control={control} label="?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="on_menstruation_period" control={control} label="Are you currently on menstrual period?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item>
                <RadioButtonField name="on_menstruation_period" control={control} label="Are you currently on menstrual period?" rules={{ required: 'This field is required' }}/>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={{background: "#6fbf73", marginTop: 2}} fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box sx={{ width: '100%' }}>
      <Collapse in={alert}>
        <Alert
          severity='success'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                console.log("nesto")
                setAlert(false);
                navigate('/login/')
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Submit successfull!
        </Alert>
      </Collapse>
    </Box>
  </div>
  );
};

export default RegistrationForm;