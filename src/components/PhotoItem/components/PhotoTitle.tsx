import styles from './PhotoTitle.module.css'

export function PhotoTitle({id, onEditClick, onDeleteClick}: {id: string, onEditClick: (id: string) => void, onDeleteClick: (id: string) => void}) {
  const _onEditClick = (e: any, id: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onEditClick(id);
  }

  const _onDeleteClick = (e: any, id: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onDeleteClick(id);
  }
  
  return (
    <>
      <span>Album ID {id}</span>
      <span className={styles.photoActionIcon} onClick={(e) => _onEditClick(e, id)} title='Edit'>✏</span>
      <span className={styles.photoActionIcon} onClick={(e) => _onDeleteClick(e, id)} title='Delete'>✖</span>
    </>
  )
}