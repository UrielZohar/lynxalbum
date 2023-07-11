import AlbumImplementationAPI from "../JsonPlaceHolderAlbumAPI/JsonPlaceHolderAlbumAPI";

export interface Photo {
  "albumId": string,
  "id": string,
  "title": string,
  "url": string
  "thumbnailUrl": string
}

export interface AlbumAPI {
  getPhotos: () => Promise<Photo[]>;
  deletePhoto: (id: string) => Promise<Photo>;
  addPhoto: (album: Photo) => Promise<Photo>;
  updatePhoto: (album: Photo) => Promise<Photo>;
};

const getPhotos = async () => {
  return AlbumImplementationAPI.getPhotos();
};

const deletePhoto = async (id: string) => {
  return AlbumImplementationAPI.deletePhoto(id);
};

const addPhoto = async (photo: Photo) => {
  return AlbumImplementationAPI.addPhoto(photo);
};

const updatePhoto = async (photo: Photo) => {
  return AlbumImplementationAPI.updatePhoto(photo);
};

const AlbumManagerAPI: AlbumAPI = {
  getPhotos,
  deletePhoto,
  addPhoto,
  updatePhoto,
};

export default AlbumManagerAPI;