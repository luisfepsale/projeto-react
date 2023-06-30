import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import FormEditUser from "../modal/editUser";
// Importe o componente FormEditUser

export default function DataTable({ rows, onUpdate }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };
  
  const handleClose = () => {
    setSelectedItem(null);
    setEditModalOpen(false);
    onUpdate(); 
  };


  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "E-mail", flex: 1 },
    { field: "cpf", headerName: "CPF", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      headerClassName: "MuiDataGrid-columnHeaderCenter",
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => handleEditClick(params.row)}>
              <EditIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      {selectedItem && (
        <FormEditUser
          open={editModalOpen}
          onClose={handleClose}
          initialData={selectedItem}
        />
      )}
    </Box>
  );
}
