import {
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import React from "react";

export const AssignIssueContact = ({
  assignContactInputErrors,
  handleRoleChange,
  handleUserChange,
  handleAssignUser,
  roleOptions,
  userOptions,
  issue,
}) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Issue Contact
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }}>
        <FormControl
          sx={{ gridColumn: "span 2" }}
          fullWidth
          margin="normal"
          error={!!assignContactInputErrors.role}
        >
          <InputLabel shrink>Select Role</InputLabel>
          <Select
            notched
            label="Select Role"
            name="role"
            value={issue.role}
            onChange={handleRoleChange}
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{assignContactInputErrors.role}</FormHelperText>
        </FormControl>
        <FormControl
          sx={{ gridColumn: "span 2" }}
          fullWidth
          margin="normal"
          error={!!assignContactInputErrors.user}
        >
          <InputLabel shrink>Select User</InputLabel>
          <Select
            notched
            label="Select User"
            name="user"
            value={issue.user}
            onChange={handleUserChange}
          >
            {userOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{assignContactInputErrors.user}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Button variant="contained" color="primary" onClick={handleAssignUser}>
            Assign
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AssignIssueContact;
