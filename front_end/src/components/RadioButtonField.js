import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export default function RadioButtonField(props) {
  return (
    <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl error={!!error}>
                <FormLabel id="demo-row-radio-buttons-group-label">{props.label}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={onChange}
                >
                    <FormControlLabel value="y" control={<Radio />} label="Yes" />
                    <FormControlLabel value="n" control={<Radio />} label="No" />
                </RadioGroup>
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        )}
        rules={props.rules}
    />
    
  );
}
