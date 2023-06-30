import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ImageUpload from "../../form/imageUpload";
import InputMask from "react-input-mask";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../../../services/api";
import MessageModal from "../messageModal";

import moment from "moment/moment";

export default function FormEditUser({ open, onClose, initialData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessages, setModalMessages] = useState([]);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value, // Armazena o valor digitado pelo usuário
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await api.put(`/users/update/${formData.id}`, formData);
      console.log(response.data);
      setModalMessages(["Usuário atualizado com sucesso"]);
      setModalOpen(true);
      setFormData(initialData);

      // Aguardar 1 segundo antes de fechar o modal
      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setModalMessages([error.response.data.message]);
      } else {
        setModalMessages(["Erro ao atualizar o usuário"]);
      }
      setModalOpen(true);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await api.delete(`/users/delete/${formData.id}`);
      setModalMessages(["Usuário excluído com sucesso"]);
      setModalOpen(true);

      // Aguardar 1 segundo antes de fechar o modal
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      setModalMessages(["Erro ao excluir o usuário"]);
      setModalOpen(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMessages([]);
  };

  const formattedDate = moment(formData.dateOfBirth.replace(/[^\d]/g, ""), "DDMMYYYY").format("YYYY-MM-DD");


  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{ "& .MuiPaper-root": { height: "700px" } }}
      >
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <div className="d-flex">
            <ImageUpload name="photo" />
            <div className="d-flex-colum">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="Nome"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
              <InputMask
                mask="999.999.999-99"
                value={formData.cpf}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <TextField
                    margin="dense"
                    id="cpf"
                    name="cpf"
                    label="CPF"
                    type="text"
                    fullWidth
                    variant="outlined"
                    {...inputProps}
                  />
                )}
              </InputMask>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.phone}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <TextField
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Telefone"
                    type="tel"
                    fullWidth
                    variant="outlined"
                    {...inputProps}
                  />
                )}
              </InputMask>
              <TextField
                margin="dense"
                id="dateOfBirth"
                name="dateOfBirth"
                label="Data de Nascimento"
                type="date"
                fullWidth
                variant="outlined"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Senha Atual"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="dense"
                id="new-password"
                name="newPassword"
                label="Nova Senha"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button color="error" variant="contained" onClick={handleDeleteUser}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <MessageModal
        open={modalOpen}
        onClose={handleCloseModal}
        messages={modalMessages}
      />
    </>
  );
}
