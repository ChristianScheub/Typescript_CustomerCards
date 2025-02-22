import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface MaterialCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
  inWhite?: boolean;
  link?: string;
}

const MaterialCheckbox: React.FC<MaterialCheckboxProps> = ({
  checked,
  onChange,
  label = '',
  helperText,
  inWhite = false,
  link,
}) => {
    const handleLabelClick = (event: React.MouseEvent) => {
        if (link) {
          event.preventDefault();
          window.location.href = link;
        }
      };
      
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            sx={
              inWhite
                ? {
                    color: "white",
                    '&.Mui-checked': { color: "white" },
                  }
                : undefined
            }
          />
        }
        style={{width: "80%"}}
        label={
          <span
            style={{
              color: inWhite ? 'white' : undefined,
              cursor: link ? 'pointer' : undefined,
              fontSize: "0.8em",
            }}
            onClick={link ? handleLabelClick : undefined}
          >
            {label}
          </span>
        }
      />
      {helperText && (
        <p
          style={{
            color: inWhite ? 'white' : undefined,
            fontSize: '0.6rem',
            textDecoration: link ? 'underline' : undefined,
            cursor: link ? 'pointer' : undefined,
          }}
          onClick={link ? handleLabelClick : undefined}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default MaterialCheckbox;
