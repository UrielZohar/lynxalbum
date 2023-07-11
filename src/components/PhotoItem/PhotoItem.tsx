import { memo } from 'react';
import { Card } from 'antd';
import { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";
import { PhotoTitle } from './components/PhotoTitle';
import styles from "./PhotoItem.module.css"

interface PhotoItem extends Photo {
  onClick: (id: string) => void,
  onEditClick: (id: string) => void,
  onDeleteClick: (id: string) => void,
  key: string,
}


const { Meta } = Card;

const PhotoItem = memo(function ({id, thumbnailUrl, title, onClick, onEditClick, onDeleteClick}: PhotoItem) {
  return (<Card
    hoverable
    style={{ width: 240, height: 360 }}
    cover={<img className={styles.photoImg} src={thumbnailUrl} loading="lazy" />}
    onClick={() => onClick(id)}
    >
    <Meta 
      title={<PhotoTitle id={id} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>}
      description={title} 
    />
  </Card>)
})

export {PhotoItem};