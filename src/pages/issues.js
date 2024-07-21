import React, { useEffect, useState } from "react";
import { Container, Button, Box, useTheme, Backdrop, CircularProgress } from "@mui/material";
import { roleOptions, userData } from "../util/MockData";
import { dataTransformer, getUserLoginMethod, isUserLoggedIn, logout } from "../util/Helper";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import IssueContactDataGrid from "../components/issue/IssueContactDataGrid";
import { showSnackbar } from "../events/SnackBarEmitter";
import CreateIssue from "../components/issue/CreateIssue";
import AssignIssueContact from "../components/issue/AssignIssueContact";
import { showAlert } from "../events/AlertDialogEmitter";

const Issues = () => {
  const DEFAULT_SNACKBAR_DURATION = 3500;

  const [loading, setLoading] = useState(true);

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
    const savedIssue = sessionStorage.getItem("issue") || localStorage.getItem("issue");
    const savedAssignedUsers = sessionStorage.getItem("assignedUsers") || localStorage.getItem("assignedUsers");
    const savedLastUpdatedOn = sessionStorage.getItem("lastUpdatedOn") || localStorage.getItem("lastUpdatedOn");

    if (savedIssue) setIssue(JSON.parse(savedIssue));
    if (savedAssignedUsers) setAssignedUsers(JSON.parse(savedAssignedUsers));
    if (savedLastUpdatedOn) setLastUpdatedOn(moment(savedLastUpdatedOn));

    // 👇 This is simlation of loading data from server
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  /**
   * Save data to storage based on user login method.
   *
   * @return {void} No return value
   */
  const saveDataToStorage = () => {
    let lastUpdated = moment().toISOString();
    //NOTE: 👆 The reason moment object is created in here instead of getting the value from the state is
    //          because the value in state might not have been updated yet,
    //          because React underlyingly batches setState() calls, and it is not updated synchronously.

    if (getUserLoginMethod() === "localStorage") {
      localStorage.setItem("issue", JSON.stringify(issue));
      localStorage.setItem("assignedUsers", JSON.stringify(assignedUsers));
      localStorage.setItem("lastUpdatedOn", lastUpdated);
    } else if (getUserLoginMethod() === "sessionStorage") {
      sessionStorage.setItem("issue", JSON.stringify(issue));
      sessionStorage.setItem("assignedUsers", JSON.stringify(assignedUsers));
      sessionStorage.setItem("lastUpdatedOn", lastUpdated);
    } else {
      showSnackbar("Unable to save data, Kindly refresh", DEFAULT_SNACKBAR_DURATION);
      return;
    }

    showSnackbar("Data saved successfully", DEFAULT_SNACKBAR_DURATION);
  };

  /**
   * Clears data from session and local storage related to issues and assigned users.
   */
  const clearDataFromStorage = () => {
    sessionStorage.removeItem("issue");
    sessionStorage.removeItem("assignedUsers");
    sessionStorage.removeItem("lastUpdatedOn");
    localStorage.removeItem("issue");
    localStorage.removeItem("assignedUsers");
    localStorage.removeItem("lastUpdatedOn");
  };

  /**
   * Updates the issue state and input errors state based on the input change event.
   *
   * @param {Event} e - The input change event.
   * @return {void} This function does not return a value.
   */
  const handleCreateIssueInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue({
      ...issue,
      [name]: type === "checkbox" ? checked : value ?? "",
    });
    setInputErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  /**
   * Updates the selected role and clears the role input error when the user selects a new value.
   *
   * @param {Event} event - The event object triggered by the user selecting a new value.
   * @return {void} This function does not return a value.
   */
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setAssignContactInputErrors((prevErrors) => ({ ...prevErrors, role: "" }));
  };

  /**
   * Updates the selected user and clears the user input error when the user selects a new value.
   *
   * @param {Event} event - The event object triggered by the user selecting a new value.
   * @return {void} This function does not return a value.
   */
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setAssignContactInputErrors((prevErrors) => ({ ...prevErrors, user: "" }));
  };

  /**
   * Validates the issue contact by checking if role and user are selected.
   * This also set the values in state for teh error msgs to be displayed on the fileds.
   *
   * @return {boolean} Returns true if no errors are found, otherwise false.
   */
  const validateIssueContact = () => {
    let tempErrors = {};
    if (!selectedRole) tempErrors.role = "Please select role";
    if (!selectedUser) tempErrors.user = "Please select user";
    setAssignContactInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Handles the assignment of a user to an issue.
   *
   * This function validates the issue contact and checks if a selected role and user are provided.
   * If both are provided, it checks if the user is already assigned to the issue.
   * If the user is not already assigned, it assigns the user to the issue and displays a success message.
   * If the user is already assigned, it updates the assign contact input errors to indicate that the user is already assigned.
   *
   * @return {void} This function does not return a value.
   */
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
        showSnackbar("User assigned successfully", DEFAULT_SNACKBAR_DURATION);
      }
    } else {
      console.warn("Please select role and user");
    }
  };

  /**
   * Handles the removal of an assigned user.
   *
   * @param {number} id - The ID of the user to be removed.
   * @return {void} This function does not return anything.
   */
  const handleRemoveUser = (id) => {
    showAlert(
      "Remove Assigned User?",
      "Are you sure you want to remove this assigned user?",
      () => {
        setAssignedUsers(assignedUsers.filter((user) => user.id !== id));
        showSnackbar("Assigned user has been removed successfully.", DEFAULT_SNACKBAR_DURATION);
      },
      () => {},
      "Yes",
      "No"
    );
  };

  /**
   * Handles the removal of multiple assigned users.
   *
   * @param {Array<number>} ids - The IDs of the users to be removed.
   * @return {void} This function does not return anything.
   */
  const handleBulkRemoveUsers = (ids) => {
    showAlert(
      "Removing Multiple Assigned Users?",
      "Are you sure you want to remove these assigned users?",
      () => {
        setAssignedUsers(assignedUsers.filter((user) => !ids.includes(user.id)));
        showSnackbar("Assigned users have been removed successfully.", DEFAULT_SNACKBAR_DURATION);
      },
      () => {},
      "Yes",
      "No"
    );
  };

  /**
   * Validates the creation of an issue based on the provided input values.
   *
   * @return {boolean} Returns true if the input values are valid, otherwise false.
   */
  const validateCreateIssue = () => {
    let tempErrors = {};
    if (!issue.title) tempErrors.title = "Please enter title";
    if (!issue.priority) tempErrors.priority = "Please select priority";
    if (!issue.dcSwitchStatus) tempErrors.dcSwitchStatus = "Select DC Switch Status";
    if (!issue.status) tempErrors.status = "Please select status";
    if (!issue.description) tempErrors.description = "Please enter description";
    if (!issue.repairDate) tempErrors.repairDate = "Please select repair date";
    if (!issue.timeEstimate) tempErrors.timeEstimate = "Please enter time estimate";
    if (issue.timeEstimate <= 0) tempErrors.timeEstimate = "Time estimate must be greater than 0";

    setInputErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /**
   * Validates teh input fields and Handles the saving of changes if the input fields are valid.
   *
   * @return {void} No return value.
   */
  const handleSaveChanges = () => {
    let isValid = validateCreateIssue();

    if (isValid) {
      setLastUpdatedOn(moment());
      saveDataToStorage();
    }
  };

  /**
   * Handles the logout functionality by showing an alert to confirm the logout action,
   * then logging out, clearing data from storage, and navigating to the login page.
   */
  const handleLogout = () => {
    showAlert(
      "Logout?",
      "Are you sure you want to logout?",
      () => {
        if (logout()) {
          clearDataFromStorage();
          navigate("/login");
        }
      },
      () => {},
      "Yes",
      "No"
    );
  };

  return (
    <Box>
      <Box>
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Container sx={{ paddingBottom: "3rem" }}>
        <Box display={"flex"} justifyContent={"end"} gap={"15px"}>
          <Button
            variant="outlined"
            onClick={() => {
              handleLogout();
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
