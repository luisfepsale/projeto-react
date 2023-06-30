import React, { useState } from "react";
import MessageModal from "../../components/modal/messageModal";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const token = response.data.token;

      // Armazene o token no localStorage
      localStorage.setItem("token", token);

      // Redirecione o usuário para a página de dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setMessage("Erro ao fazer login. Por favor, tente novamente.");
    }
  };

  const closeMessageModal = () => {
    setMessage("");
  };

  return (
    <div>
      <div className="container mt-4">
        <h4 className="mb-4">Login</h4>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>

      {message && (
        <MessageModal onClose={closeMessageModal}>
          <p>{message}</p>
        </MessageModal>
      )}
    </div>
  );
};

