import React, { useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';

const App = () => {
  const [photos, setPhotos] = useState([]);

  const mostrarImagen = () => {
    return photos.map((photo) => (
      <div key={photo.id} className="img-container">
        <img src={photo.image} alt={photo.title} />
        <div className="edit-eliminar-buttons">
          <Button variant='contained' color='primary' className="edit-button" onClick={() => editar(photo.id)}>
            Modificar
          </Button>
          <Button variant='contained' color='primary' className="eliminar-button" onClick={() => eliminar(photo.id)}>
            Eliminar
          </Button>
          
        </div>
        <div className="photo-details">
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
        </div>
      </div>
    ));
  };

  const insertarImagen = (event) => {
    event.preventDefault();

    const titleInput = document.getElementById('titleInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const imageInput = document.getElementById('imageInput');

    const reader = new FileReader();

    reader.onload = function (e) {
      const photoId = `photo${Date.now()}`;
      const newPhoto = {
        id: photoId,
        title: titleInput.value,
        description: descriptionInput.value,
        image: e.target.result,
      };

      setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);

      titleInput.value = '';
      descriptionInput.value = '';
      imageInput.value = '';
    };

    reader.readAsDataURL(imageInput.files[0]);
  };

  const eliminar = (photoId) => {
    setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
  };

  const editar = (photoId) => {
    const photo = photos.find((photo) => photo.id === photoId);
    if (photo) {
      const newTitle = prompt('Ingrese el nuevo título:', photo.title);
      const newDescription = prompt('Ingrese la nueva descripción:', photo.description);

      if (newTitle !== null && newDescription !== null) {
        setPhotos((prevPhotos) =>
          prevPhotos.map((prevPhoto) =>
            prevPhoto.id === photoId ? { ...prevPhoto, title: newTitle, description: newDescription } : prevPhoto
          )
        );
      }
    }
  };

  return (
    <div className="gallery">
    <h1 className="title">Galería de Fotos</h1>
   
    <form id="addPhotoForm" onSubmit={insertarImagen}>
      <input type="text" id="titleInput" placeholder="Título" />
      <input type="text" id="descriptionInput" placeholder="Descripción" />
      <input type="file" id="imageInput" />
      <Button variant='contained' color='primary' type="submit">Agregar Foto</Button>
    </form>
    <div className="photos">{mostrarImagen()}</div>
  </div>
);
};

export default App;
