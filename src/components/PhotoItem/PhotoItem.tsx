import { Card } from 'antd';
import { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";
import { PhotoTitle } from './components/PhotoTitle';

interface PhotoItem extends Photo {
  onClick: (id: string) => void,
  onEditClick: (id: string) => void,
  onDeleteClick: (id: string) => void,
  key: string,
}


const { Meta } = Card;

export function PhotoItem({id, thumbnailUrl, title, onClick, onEditClick, onDeleteClick}: PhotoItem) {
  return (<Card
    hoverable
    style={{ width: 240, height: 360 }}
    cover={<img alt="example" src={thumbnailUrl} loading="lazy" />}
    onClick={() => onClick(id)}
    >
    <Meta 
      title={<PhotoTitle id={id} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>}
      description={title} 
    />
  </Card>)
}