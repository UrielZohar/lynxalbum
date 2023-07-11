import { useEffect, useCallback, useState } from "react"
import { Card, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getPhotosAsync, selectPhotos, setPhotoModal, selectPhotoModal, deletePhoto, addPhoto, selectStatus, setPhotoToEdit, selectPhotoToEdit, updatePhoto
} from "./AlbumManagerSlice"
import styles from "./AlbumManager.module.css"
import { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";
import { PhotoItem } from "../PhotoItem/PhotoItem";
import PhotoModal from "../PhotoModal/PhotoModal";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { PhotoEditModal } from "../PhotoEditModal/PhotoEditModal";
import { PhotoAddModal } from "../PhotoAddModal/PhotoAddModal";

const { Meta } = Card;

export function AlbumManager() {
  const photos: Photo[] = useAppSelector(selectPhotos);
  const isLoading: boolean = useAppSelector(selectStatus) === 'loading';
  const photoModal: Photo | null = useAppSelector(selectPhotoModal);
  const photoToEdit: Photo | null = useAppSelector(selectPhotoToEdit);
  const [addPhotoVisible, setAddPhotoVisible] = useState(false);
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    dispatch(getPhotosAsync());
  }, []);

  const handleOnPhotoModalClose = () => {
    dispatch(setPhotoModal(null));
  }
  
  const onEditClick = useCallback((id: string) => {
    dispatch(setPhotoToEdit(id));
  }, [])

  const onClick = useCallback((id: string) => {
    dispatch(setPhotoModal(id));
  }, [])

  const onDeleteClick = useCallback((id: string) => {
    const isOk = confirm(`Are you sure you want to edit photo ${id}?`);
    if (!isOk) return;
    dispatch(deletePhoto(id));
  }, [])
  
  const handleAddPhoto = (photo: Photo) => {
    photo.id = `${photos.length + 1}`;
    dispatch(addPhoto(photo));
    setAddPhotoVisible(false);
  }

  return (
    <div className={styles.albumManagerWrapper}>
      <LoadingSpinner visible={isLoading}/>
      <PhotoModal 
        isVisible={!!photoModal} 
        handleCancel={handleOnPhotoModalClose}
        {...photoModal} 
      />
      <PhotoAddModal 
        isVisible={addPhotoVisible} 
        handleAdd={handleAddPhoto}
        handleCancel={() => setAddPhotoVisible(false)}
      />
      <PhotoEditModal 
        isVisible={!!photoToEdit}
        handleCancel={() => dispatch(setPhotoToEdit(null))}
        handleUpdate={(photo: Photo) => dispatch(updatePhoto(photo))}
        {...photoToEdit}
      />
      <div className={styles.header}>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setAddPhotoVisible(true)}>Add Photo</Button>
      </div>
      <div className={styles.grid}>
        {
          photos.map((photo: Photo) => 
            <PhotoItem 
              key={photo.id} 
              {...photo}
              onClick={onClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          )
        }
      </div>
    </div>
  )
}
