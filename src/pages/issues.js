// Issues.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Box,
  FormHelperText,
  useTheme,
} from "@mui/material";
import {
  priorityOptions,
  dcSwitchStatusOptions,
  statusOptions,
  roleOptions,
  userData,
} from "../util/mockData";
import { dataTransformer, logout } from "../util/helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IssueContactDataGrid from "../components/data-grid/issue-contact-data-grid";
import { showSnackbar } from "../events/snackBarEmitter";
import CreateIssue from "../components/issue/create-issue";

const Issues = () => {
  const [issue, setIssue] = useState({
    title: "",
    priority: "",
    dcSwitchStatus: "",
    status: "",
    description: "",
    repairDate: "",
    timeEstimate: "",
    electrical: false,
    hub: false,
  });
  const theme = useTheme();

  const [inputErrors, setInputErrors] = useState({});
  const [assignContactInputErrors, setAssignContactInputErrors] = useState({});

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const [userOptions, setUserOptions] = useState(dataTransformer(userData));
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [lastUpdatedOn, setLastUpdatedOn] = useState(moment());

  const handleCreateIssueInputChange = (e) => {
    console.log(e);
    const { name, value, type, checked } = e.target;
    console.log("Create Issue Save-wala: ", {
      [name]: type === "checkbox" ? checked : value ?? "",
    });
    setIssue({
      ...issue,
      [name]: type === "checkbox" ? checked : value ?? "",
    });
    setInputErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setAssignContactInputErrors((prevErrors) => ({ ...prevErrors, role: "" }));
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setAssignContactInputErrors((prevErrors) => ({ ...prevErrors, user: "" }));
  };

  const validateIssueContact = () => {
    let tempErrors = {};
    if (!selectedRole) tempErrors.role = "Please select role";
    if (!selectedUser) tempErrors.user = "Please select user";
    setAssignContactInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAssignUser = () => {
    let isValid = validateIssueContact();

    if (selectedRole && selectedUser) {
      const userDetails = userOptions.find((user) => user.value === selectedUser);
      const existingUser = assignedUsers.find((user) => user.id === userDetails.value);

      if (existingUser) {
        setAssignContactInputErrors((prevErrors) => ({
          ...prevErrors,
          user: "User already assigned",
        }));
      } else {
        let role = roleOptions.find((role) => role.value === selectedRole).label;
        let newUserData = userData.find((user) => user.id === selectedUser);
        let newUser = [
          ...assignedUsers,
          {
            id: newUserData.id,
            name: newUserData.name,
            email: newUserData.email,
            phone: newUserData.phone,
            role,
          },
        ];
        setAssignedUsers(newUser);
        showSnackbar("User assigned successfully", 3000);
      }
    } else {
      console.warn("Please select role and user");
    }
  };

  const handleRemoveUser = (id) => {
    setAssignedUsers(assignedUsers.filter((user) => user.id !== id));
  };

  const handleBulkRemoveUsers = (ids) => {
    setAssignedUsers(assignedUsers.filter((user) => !ids.includes(user.id)));
  };

  const validateCreateIssue = () => {
    let tempErrors = {};
    if (!issue.title) tempErrors.title = "Please enter title";
    if (!issue.priority) tempErrors.priority = "Please select priority";
    if (!issue.dcSwitchStatus) tempErrors.dcSwitchStatus = "Select DC Switch Status";
    if (!issue.status) tempErrors.status = "Please select status";
    if (!issue.description) tempErrors.description = "Please enter description";
    if (!issue.repairDate) tempErrors.repairDate = "Please select repair date";
    if (!issue.timeEstimate) tempErrors.timeEstimate = "Please enter time estimate";

    setInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveChanges = () => {
    debugger;
    setLastUpdatedOn(moment());
    console.log("Current changes - Not saved yet:", issue);
    let isValid = validateCreateIssue();

    if (isValid) {
      console.log("Current changes - Saved:", issue);
    }
  };

  return (
    <Box>
      <Container sx={{ paddingBottom: "3rem" }}>
        <Box display={"flex"} justifyContent={"end"} gap={"15px"}>
          <Button
            variant="outlined"
            onClick={() => {
              if (logout()) {
                navigate("/login");
              }
            }}
          >
            Log Out
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleSaveChanges()}>
            Save Changes
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: theme.palette.background.customBox,
            borderRadius: "6px",
            paddingX: "2rem",
            paddingTop: "1rem",
            marginTop: "3rem",
          }}
        >
          <Box>
            <CreateIssue
              lastUpdatedOn={lastUpdatedOn}
              inputErrors={inputErrors}
              issue={issue}
              handleCreateIssueInputChange={handleCreateIssueInputChange}
            />
          </Box>

          <Box sx={{ paddingTop: "2rem" }}></Box>

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

          <Box style={{ paddingTop: "2rem" }}>
            <IssueContactDataGrid
              userData={assignedUsers}
              onDeleteClick={handleRemoveUser}
              onBulkDeleteClick={handleBulkRemoveUsers}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Issues;
