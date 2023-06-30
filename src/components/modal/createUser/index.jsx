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

export default function FormCreateUser({ open, onClose, onCreate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessages, setModalMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: null,
    photo: null, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (image) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: image,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setModalMessages(["Senha e confirmação de senha não correspondem"]);
        setModalOpen(true);
        return;
      }

      const response = await api.post("/users/create", formData);
      console.log(response.data);
      setModalMessages(["Usuário criado com sucesso"]);
      setModalOpen(true);
      onCreate();

      setFormData({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: null,
        photo: null,
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setModalMessages([error.response.data.message]);
      } else {
        setModalMessages(["Erro ao criar o usuário"]);
      }
      setModalOpen(true);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: null,
      photo: null,
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalMessages([]);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { height: "700px" } }}
      >
        <DialogTitle>Cadastrar Usuário</DialogTitle>
        <DialogContent>
          <div className="d-flex">
            <ImageUpload name="photo" onChange={handleImageChange} /> {/* Passa a função de handleImageChange como prop para capturar a imagem selecionada */}
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
              <InputMask
                mask="99/99/9999"
                value={formData.dateOfBirth}
                onChange={handleDateChange}
              >
                {(inputProps) => (
                  <TextField
                    margin="dense"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Data de Nascimento"
                    type="text"
                    fullWidth
                    variant="outlined"
                    {...inputProps}
                  />
                )}
              </InputMask>
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Senha"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={formData.password}
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
                id="confirm-password"
                name="confirmPassword"
                label="Confirmar Senha"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                value={formData.confirmPassword}
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
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Salvar
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
