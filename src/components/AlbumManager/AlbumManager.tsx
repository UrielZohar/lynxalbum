import { useState, useEffect } from "react"
import { Card } from 'antd';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  getAlbumsAsync, selectPhotos,
} from "./AlbumManagerSlice"
import styles from "./AlbumManager.module.css"
import { Photo } from "../../utils/AlbumManagerAPI/AlbumManagerAPI";

const { Meta } = Card;

export function AlbumManager() {
  const photos: Photo[] = useAppSelector(selectPhotos)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")
  useEffect(() => {
    dispatch(getAlbumsAsync());
  }, []);

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div className={styles.grid}>
      {
        photos.map(({id, title, thumbnailUrl}: Photo) => 
          <div key={id}>
            <Card
              hoverable
              style={{ width: 240, height: 360 }}
              cover={<img alt="example" src={thumbnailUrl} loading="lazy" />}
              >
              <Meta title={`Album ID ${id}`} description={title} />
            </Card>
          </div>
        )
      }
    </div>
  )
}
