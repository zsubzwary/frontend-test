// Issues.js
import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Switch,
  Typography,
  Box,
  InputAdornment,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { dataTransformer, logout } from "../util/helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IssueContactDataGrid from "../components/data-grid/issue-contact-data-grid";
import { showSnackbar } from "../events/snackBarEmitter";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
          <Typography variant="h4" gutterBottom>
            Create an Issue
          </Typography>
          <Typography variant="h5" gutterBottom>
            Last updated on {lastUpdatedOn.format("DD.MM.YYYY hh:mm a")}
          </Typography>
          <form className="issue-form">
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 3,
                marginTop: "3rem",
              }}
            >
              <FormControl fullWidth margin="normal">
                <TextField
                  error={!!inputErrors.title}
                  helperText={inputErrors.title}
                  label="Title"
                  name="title"
                  value={issue.title}
                  onChange={handleCreateIssueInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth margin="normal" error={!!inputErrors.priority}>
                <InputLabel shrink>Priority</InputLabel>
                <Select
                  notched
                  label="Priority"
                  name="priority"
                  value={issue.priority}
                  onChange={handleCreateIssueInputChange}
                >
                  {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{inputErrors.priority}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal" error={!!inputErrors.dcSwitchStatus}>
                <InputLabel shrink>DC Switch Status</InputLabel>
                <Select
                  notched
                  label="DC Switch Status"
                  name="dcSwitchStatus"
                  value={issue.dcSwitchStatus}
                  onChange={handleCreateIssueInputChange}
                >
                  {dcSwitchStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{inputErrors.dcSwitchStatus}</FormHelperText>
              </FormControl>
              <FormControl fullWidth margin="normal" error={!!inputErrors.status}>
                <InputLabel shrink>Status</InputLabel>
                <Select
                  notched
                  label="Status"
                  name="status"
                  value={issue.status}
                  onChange={handleCreateIssueInputChange}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{inputErrors.status}</FormHelperText>
              </FormControl>
              <Box
                display={"flex"}
                justifyContent={"start"}
                alignItems={"center"}
                marginLeft={"16px"}
                height={"83px"}
              >
                <Typography component="div">
                  <Switch
                    checked={issue.electrical}
                    onChange={handleCreateIssueInputChange}
                    name="electrical"
                  />
                  Electrical
                </Typography>
              </Box>
            </Box>
            <br></br>

            <Box
              sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, width: "100%" }}
            >
              <FormControl fullWidth margin="normal" sx={{ gridColumn: "span 2" }}>
                <TextField
                  error={!!inputErrors.description}
                  helperText={inputErrors.description}
                  sx={{ gridColumn: "span 2" }}
                  label="Description"
                  name="description"
                  value={issue.description}
                  onChange={handleCreateIssueInputChange}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment sx={{ alignSelf: "flex-start", mt: "8px" }} position="end">
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                {/* <TextField
                error={!!inputErrors.repairDate}
                helperText={inputErrors.repairDate}
                label="Repair Date"
                name="repairDate"
                value={issue.repairDate}
                onChange={handleCreateIssueInputChange}
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
              /> */}
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format="DD.MM.YYYY"
                    label="Repair Date"
                    name="repairDate"
                    value={issue.repairDate ? moment(issue.repairDate) : null}
                    onChange={(date) =>
                      handleCreateIssueInputChange({ target: { name: "repairDate", value: date } })
                    }
                    slotProps={{
                      textField: {
                        error: !!inputErrors.repairDate,
                        helperText: inputErrors.repairDate,
                        InputLabelProps: { shrink: true },
                        sx: {
                          "& .MuiInputAdornment-root": {
                            "& .MuiSvgIcon-root": {
                              fontSize: "1.25rem", // Adjust the size as needed
                            },
                          },
                          marginTop: "16px",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <TextField
                  error={!!inputErrors.timeEstimate}
                  helperText={inputErrors.timeEstimate}
                  label="Time Estimate Hours"
                  name="timeEstimate"
                  value={issue.timeEstimate}
                  onChange={handleCreateIssueInputChange}
                  fullWidth
                  margin="normal"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>

              <Box
                display={"flex"}
                justifyContent={"start"}
                alignItems={"center"}
                marginLeft={"16px"}
                marginTop={"16px"}
                height={"83px"}
              >
                <Typography component="div">
                  <Switch checked={issue.hub} onChange={handleCreateIssueInputChange} name="hub" />
                  Hub
                </Typography>
              </Box>
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
          </form>
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
