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
// import "../css/issue-page.css"; // Import CSS for custom styling

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

  const [inputErrors, setInputErrors] = useState({});

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();

  const [userOptions, setUserOptions] = useState(dataTransformer(userData));
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [lastUpdatedOn, setLastUpdatedOn] = useState(moment());

  const handleCreateIssueInputChange = (e) => {
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
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleAssignUser = () => {
    if (selectedRole && selectedUser) {
      const userDetails = userOptions.find((user) => user.value === selectedUser);
      const existingUser = assignedUsers.find((user) => user.id === userDetails.value);

      if (!existingUser) {
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
      }
    } else {
      console.warn("Please select role and user");
    }
  };

  const handleRemoveUser = (id) => {
    setAssignedUsers(assignedUsers.filter((user) => user.id !== id));
  };

  const validateCreateIssue = () => {
    let tempErrors = {};
    if (!issue.title) tempErrors.title = "Please enter title";
    if (!issue.priority) tempErrors.priority = "Please select priority";
    if (!issue.dcSwitchStatus) tempErrors.dcSwitchStatus = "Please select DC Switch Status";
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Create an Issue
      </Typography>
      <Typography variant="body2" gutterBottom>
        Last updated on {lastUpdatedOn.format("DD.MM.YYYY hh:mm a")}
      </Typography>
      <form className="issue-form">
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }}>
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
          <div className="switch-container">
            <Typography component="div">
              Electrical
              <Switch
                checked={issue.electrical}
                onChange={handleCreateIssueInputChange}
                name="electrical"
              />
            </Typography>
          </div>
        </Box>
        <br></br>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, width: "100%" }}>
          <FormControl fullWidth margin="normal">
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
              inputProps={{
                endAdornment: <FontAwesomeIcon icon={faCalendar} />,
              }}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
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
            />
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
          <Typography component="div">
            Hub
            <Switch checked={issue.hub} onChange={handleCreateIssueInputChange} name="hub" />
          </Typography>
        </Box>

        <Box sx={{ paddingTop: "2rem" }}></Box>

        <Typography variant="h5" gutterBottom>
          Issue Contact
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }}>
          <FormControl sx={{ gridColumn: "span 2" }} fullWidth margin="normal">
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
          </FormControl>
          <FormControl sx={{ gridColumn: "span 2" }} fullWidth margin="normal">
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
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Button variant="contained" color="primary" onClick={handleAssignUser}>
              Assign
            </Button>
          </FormControl>
        </Box>
      </form>
      <Box style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <IssueContactDataGrid userData={assignedUsers} onDeleteClick={handleRemoveUser} />
      </Box>
      <div className="action-buttons">
        <Button variant="contained" color="primary" onClick={() => handleSaveChanges()}>
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            if (logout()) {
              navigate("/login");
            }
          }}
        >
          Log Out
        </Button>
      </div>
    </Container>
  );
};

export default Issues;
