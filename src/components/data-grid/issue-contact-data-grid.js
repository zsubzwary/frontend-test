import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IssueContactDataGrid({ userData, onDeleteClick }) {
  const DEFAULT_ROWS_PER_PAGE = 2;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      // type: "number",
      flex: 2,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 2,
      editable: false,
    },
    {
      field: null,
      headerName: null,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(params.id)}>
          <FontAwesomeIcon size="xs" color="red" icon={faTrash} />
        </IconButton>
      ),
    },
  ];

  const initialRows = userData ?? [];

  const [rows, setRows] = React.useState(initialRows);

  React.useEffect(() => {
    setRows(userData);
  }, [userData]);

  const handleDeleteClick = (id) => {
    onDeleteClick(id);
    // setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ minHeight: "12rem", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: DEFAULT_ROWS_PER_PAGE,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        pageSizeOptions={[DEFAULT_ROWS_PER_PAGE, 5, 10]}
      />
    </Box>
  );
}
