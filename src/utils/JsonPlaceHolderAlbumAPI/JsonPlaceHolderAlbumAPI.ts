import { Photo, AlbumAPI } from "../AlbumManagerAPI/AlbumManagerAPI";
const root = 'https://jsonplaceholder.typicode.com/photos';

const getPhotos = async (): Promise<Photo[]> => {
  const response = await fetch(`${root}`);
  return await response.json().then((photos: Photo[]) => {
    return photos.slice(0, 100);
  });
};

const deletePhoto = async (id: string): Promise<Photo> => {
  const response = await fetch(`${root}/${id}`, {
    method: 'DELETE',
  });
  return await response.json();
}

const addPhoto = async (photo: Photo): Promise<Photo> => {
  const response = await fetch(`${root}`, {
    method: 'POST',
    body: JSON.stringify(photo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
};

const updatePhoto = async (photo: Photo): Promise<Photo> => {
  const response = await fetch(`${root}/${photo.id}`, {
    method: 'PUT',
    body: JSON.stringify(photo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
};

const JsonPlaceHolderAlbumAPI: AlbumAPI = {
  getPhotos,
  deletePhoto,
  addPhoto,
  updatePhoto,
};

export default JsonPlaceHolderAlbumAPI;
