import React, { useState } from "react";
import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function ImageUpload({ name, onChange }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    onChange(file); 
  };

  return (
    <div style={{ marginLeft: 40, marginRight: 40 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {selectedImage ? (
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CloudDownloadIcon style={{ fontSize: 48, color: "#fff" }} />
          </div>
        )}
        <label htmlFor="upload-button" style={{ marginTop: 20 }}>
          <input
            type="file"
            id="upload-button"
            accept="image/*"
            name={name}
            onChange={handleImageChange}
            style={{ display: "none", fontSize: 10 }}
          />
          <Button variant="contained" component="span">
            Adicionar Imagem
          </Button>
        </label>
      </div>
    </div>
  );
};

