// Issues.js
import React, { useEffect, useState } from "react";
import { Container, Button, Box, useTheme } from "@mui/material";
import { roleOptions, userData } from "../util/MockData";
import { dataTransformer, logout } from "../util/Helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IssueContactDataGrid from "../components/issue/IssueContactDataGrid";
import { showSnackbar } from "../events/SnackBarEmitter";
import CreateIssue from "../components/issue/CreateIssue";
import AssignIssueContact from "../components/issue/AssignIssueContact";

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

  const [assignedUsers, setAssignedUsers] = useState([]);
  const [lastUpdatedOn, setLastUpdatedOn] = useState(false);

  const [inputErrors, setInputErrors] = useState({});
  const [assignContactInputErrors, setAssignContactInputErrors] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [userOptions, setUserOptions] = useState(dataTransformer(userData));

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const savedIssue = sessionStorage.getItem("issue");
    const savedAssignedUsers = sessionStorage.getItem("assignedUsers");
    const savedLastUpdatedOn = sessionStorage.getItem("lastUpdatedOn");

    if (savedIssue) setIssue(JSON.parse(savedIssue));
    if (savedAssignedUsers) setAssignedUsers(JSON.parse(savedAssignedUsers));
    if (savedLastUpdatedOn) setLastUpdatedOn(moment(savedLastUpdatedOn));
  }, []);

  const saveDataToSessionStorage = () => {
    sessionStorage.setItem("issue", JSON.stringify(issue));
    sessionStorage.setItem("assignedUsers", JSON.stringify(assignedUsers));
    sessionStorage.setItem("lastUpdatedOn", moment().toISOString());
    //NOTE: 👆 The reason moment object is created in here instead of getting the value from the state is because the value in state might not have been updated yet, because React underlyingly batches setState() calls, and it is not updated synchronously.
  };

  const clearDataFromSessionStorage = () => {
    sessionStorage.removeItem("issue");
    sessionStorage.removeItem("assignedUsers");
    sessionStorage.removeItem("lastUpdatedOn");
  };

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
    let isValid = validateCreateIssue();

    if (isValid) {
      setLastUpdatedOn(moment());
      saveDataToSessionStorage();
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
                clearDataFromSessionStorage();
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

          <Box>
            <AssignIssueContact
              assignContactInputErrors={assignContactInputErrors}
              handleRoleChange={handleRoleChange}
              handleUserChange={handleUserChange}
              handleAssignUser={handleAssignUser}
              roleOptions={roleOptions}
              userOptions={userOptions}
              issue={issue}
            />
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
