import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Typography,
  Box,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { priorityOptions, dcSwitchStatusOptions, statusOptions } from "../../util/MockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function CreateIssue({
  lastUpdatedOn,
  inputErrors,
  issue,
  handleCreateIssueInputChange,
}) {
  console.log("last upate", lastUpdatedOn);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create an Issue
      </Typography>
      {lastUpdatedOn ? (
        <Typography variant="h5" gutterBottom>
          Last updated on {lastUpdatedOn.format("DD.MM.YYYY hh:mm a")}
        </Typography>
      ) : (
        ""
      )}

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
                        fontSize: "1.25rem",
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
    </Box>
  );
}
