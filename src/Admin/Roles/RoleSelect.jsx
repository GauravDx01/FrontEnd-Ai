import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Field, ErrorMessage, useFormikContext } from 'formik';

const RoleSelect = () => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setFieldValue('role', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Field
          as={Select}
          labelId="role-select-label"
          id="role-select"
          name="role"
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value="superadmin">Superadmin</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Field>
      </FormControl>
      <ErrorMessage name="role" component="div" className="error-message" />
    </Box>
  );
};

export default RoleSelect;
