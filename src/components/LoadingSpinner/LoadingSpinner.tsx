import { Spin } from 'antd'; 
import styles from "./LoadingSpinner.module.css"



export function LoadingSpinner({visible}: {visible: boolean}) {
  return (
    <>{
      visible && <div className={styles.loadingSpinnerWrapper}>
          <Spin size="large" />
        </div>
    }</>
  )
}
