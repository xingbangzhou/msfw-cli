import {memo} from 'react'
import styles from './index.module.scss'

const MainView = memo(function MainView() {
  return <div className={styles.mainView}></div>
})

export default MainView
