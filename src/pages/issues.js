// Issues.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  FormControl,
  InputLabel,
  Switch,
  Typography,
  Box,
  InputAdornment,
  TablePagination,
} from "@mui/material";
import {
  priorityOptions,
  dcSwitchStatusOptions,
  statusOptions,
  roleOptions,
  userOptions,
  userData,
} from "../util/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../util/helper";
import { useNavigate } from "react-router-dom";
// import "../css/issue-page.css"; // Import CSS for custom styling

const Issues = () => {
  const DEFAULT_ROWS_PER_PAGE = 2;
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
    role: "",
    user: "",
  });

  const navigate = useNavigate();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const totalPages = Math.ceil(assignedUsers.length / rowsPerPage);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue({
      ...issue,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAssignUser = () => {
    if (issue.role && issue.user) {
      const userDetails = userOptions.find((user) => user.value === issue.user);
      const existingUser = assignedUsers.find((user) => user.email === userData[issue.user].email);

      if (!existingUser) {
        setAssignedUsers([
          ...assignedUsers,
          {
            name: userDetails.label,
            email: userData[issue.user].email,
            phone: userData[issue.user].phone,
            role: roleOptions.find((role) => role.value === issue.role).label,
          },
        ]);
      }
    }
  };

  const handleRemoveUser = (email) => {
    setAssignedUsers(assignedUsers.filter((user) => user.email !== email));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE));
    setCurrentPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create an Issue
      </Typography>
      <Typography variant="body2" gutterBottom>
        Last updated on 09.08.2022 04:03 am
      </Typography>
      <form className="issue-form">
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }}>
          <TextField
            label="Title"
            name="title"
            value={issue.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Priority</InputLabel>
            <Select
              notched
              label="Priority"
              name="priority"
              value={issue.priority}
              onChange={handleChange}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>DC Switch Status</InputLabel>
            <Select
              notched
              label="DC Switch Status"
              name="dcSwitchStatus"
              value={issue.dcSwitchStatus}
              onChange={handleChange}
            >
              {dcSwitchStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>Status</InputLabel>
            <Select
              notched
              label="Status"
              name="status"
              value={issue.status}
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="switch-container">
            <Typography component="div">
              Electrical
              <Switch checked={issue.electrical} onChange={handleChange} name="electrical" />
            </Typography>
          </div>
        </Box>
        <br></br>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, width: "100%" }}>
          <TextField
            sx={{ gridColumn: "span 2" }}
            label="Description"
            name="description"
            value={issue.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              endAdornment: <FontAwesomeIcon icon={faCalendar} />,
            }}
          />

          <TextField
            label="Repair Date"
            name="repairDate"
            value={issue.repairDate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time Estimate Hours"
            name="timeEstimate"
            value={issue.timeEstimate}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <Typography component="div">
            Hub
            <Switch checked={issue.hub} onChange={handleChange} name="hub" />
          </Typography>
        </Box>

        <Box sx={{ paddingTop: "2rem" }}></Box>

        <Typography variant="h5" gutterBottom>
          Issue Contact
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, width: "100%" }}>
          <FormControl sx={{ gridColumn: "span 2" }} fullWidth margin="normal">
            <InputLabel shrink>Select Role</InputLabel>
            <Select
              notched
              label="Select Role"
              name="role"
              value={issue.role}
              onChange={handleChange}
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
              onChange={handleChange}
            >
              {userOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleAssignUser}>
            Assign
          </Button>
        </Box>
      </form>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedUsers
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveUser(user.email)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalPages}
          page={currentPage}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </TableContainer>
      <div className="action-buttons">
        <Button variant="contained" color="primary" onClick={() => console.log("Save Changes")}>
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
