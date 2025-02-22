import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface MaterialInputProps {
  value: string | number | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  label?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  inWhite?: boolean;
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  helperText,
  multiline = false,
  rows,
  inWhite = false
}) => {
  const [finalInWhite, setFinalInWhite] = useState(inWhite);

  useEffect(() => {
    const parentElement = document.querySelector('.darkMode');

    if((inWhite===undefined||inWhite===false) &&parentElement){
      setFinalInWhite(true);
    }
  }, []);
  
  return (
    <div>
      <br />
      <TextField
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        variant="outlined"
        fullWidth
        helperText={helperText}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        sx={finalInWhite ? {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
        } : undefined}
        InputLabelProps={finalInWhite ? { style: { color: "white" } } : undefined}
        InputProps={finalInWhite ? { style: { color: "white" } } : undefined}
      />
    </div>
  );
};

export default MaterialInput;