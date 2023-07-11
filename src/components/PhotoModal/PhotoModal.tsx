import React from 'react';
import { Card } from 'antd';
import { Modal } from 'antd';
import styles from "./PhotoModal.module.css"

const { Meta } = Card;

const PhotoModal: React.FC<any> = ({isVisible, handleCancel, url, id, title}: any) => {
  return (
    <Modal
      className={styles.photoModal}
      title={`Album ID ${id}`}
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Card
        className={styles.photoCard}
        cover={<img alt="example" src={url} className={styles.photoModalImg}/>}
      >
        <Meta title={`Album ID ${id}`} description={title} />
      </Card>
    </Modal>
  );
};

export default PhotoModal;