import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IssueContactDataGrid({ userData, onDeleteClick, onBulkDeleteClick }) {
  const DEFAULT_ROWS_PER_PAGE = 2;

  const initialRows = userData ?? [];

  const [rows, setRows] = React.useState(initialRows);
  const [selectedRows, setSelectedRows] = React.useState([]);

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
      headerName:
        selectedRows.length > 1 ? (
          <IconButton aria-label="delete" onClick={() => onBulkDeleteClick(selectedRows)}>
            <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
          </IconButton>
        ) : (
          ""
        ),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDeleteClick(params.id)}>
          <FontAwesomeIcon size="lg" color="red" icon={faTrash} />
        </IconButton>
      ),
    },
  ];

  React.useEffect(() => {
    setRows(userData);
  }, [userData]);

  const handleRowSelection = (ids) => {
    setSelectedRows(ids);
  };

  const handleDeleteClick = (id) => {
    onDeleteClick(id);
    // setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ minHeight: "12rem", width: "100%" }}>
      <DataGrid
        sx={{ minHeight: "10rem" }}
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
        onRowSelectionModelChange={(selectionModel) => {
          handleRowSelection(selectionModel);
          console.log(selectionModel);
        }}
      />
    </Box>
  );
}
