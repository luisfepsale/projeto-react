import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "./components/dataTable";
import SearchInput from "./components/form/searchInput";
import FormCreateUser from "./components/modal/createUser";
import api from "./services/api";

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchedRows, setSearchedRows] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setRows(response.data);
      setSearchedRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    handleOpenSuccessModal();
    setOpenDialog(false);
  };

  const handleUpdateUsers = () => {
    fetchUsers();
  };

  // Pesquisa
  const handleSearch = (searchValue) => {
    const filtered = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setSearchedRows(filtered);
  };

  return (
    <div className="mx-5">
      <div className="my-5">
        <h1>Usuários</h1>
      </div>
      <div className="d-flex mb-4 gap-4">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Novo
        </Button>
        <FormCreateUser
          open={openDialog}
          onClose={handleCloseDialog}
          onCreate={fetchUsers}
        />
        <SearchInput onSearch={handleSearch} />
      </div>
      <div>
        <DataTable rows={searchedRows} onUpdate={handleUpdateUsers} />
      </div>
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Usuário cadastrado com sucesso</h2>
            <button onClick={() => setShowSuccessModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
