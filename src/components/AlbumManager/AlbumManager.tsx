import { useState, useEffect } from "react"
import { Card } from 'antd';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getPhotosAsync, selectPhotos, setPhotoModal, selectPhotoModal, deletePhoto, selectStatus
} from "./AlbumManagerSlice"
import styles from "./AlbumManager.module.css"
import { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";
import { PhotoItem } from "../PhotoItem/PhotoItem";
import PhotoModal from "../PhotoModal/PhotoModal";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

const { Meta } = Card;

export function AlbumManager() {
  const photos: Photo[] = useAppSelector(selectPhotos)
  const isLoading: boolean = useAppSelector(selectStatus) === 'loading';
  const photoModal: Photo | null = useAppSelector(selectPhotoModal)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getPhotosAsync());
  }, []);

  const handleOnPhotoModalClose = () => {
    dispatch(setPhotoModal(null));
  }

  const onEditClick = (id: string) => {
  }
  const onDeleteClick = (id: string) => {
    const isOk = confirm(`Are you sure you want to edit photo ${id}?`);
    if (!isOk) return;
    dispatch(deletePhoto(id));
  }

  return (
    <div>
      <LoadingSpinner visible={isLoading}/>
      <PhotoModal 
        isVisible={!!photoModal} 
        handleCancel={handleOnPhotoModalClose}
        {...photoModal} />
      <div className={styles.grid}>
        {
          photos.map((photo: Photo) => 
            <PhotoItem 
              key={photo.id} 
              {...photo}
              onClick={(id) => {dispatch(setPhotoModal(id))}}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          )
        }
      </div>
    </div>
  )
}
