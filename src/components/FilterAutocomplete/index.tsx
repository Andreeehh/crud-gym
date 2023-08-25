import * as Styled from './styles';
import { Autocomplete, TextField } from '@mui/material';

export type FilterAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  options: string[];
};

export const FilterAutocomplete = ({
  label,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  options,
}: FilterAutocompleteProps) => {
  return (
    <Styled.Wrapper>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option}
        value={value || ''}
        onChange={(_, newValue) => onChange(newValue)}
        inputValue={value || ''}
        onInputChange={(_, newInputValue) => onChange(newInputValue)}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            variant="outlined"
          />
        )}
      />
    </Styled.Wrapper>
  );
};
