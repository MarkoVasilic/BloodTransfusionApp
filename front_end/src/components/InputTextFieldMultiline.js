import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';

export default function InputTextField(props) {
    return (
        <Controller
                name={props.name}
                control={props.control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    id="filled-multiline-static"
                    label={props.label}
                    multiline
                    rows={4}
                    variant="filled"
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
            />
    );
}